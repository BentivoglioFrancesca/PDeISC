// pages/Detalle.jsx
// -----------------------------------------------------------------------
// Página de detalle: muestra toda la información de una tarea puntual,
// obtenida a partir del :id de la URL (parámetro de ruta de React Router).
// -----------------------------------------------------------------------

import { Link, useNavigate, useParams } from "react-router-dom";
import { useTareas } from "../context/TareasContext";

function formatearFechaLarga(iso) {
  const fecha = new Date(iso);
  return fecha.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerTareaPorId, alternarCompleta, eliminarTarea } = useTareas();
  const tarea = obtenerTareaPorId(id);

  function manejarEliminar() {
    const confirmado = window.confirm(
      `¿Eliminar la tarea "${tarea.titulo}"? Esta acción no se puede deshacer.`
    );
    if (confirmado) {
      eliminarTarea(tarea.id);
      navigate("/");
    }
  }

  if (!tarea) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-3">Tarea no encontrada</h2>
        <p className="text-muted">
          Puede que haya sido eliminada o el enlace no sea correcto.
        </p>
        <Link to="/" className="btn btn-app-primary mt-2">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Link to="/" className="volver-link mb-3 d-inline-block">
        ← Volver a la lista
      </Link>

      <div className="card detalle-card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
            <h1 className="detalle-titulo mb-0">{tarea.titulo}</h1>
            <button
              type="button"
              className={`badge rounded-pill fs-6 border-0 estado-toggle ${
                tarea.completa ? "badge-completa" : "badge-pendiente"
              }`}
              onClick={() => alternarCompleta(tarea.id)}
              title="Tocar para cambiar el estado"
            >
              {tarea.completa ? "✓ Completa" : "○ Pendiente"}
            </button>
          </div>
          <p className="text-muted small mb-0">
            Tocá la etiqueta de estado para marcarla como{" "}
            {tarea.completa ? "pendiente" : "completa"}.
          </p>

          <p className="detalle-descripcion">{tarea.descripcion}</p>

          <hr className="my-4" />

          <div className="detalle-meta">
            <span className="detalle-meta__etiqueta">Fecha de creación</span>
            <span className="detalle-meta__valor">
              {formatearFechaLarga(tarea.fechaCreacion)}
            </span>
          </div>

          <hr className="my-4" />

          <button
            type="button"
            className="btn btn-eliminar"
            onClick={manejarEliminar}
          >
            🗑 Eliminar tarea
          </button>
        </div>
      </div>
    </div>
  );
}
