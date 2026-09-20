// Panel.jsx
import { useAuth } from '../context/AuthContext';

export default function Panel() {
  const { usuario } = useAuth();
  return (
    <div>
      <h2>Bienvenido/a, {usuario?.nombre} 👋</h2>
      <p className="text-muted">
        Usá el menú de la izquierda para gestionar socios, libros y préstamos.
      </p>
    </div>
  );
}
