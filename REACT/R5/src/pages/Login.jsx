import IngresoSocial from '../components/IngresoSocial';
// Login.jsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, usuario } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  useEffect(() => { if (usuario) navigate('/', { replace: true }); }, [usuario, navigate]);

  async function onSubmit(datos) {
    setError('');
    try {
      await login(datos.email, datos.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'No se pudo iniciar sesión');
    }
  }

  return (
    <div className="auth-card mx-auto">
      <h3 className="mb-3">Iniciar sesión</h3>
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            {...register('password', { required: 'La contraseña es obligatoria' })}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        <button className="btn btn-primary w-100" type="submit">Entrar</button>
      </form>
      <IngresoSocial />

      <p className="mt-3 text-center small">
        ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </div>
  );
}
