// App.jsx
// Versión SIN React Router: una sola "página" que cambia de contenido
// según el estado "vista" (login | registro | panel | socios | libros |
// prestamos). La protección de las vistas privadas es un simple if:
// si no hay usuario, siempre se muestra login/registro sin importar
// qué vista esté seleccionada.

import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Login from './views/Login';
import Registro from './views/Registro';
import Panel from './views/Panel';
import Socios from './views/Socios';
import Libros from './views/Libros';
import Prestamos from './views/Prestamos';

function ContenidoPrincipal({ vista, setVista }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return <p className="text-center mt-5">Cargando...</p>;

  // Sin sesión: solo se puede ver login o registro (protección de datos:
  // no se renderiza ninguna vista de gestión sin usuario autenticado).
  if (!usuario) {
    return vista === 'registro'
      ? <Registro setVista={setVista} />
      : <Login setVista={setVista} />;
  }

  switch (vista) {
    case 'socios': return <Socios />;
    case 'libros': return <Libros />;
    case 'prestamos': return <Prestamos />;
    default: return <Panel />;
  }
}

export default function App() {
  const [vista, setVista] = useState('login');

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="app-layout">
          <Navbar vista={vista} setVista={setVista} />
          <main className="contenido p-4">
            <ContenidoPrincipal vista={vista} setVista={setVista} />
          </main>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
