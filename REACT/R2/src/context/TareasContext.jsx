// Contexto que centraliza el estado de las tareas para toda la app.
// El estado vive con useState
//  Se sincroniza con localStorage para que las tareas persistan al recargar la página

import { createContext, useContext, useEffect, useState } from "react";
import tareasIniciales from "../data/tareasIniciales";

const CLAVE_STORAGE = "reactLatest_tareas";

const TareasContext = createContext(null);

export function TareasProvider({ children }) {
  // Estado inicial: intenta leer de localStorage; si no hay nada, usa
  // el archivo de datos de ejemplo.
  const [tareas, setTareas] = useState(() => {
    try {
      const guardadas = localStorage.getItem(CLAVE_STORAGE);
      return guardadas ? JSON.parse(guardadas) : tareasIniciales;
    } catch {
      return tareasIniciales;
    }
  });

  // Cada vez que cambia la lista de tareas, la persiste en localStorage.
  useEffect(() => {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(tareas));
  }, [tareas]);

  // Agrega una tarea nueva a la lista (se llama desde la página Crear).
  function agregarTarea({ titulo, descripcion, completa }) {
    const nuevaTarea = {
      id: Date.now(),
      titulo,
      descripcion,
      fechaCreacion: new Date().toISOString(),
      completa,
    };
    setTareas((prev) => [...prev, nuevaTarea]);
    return nuevaTarea;
  }

  // Busca una tarea por id (se usa en la página de Detalle).
  function obtenerTareaPorId(id) {
    return tareas.find((t) => String(t.id) === String(id));
  }

  // Cambia el estado completa/incompleta de una tarea existente
  // (se usa desde la página de Detalle).
  function alternarCompleta(id) {
    setTareas((prev) =>
      prev.map((t) =>
        String(t.id) === String(id) ? { ...t, completa: !t.completa } : t
      )
    );
  }

  // Elimina una tarea de la lista (se usa desde la página de Detalle).
  function eliminarTarea(id) {
    setTareas((prev) => prev.filter((t) => String(t.id) !== String(id)));
  }

  const valor = {
    tareas,
    agregarTarea,
    obtenerTareaPorId,
    alternarCompleta,
    eliminarTarea,
  };

  return (
    <TareasContext.Provider value={valor}>{children}</TareasContext.Provider>
  );
}

// Hook de conveniencia para consumir el contexto en cualquier componente.
export function useTareas() {
  const contexto = useContext(TareasContext);
  if (!contexto) {
    throw new Error("useTareas debe usarse dentro de un <TareasProvider>");
  }
  return contexto;
}
