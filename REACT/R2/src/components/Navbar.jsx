// components/Navbar.jsx

import { Link } from "react-router-dom";
import { useTema } from "../context/TemaContext";
import RelojFecha from "./RelojFecha";

export default function Navbar() {
  const { tema, alternarTema } = useTema();

  return (
    <nav className="navbar navbar-expand-md app-navbar shadow-sm">
      <div className="container app-navbar__contenido">
        <div className="app-navbar__fila-superior">
          <Link className="navbar-brand app-navbar__brand" to="/">
            Mis <span>Tareas</span>
          </Link>
          <RelojFecha />
        </div>

        <div className="app-navbar__acciones">
          <Link to="/crear" className="btn btn-app-primary btn-sm">
            + Nueva tarea
          </Link>

          <button
            type="button"
            className="btn btn-toggle-tema btn-sm"
            onClick={alternarTema}
            aria-label="Cambiar modo día/noche"
            title="Cambiar modo día/noche"
          >
            {tema === "claro" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}
