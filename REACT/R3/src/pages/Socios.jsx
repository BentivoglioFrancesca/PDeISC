// Socios.jsx
// CRUD simple de socios. El listado se pide de nuevo al backend cada vez
// que cambia el orden (todo por POST, incluyendo el listado).

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/api';

// Filtra en tiempo real: solo letras y espacios (bloquea números y
// caracteres especiales mientras se escribe, no recién al enviar).
function bloquearNoLetras(e) {
  e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
}

export default function Socios() {
  const [socios, setSocios] = useState([]);
  const [orden, setOrden] = useState('ASC');
  const [error, setError] = useState('');
  const [confirmarId, setConfirmarId] = useState(null); // id del socio a confirmar antes de borrar
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const cargarSocios = useCallback(async () => {
    try {
      const { data } = await api.post('/socios/listar', { orden });
      setSocios(data.socios);
    } catch (err) {
      setError('No se pudo cargar el listado de socios');
    }
  }, [orden]);

  useEffect(() => { cargarSocios(); }, [cargarSocios]);

  async function onSubmit(datos) {
    setError('');
    try {
      await api.post('/socios/crear', datos);
      reset();
      cargarSocios();
    } catch (err) {
      setError(err.response?.data?.mensaje || 'No se pudo crear el socio');
    }
  }

  // Borrado en dos pasos, sin usar confirm()/alert() del navegador:
  // el primer click pide confirmación en la misma fila; el segundo borra.
  async function eliminar(id) {
    await api.post('/socios/eliminar', { id });
    setConfirmarId(null);
    cargarSocios();
  }

  return (
    <div>
      <h2>Socios</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="row g-2 mb-4" noValidate>
        <div className="col-md-4">
          <input
            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
            placeholder="Nombre"
            onInput={bloquearNoLetras}
            {...register('nombre', {
              required: true,
              pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
            })}
          />
        </div>
        <div className="col-md-4">
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Email"
            {...register('email', { required: true })}
          />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Teléfono" {...register('telefono')} />
        </div>
        <div className="col-md-1">
          <button className="btn btn-primary w-100" type="submit">+</button>
        </div>
      </form>

      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setOrden((o) => (o === 'ASC' ? 'DESC' : 'ASC'))}
        >
          Ordenar por nombre: {orden === 'ASC' ? 'A → Z' : 'Z → A'} 🔃
        </button>
      </div>

      <table className="table table-hover align-middle">
        <thead>
          <tr><th>Nombre</th><th>Email</th><th>Teléfono</th><th></th></tr>
        </thead>
        <tbody>
          {socios.map((s) => (
            <tr key={s.id}>
              <td>{s.nombre}</td>
              <td>{s.email}</td>
              <td>{s.telefono || '-'}</td>
              <td>
                {confirmarId === s.id ? (
                  <div className="d-flex gap-1">
                    <button className="btn btn-sm btn-danger" onClick={() => eliminar(s.id)}>
                      Confirmar
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setConfirmarId(null)}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-sm btn-outline-danger" onClick={() => setConfirmarId(s.id)}>
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
          {socios.length === 0 && (
            <tr><td colSpan="4" className="text-center text-muted">Sin socios cargados</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
