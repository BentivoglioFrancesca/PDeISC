// Registro.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Filtra en tiempo real: solo letras y espacios (bloquea números y
// caracteres especiales mientras se escribe, no recién al enviar).
function bloquearNoLetras(e) {
  e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
}

export default function Registro() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);

  async function onSubmit(datos) {
    setError('');
    try {
      await registrar(datos.nombre, datos.email, datos.password);
      setOk(true);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'No se pudo registrar');
    }
  }

  return (
    <div className="auth-card mx-auto">
      <h3 className="mb-3">Crear cuenta</h3>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      {ok && <div className="alert alert-success py-2">Cuenta creada, redirigiendo...</div>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
            onInput={bloquearNoLetras}
            {...register('nombre', {
              required: 'El nombre es obligatorio',
              pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: 'Solo letras' },
            })}
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', { required: 'El email es obligatorio' })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' },
            })}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        <button className="btn btn-primary w-100" type="submit">Registrarme</button>
      </form>

      <p className="mt-3 text-center small">
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </div>
  );
}
