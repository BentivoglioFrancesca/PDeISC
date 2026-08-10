import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import './ListaTareas.css';

/** Forma de cada tarea guardada en el estado. */
interface Tarea {
  id: number;
  texto: string;
  completada: boolean;
}

/**
 * ListaTareas
 * Permite agregar tareas a una lista y marcarlas como completadas. */
const ListaTareas: FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [texto, setTexto] = useState<string>('');

  /** Agrega una nueva tarea al arreglo si el input no está vacío. */
  const agregarTarea = (e: FormEvent): void => {
    e.preventDefault();
    const textoLimpio = texto.trim();
    if (!textoLimpio) return;

    const nuevaTarea: Tarea = {
      id: Date.now(),
      texto: textoLimpio,
      completada: false,
    };

    setTareas((prev) => [...prev, nuevaTarea]);
    setTexto('');
  };

  /** Alterna el estado completada/pendiente de una tarea por id. */
  const alternarCompletada = (id: number): void => {
    setTareas((prev) =>
      prev.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  /** Elimina una tarea del arreglo por id. */
  const eliminarTarea = (id: number): void => {
    setTareas((prev) => prev.filter((tarea) => tarea.id !== id));
  };

  const pendientes = tareas.filter((t) => !t.completada).length;

  return (
    <section className="tareas-card">
      <span className="tareas-eyebrow">Lista de tareas</span>
      <h1 className="tareas-titulo">
        {pendientes > 0
          ? `${pendientes} pendiente${pendientes > 1 ? 's' : ''}`
          : 'Todo al día '}
      </h1>

      <form className="tareas-form" onSubmit={agregarTarea}>
        <input
          type="text"
          className="tareas-input"
          placeholder="Escribí una nueva tarea..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit" className="tareas-btn-agregar">
          Agregar
        </button>
      </form>

      {tareas.length === 0 ? (
        <p className="tareas-vacio">Todavía no agregaste ninguna tarea.</p>
      ) : (
        <ul className="tareas-lista">
          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              className={`tareas-item ${tarea.completada ? 'completada' : ''}`}
            >
              <label className="tareas-check-wrap">
                <input
                  type="checkbox"
                  checked={tarea.completada}
                  onChange={() => alternarCompletada(tarea.id)}
                />
                <span className="tareas-check-custom" />
                <span className="tareas-texto">{tarea.texto}</span>
              </label>
              <button
                className="tareas-btn-eliminar"
                onClick={() => eliminarTarea(tarea.id)}
                aria-label={`Eliminar tarea: ${tarea.texto}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ListaTareas;