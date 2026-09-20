import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './IngresoSocial.css';

function IconoProveedor({ proveedor }) {
  if (proveedor === 'google') return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.52h3.24c1.89-1.74 2.98-4.3 2.98-7.37Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.4l-3.24-2.52c-.9.6-2.05.96-3.38.96-2.6 0-4.81-1.76-5.6-4.12H3.05v2.6A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.4 13.92a6 6 0 0 1 0-3.84v-2.6H3.05a10 10 0 0 0 0 9.04l3.35-2.6Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.95 5.48l3.35 2.6C7.19 7.72 9.4 5.96 12 5.96Z"/></svg>;
  if (proveedor === 'github') return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.08c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.62 1.22 3.26.93.1-.73.39-1.22.71-1.5-2.5-.28-5.12-1.25-5.12-5.54 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.3-2.63 5.25-5.13 5.53.4.35.76 1.03.76 2.08v3.07c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/></svg>;
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.7 4.7a18 18 0 0 0-4.4-1.4l-.55 1.1a16.4 16.4 0 0 0-5.5 0L8.7 3.3a18 18 0 0 0-4.4 1.4C1.5 8.9.75 13 .95 17a18 18 0 0 0 5.4 2.7l1.1-1.8-1.7-.8.42-.33a12.8 12.8 0 0 0 11.66 0l.42.33-1.7.8 1.1 1.8a18 18 0 0 0 5.4-2.7c.25-4.6-.8-8.6-3.35-12.3ZM8.2 14.6c-1.05 0-1.9-.98-1.9-2.2s.85-2.2 1.9-2.2 1.9.99 1.9 2.2-.85 2.2-1.9 2.2Zm7.6 0c-1.05 0-1.9-.98-1.9-2.2s.85-2.2 1.9-2.2 1.9.99 1.9 2.2-.85 2.2-1.9 2.2Z"/></svg>;
}

export default function IngresoSocial() {
  const { loginSocial, errorSocial, cargando } = useAuth();
  const [error, setError] = useState('');
  const [pendiente, setPendiente] = useState('');
  async function ingresar(provider) {
    setError('');
    setPendiente(provider);
    try { await loginSocial(provider); }
    catch (err) { setError(err.message || 'No se pudo iniciar el ingreso social'); setPendiente(''); }
  }
  return <div className="ingreso-social">
    <p className="ingreso-social-separador"><span>O continuá con</span></p>
    {(error || errorSocial) && <div role="alert" className="alert alert-danger py-2">{error || errorSocial}</div>}
    <div className="ingreso-social-botones">
      {[['google', 'Google'], ['github', 'GitHub'], ['discord', 'Discord']].map(([id, nombre]) =>
        <button key={id} type="button" className={`ingreso-social-boton ingreso-social-${id}`} disabled={!!pendiente || cargando} aria-busy={pendiente === id} onClick={() => ingresar(id)}>
          <span className="ingreso-social-icono"><IconoProveedor proveedor={id} /></span>
          <span>{pendiente === id ? 'Redirigiendo…' : 'Continuar con ' + nombre}</span>
          {pendiente === id && <span className="ingreso-social-spinner" aria-hidden="true" />}
        </button>)}
    </div>
  </div>;
}