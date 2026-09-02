// RutaProtegida.jsx
// Envuelve las páginas que requieren sesión iniciada. Si no hay usuario,
// redirige al login.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RutaProtegida({ children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return <p className="text-center mt-5">Cargando...</p>;
  if (!usuario) return <Navigate to="/login" replace />;

  return children;
}
