// Prestamos.jsx
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/api';

export default function Prestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [socios, setSocios] = useState([]);
  const [libros, setLibros] = useState([]);
  const [orden, setOrden] = useState('DESC');
  const [error, setError] = useState('');
  const { register, handleSubmit, reset } = useForm();

  const cargarTodo = useCallback(async () => {
    try {
      const [rp, rs, rl] = await Promise.all([
        api.post('/prestamos/listar', { orden }),
        api.post('/socios/listar', { orden: 'ASC' }),
        api.post('/libros/listar', { orden: 'ASC' }),
      ]);
      setPrestamos(rp.data.prestamos);
      setSocios(rs.data.socios);
      setLibros(rl.data.libros.filter((l) => l.disponible));
    } catch (err) {
      setError('No se pudo cargar la información');
    }
  }, [orden]);

  useEffect(() => { cargarTodo(); }, [cargarTodo]);

  async function onSubmit(datos) {
    setError('');
    try {
      await api.post('/prestamos/crear', datos);
      reset();
      cargarTodo();
    } catch (err) {
      setError(err.response?.data?.mensaje || 'No se pudo registrar el préstamo');
    }
  }

  // Reversible a propósito: si te equivocaste al marcar, podés volver
  // atrás mandando devuelto: false en vez de tener que arreglarlo a mano.
  async function cambiarEstado(id, devuelto) {
    await api.post('/prestamos/devolver', { id, devuelto });
    cargarTodo();
  }

  return (
    <div>
      <h2>Préstamos</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="row g-2 mb-4" noValidate>
        <div className="col-md-5">
          <select className="form-select" {...register('socio_id', { required: true })}>
            <option value="">Seleccionar socio</option>
            {socios.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
          </select>
        </div>
        <div className="col-md-5">
          <select className="form-select" {...register('libro_id', { required: true })}>
            <option value="">Seleccionar libro disponible</option>
            {libros.map((l) => <option key={l.id} value={l.id}>{l.titulo}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">Prestar</button>
        </div>
      </form>

      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setOrden((o) => (o === 'ASC' ? 'DESC' : 'ASC'))}
        >
          Ordenar por fecha: {orden === 'ASC' ? 'más antiguo primero' : 'más reciente primero'} 🔃
        </button>
      </div>

      <table className="table table-hover align-middle">
        <thead>
          <tr><th>Socio</th><th>Libro</th><th>Fecha préstamo</th><th>Estado</th><th></th></tr>
        </thead>
        <tbody>
          {prestamos.map((p) => (
            <tr key={p.id}>
              <td>{p.socio_nombre}</td>
              <td>{p.libro_titulo}</td>
              <td>{new Date(p.fecha_prestamo).toLocaleDateString('es-AR')}</td>
              <td>
                <span className={`badge ${p.devuelto ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {p.devuelto ? 'Devuelto' : 'En préstamo'}
                </span>
              </td>
              <td>
                {!p.devuelto ? (
                  <button className="btn btn-sm btn-outline-success" onClick={() => cambiarEstado(p.id, true)}>
                    Marcar devuelto
                  </button>
                ) : (
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => cambiarEstado(p.id, false)}>
                    Deshacer devolución
                  </button>
                )}
              </td>
            </tr>
          ))}
          {prestamos.length === 0 && (
            <tr><td colSpan="5" className="text-center text-muted">Sin préstamos registrados</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
