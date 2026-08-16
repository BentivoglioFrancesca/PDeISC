// pages/Crear.jsx
// -----------------------------------------------------------------------
// Página de creación: formulario controlado por React (useState) para
// cargar título, descripción y estado (completa/incompleta). Al enviar,
// agrega la tarea al estado global (vía TareasContext) y redirige al
// detalle de la tarea recién creada.
// -----------------------------------------------------------------------

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTareas } from "../context/TareasContext";

export default function Crear() {
  const { agregarTarea } = useTareas();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [completa, setCompleta] = useState(false);
  const [error, setError] = useState("");

  function manejarEnvio(evento) {
    evento.preventDefault();

    if (!titulo.trim() || !descripcion.trim()) {
      setError("El título y la descripción son obligatorios.");
      return;
    }

    const nuevaTarea = agregarTarea({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      completa,
    });

    navigate(`/tarea/${nuevaTarea.id}`);
  }

  return (
    <div className="container py-4">
      <Link to="/" className="volver-link mb-3 d-inline-block">
        ← Volver a la lista
      </Link>

      <div className="card crear-card shadow-sm">
        <div className="card-body">
          <h1 className="pagina-titulo mb-4">Nueva tarea</h1>

          <form onSubmit={manejarEnvio} noValidate>
            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">
                Título
              </label>
              <input
                type="text"
                id="titulo"
                className="form-control"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Repasar apuntes de arquitectura"
                maxLength={80}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <textarea
                id="descripcion"
                className="form-control"
                rows="4"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Detalle de la tarea..."
                maxLength={400}
              />
            </div>

            <div className="form-check form-switch mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="completa"
                checked={completa}
                onChange={(e) => setCompleta(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="completa">
                {completa ? "Marcada como completa" : "Marcada como incompleta"}
              </label>
            </div>

            <button type="submit" className="btn btn-app-primary">
              Crear tarea
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
