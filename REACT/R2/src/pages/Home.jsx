// pages/Home.jsx
// -----------------------------------------------------------------------
// Página de inicio: muestra la lista de tareas (título + descripción
// corta) y permite ordenarlas por fecha de creación de forma ascendente
// o descendente. Cada tarjeta enlaza a la página de Detalle.
// -----------------------------------------------------------------------

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTareas } from "../context/TareasContext";
import TareaCard from "../components/TareaCard";

export default function Home() {
  const { tareas } = useTareas();
  // "desc" = más nuevas primero, "asc" = más antiguas primero
  const [orden, setOrden] = useState("desc");

  const tareasOrdenadas = useMemo(() => {
    const copia = [...tareas];
    copia.sort((a, b) => {
      const fechaA = new Date(a.fechaCreacion).getTime();
      const fechaB = new Date(b.fechaCreacion).getTime();
      return orden === "asc" ? fechaA - fechaB : fechaB - fechaA;
    });
    return copia;
  }, [tareas, orden]);

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h1 className="pagina-titulo mb-1">Lista de tareas</h1>
          <p className="text-muted mb-0">
            {tareas.length} tarea{tareas.length !== 1 ? "s" : ""} en total
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <label htmlFor="ordenSelect" className="form-label mb-0 small text-muted">
            Ordenar por fecha:
          </label>
          <select
            id="ordenSelect"
            className="form-select form-select-sm selector-orden"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="desc">Más recientes primero</option>
            <option value="asc">Más antiguas primero</option>
          </select>
        </div>
      </div>

      {tareas.length === 0 ? (
        <div className="text-center py-5 estado-vacio">
          <p className="text-muted mb-3">Todavía no hay tareas cargadas.</p>
          <Link to="/crear" className="btn btn-app-primary">
            Crear la primera tarea
          </Link>
        </div>
      ) : (
        <div className="row g-3">
          {tareasOrdenadas.map((tarea) => (
            <div className="col-12 col-sm-6 col-lg-4" key={tarea.id}>
              <TareaCard tarea={tarea} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
