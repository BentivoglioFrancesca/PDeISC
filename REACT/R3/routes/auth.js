// routes/auth.js
// Registro e inicio de sesión.

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

// POST /api/auth/registrar
router.post('/registrar', async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ ok: false, mensaje: 'Faltan datos obligatorios' });
  }
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
    return res.status(400).json({ ok: false, mensaje: 'El nombre solo puede tener letras' });
  }
  if (password.length < 6) {
    return res.status(400).json({ ok: false, mensaje: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
    const [existentes] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existentes.length > 0) {
      return res.status(409).json({ ok: false, mensaje: 'Ese email ya está registrado' });
    }

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)',
      [nombre, email, hash]
    );

    res.json({ ok: true, mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, mensaje: 'Faltan datos obligatorios' });
  }

  try {
    const [filas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (filas.length === 0) {
      return res.status(401).json({ ok: false, mensaje: 'Email o contraseña incorrectos' });
    }

    const usuario = filas[0];
    const coincide = await bcrypt.compare(password, usuario.password_hash);
    if (!coincide) {
      return res.status(401).json({ ok: false, mensaje: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, nombre: usuario.nombre },
      process.env.JWT_SECRET || 'secreto_dev',
      { expiresIn: '8h' }
    );

    res.json({
      ok: true,
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

module.exports = router;
