// components/TareaCard.jsx

// Tarjeta que representa una tarea dentro del listado de Inicio.
// Es un enlace completo hacia la página de Detalle de esa tarea.


import { Link } from "react-router-dom";

function acortar(texto, maximo = 90) {
  if (texto.length <= maximo) return texto;
  return texto.slice(0, maximo).trimEnd() + "…";
}

export default function TareaCard({ tarea }) {
  return (
    <Link to={`/tarea/${tarea.id}`} className="tarea-card-link text-decoration-none">
      <div
        className={`card tarea-card h-100 ${
          tarea.completa ? "completa" : "pendiente"
        }`}
      >
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title tarea-card__titulo mb-0">{tarea.titulo}</h5>
            <span
              className={`badge rounded-pill ${
                tarea.completa ? "badge-completa" : "badge-pendiente"
              }`}
            >
              {tarea.completa ? "Completa" : "Pendiente"}
            </span>
          </div>
          <p className="card-text tarea-card__descripcion flex-grow-1">
            {acortar(tarea.descripcion)}
          </p>
          <span className="tarea-card__ver-mas">Ver detalle →</span>
        </div>
      </div>
    </Link>
  );
}
