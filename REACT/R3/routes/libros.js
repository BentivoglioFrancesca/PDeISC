// routes/libros.js
// CRUD de libros. Mismo criterio que socios.js: todo por POST.

const express = require('express');
const pool = require('../db');
const verificarToken = require('../middleware/auth');

const router = express.Router();
router.use(verificarToken);

// POST /api/libros/listar  body: { orden: 'ASC' | 'DESC' }
router.post('/listar', async (req, res) => {
  const orden = req.body.orden === 'DESC' ? 'DESC' : 'ASC';
  try {
    const [filas] = await pool.query(`SELECT * FROM libros ORDER BY titulo ${orden}`);
    res.json({ ok: true, libros: filas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

// POST /api/libros/crear
router.post('/crear', async (req, res) => {
  const { titulo, autor } = req.body;
  if (!titulo || !autor) {
    return res.status(400).json({ ok: false, mensaje: 'Título y autor son obligatorios' });
  }
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(autor)) {
    return res.status(400).json({ ok: false, mensaje: 'El autor solo puede tener letras' });
  }
  try {
    await pool.query('INSERT INTO libros (titulo, autor) VALUES (?, ?)', [titulo, autor]);
    res.json({ ok: true, mensaje: 'Libro creado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

// POST /api/libros/disponibilidad  body: { id, disponible }
// Marca a mano si un libro está disponible o no, independientemente de
// si tiene un préstamo activo (por ejemplo: se perdió, está en reparación).
router.post('/disponibilidad', async (req, res) => {
  const { id, disponible } = req.body;
  if (!id || typeof disponible !== 'boolean') {
    return res.status(400).json({ ok: false, mensaje: 'Faltan datos' });
  }
  try {
    await pool.query('UPDATE libros SET disponible = ? WHERE id = ?', [disponible, id]);
    res.json({ ok: true, mensaje: 'Disponibilidad actualizada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

// POST /api/libros/eliminar  body: { id }
router.post('/eliminar', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ ok: false, mensaje: 'Falta el id' });
  try {
    await pool.query('DELETE FROM libros WHERE id = ?', [id]);
    res.json({ ok: true, mensaje: 'Libro eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

module.exports = router;
