// routes/prestamos.js
// Registrar préstamos, listarlos y marcar devolución. 

const express = require('express');
const pool = require('../db');
const verificarToken = require('../middleware/auth');

const router = express.Router();
router.use(verificarToken);

// POST /api/prestamos/listar  body: { orden: 'ASC' | 'DESC' }
router.post('/listar', async (req, res) => {
  const orden = req.body.orden === 'DESC' ? 'DESC' : 'ASC';
  try {
    const [filas] = await pool.query(
      `SELECT p.id, p.fecha_prestamo, p.fecha_devolucion, p.devuelto,
              s.nombre AS socio_nombre, l.titulo AS libro_titulo,
              p.socio_id, p.libro_id
       FROM prestamos p
       JOIN socios s ON s.id = p.socio_id
       JOIN libros l ON l.id = p.libro_id
       ORDER BY p.fecha_prestamo ${orden}`
    );
    res.json({ ok: true, prestamos: filas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

// POST /api/prestamos/crear  body: { socio_id, libro_id }
router.post('/crear', async (req, res) => {
  const { socio_id, libro_id } = req.body;
  if (!socio_id || !libro_id) {
    return res.status(400).json({ ok: false, mensaje: 'Falta socio_id o libro_id' });
  }
  try {
    const [[libro]] = await pool.query('SELECT disponible FROM libros WHERE id = ?', [libro_id]);
    if (!libro) return res.status(404).json({ ok: false, mensaje: 'Libro no encontrado' });
    if (!libro.disponible) {
      return res.status(409).json({ ok: false, mensaje: 'El libro no está disponible' });
    }

    await pool.query('INSERT INTO prestamos (socio_id, libro_id) VALUES (?, ?)', [socio_id, libro_id]);
    await pool.query('UPDATE libros SET disponible = FALSE WHERE id = ?', [libro_id]);

    res.json({ ok: true, mensaje: 'Préstamo registrado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

// POST /api/prestamos/devolver  body: { id, devuelto: true|false }
// Reversible a propósito: si se marcó "devuelto" por error, se puede volver
// a marcar como "no devuelto" mandando devuelto: false.
router.post('/devolver', async (req, res) => {
  const { id, devuelto } = req.body;
  if (!id) return res.status(400).json({ ok: false, mensaje: 'Falta el id' });
  const nuevoEstado = devuelto !== false; // por defecto, si no se manda, se marca devuelto

  try {
    const [[prestamo]] = await pool.query('SELECT libro_id FROM prestamos WHERE id = ?', [id]);
    if (!prestamo) return res.status(404).json({ ok: false, mensaje: 'Préstamo no encontrado' });

    await pool.query(
      'UPDATE prestamos SET devuelto = ?, fecha_devolucion = ? WHERE id = ?',
      [nuevoEstado, nuevoEstado ? new Date() : null, id]
    );
    // El libro vuelve a quedar disponible si se marca devuelto, y vuelve a
    // quedar prestado (no disponible) si se revierte el error.
    await pool.query('UPDATE libros SET disponible = ? WHERE id = ?', [nuevoEstado, prestamo.libro_id]);

    res.json({
      ok: true,
      mensaje: nuevoEstado ? 'Devolución registrada' : 'Préstamo marcado como no devuelto',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

module.exports = router;
