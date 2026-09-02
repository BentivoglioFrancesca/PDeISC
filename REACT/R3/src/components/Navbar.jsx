// Navbar.jsx
// Misma placa/estante que la versión con router, pero los links cambian
// la variable de estado "vista" en vez de navegar a una URL.

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import FechaHoy from './FechaHoy';

export default function Navbar({ vista, setVista }) {
  const { usuario, logout } = useAuth();
  const { tema, alternarTema } = useTheme();

  function handleLogout() {
    logout();
    setVista('login');
  }

  const links = [
    { id: 'panel', label: 'Panel' },
    { id: 'socios', label: 'Socios' },
    { id: 'libros', label: 'Libros' },
    { id: 'prestamos', label: 'Préstamos' },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-placa">
        <h4>Biblioteca</h4>
        <FechaHoy />
      </div>

      <div className="sidebar-cuerpo">
        {usuario && (
          <div className="nav flex-column gap-1 mb-3">
            {links.map((l) => (
              <button
                key={l.id}
                className={`nav-link text-start ${vista === l.id ? 'active' : ''}`}
                onClick={() => setVista(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto d-flex flex-column gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={alternarTema}>
            {tema === 'claro' ? 'Modo noche' : 'Modo día'}
          </button>
          {usuario && (
            <>
              <span className="small sidebar-texto-suave">Hola, {usuario.nombre}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
