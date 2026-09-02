// routes/socios.js
// CRUD de socios. 

const express = require('express');
const pool = require('../db');
const verificarToken = require('../middleware/auth');

const router = express.Router();
router.use(verificarToken); // todas las rutas de este archivo requieren login

// POST /api/socios/listar  body: { orden: 'ASC' | 'DESC' }
router.post('/listar', async (req, res) => {
  const orden = req.body.orden === 'DESC' ? 'DESC' : 'ASC';
  try {
    const [filas] = await pool.query(`SELECT * FROM socios ORDER BY nombre ${orden}`);
    res.json({ ok: true, socios: filas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

// POST /api/socios/crear
router.post('/crear', async (req, res) => {
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ ok: false, mensaje: 'Nombre y email son obligatorios' });
  }
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
    return res.status(400).json({ ok: false, mensaje: 'El nombre solo puede tener letras' });
  }
  try {
    await pool.query(
      'INSERT INTO socios (nombre, email, telefono) VALUES (?, ?, ?)',
      [nombre, email, telefono || null]
    );
    res.json({ ok: true, mensaje: 'Socio creado' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ ok: false, mensaje: 'Ese email ya está registrado como socio' });
    }
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

// POST /api/socios/eliminar  body: { id }
router.post('/eliminar', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ ok: false, mensaje: 'Falta el id' });
  try {
    await pool.query('DELETE FROM socios WHERE id = ?', [id]);
    res.json({ ok: true, mensaje: 'Socio eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

module.exports = router;
