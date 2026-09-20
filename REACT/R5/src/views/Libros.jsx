// Libros.jsx
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/api';

// Filtra en tiempo real: solo letras y espacios (bloquea números y
// caracteres especiales mientras se escribe, no recién al enviar).
function bloquearNoLetras(e) {
  e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
}

export default function Libros() {
  const [libros, setLibros] = useState([]);
  const [orden, setOrden] = useState('ASC');
  const [error, setError] = useState('');
  const [confirmarId, setConfirmarId] = useState(null); // id del libro a confirmar antes de borrar
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const cargarLibros = useCallback(async () => {
    try {
      const { data } = await api.post('/libros/listar', { orden });
      setLibros(data.libros);
    } catch (err) {
      setError('No se pudo cargar el listado de libros');
    }
  }, [orden]);

  useEffect(() => { cargarLibros(); }, [cargarLibros]);

  async function onSubmit(datos) {
    setError('');
    try {
      await api.post('/libros/crear', datos);
      reset();
      cargarLibros();
    } catch (err) {
      setError(err.response?.data?.mensaje || 'No se pudo crear el libro');
    }
  }

  // Borrado en dos pasos, sin usar confirm()/alert() del navegador:
  // el primer click pide confirmación en la misma fila; el segundo borra.
  async function eliminar(id) {
    await api.post('/libros/eliminar', { id });
    setConfirmarId(null);
    cargarLibros();
  }

  // Marca disponible/no disponible a mano (independiente de los préstamos,
  // por ejemplo si el libro se perdió o está en reparación).
  async function cambiarDisponibilidad(id, disponible) {
    await api.post('/libros/disponibilidad', { id, disponible });
    cargarLibros();
  }

  return (
    <div>
      <h2>Libros</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="row g-2 mb-4" noValidate>
        <div className="col-md-5">
          <input
            className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
            placeholder="Título"
            {...register('titulo', { required: true })}
          />
        </div>
        <div className="col-md-5">
          <input
            className={`form-control ${errors.autor ? 'is-invalid' : ''}`}
            placeholder="Autor"
            onInput={bloquearNoLetras}
            {...register('autor', { required: true, pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/ })}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">Agregar</button>
        </div>
      </form>

      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setOrden((o) => (o === 'ASC' ? 'DESC' : 'ASC'))}
        >
          Ordenar por título: {orden === 'ASC' ? 'A → Z' : 'Z → A'} 🔃
        </button>
      </div>

      <table className="table table-hover align-middle">
        <thead>
          <tr><th>Título</th><th>Autor</th><th>Disponible</th><th></th></tr>
        </thead>
        <tbody>
          {libros.map((l) => (
            <tr key={l.id}>
              <td>{l.titulo}</td>
              <td>{l.autor}</td>
              <td>
                <button
                  className={`badge border-0 ${l.disponible ? 'bg-success' : 'bg-secondary'}`}
                  onClick={() => cambiarDisponibilidad(l.id, !l.disponible)}
                  title="Click para cambiar la disponibilidad a mano"
                >
                  {l.disponible ? 'Disponible' : 'No disponible'}
                </button>
              </td>
              <td>
                {confirmarId === l.id ? (
                  <div className="d-flex gap-1">
                    <button className="btn btn-sm btn-danger" onClick={() => eliminar(l.id)}>
                      Confirmar
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setConfirmarId(null)}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-sm btn-outline-danger" onClick={() => setConfirmarId(l.id)}>
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
          {libros.length === 0 && (
            <tr><td colSpan="4" className="text-center text-muted">Sin libros cargados</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
