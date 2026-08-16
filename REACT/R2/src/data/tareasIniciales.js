// Lista de tareas de ejemplo con la que arranca la aplicación la primera
// vez (cuando todavía no hay nada guardado en localStorage).

const tareasIniciales = [
  {
    id: 1,
    titulo: "Terminar TP de React Router",
    descripcion:
      "Armar la app de lista de tareas con Home, Detalle y Creación usando React Router.",
    fechaCreacion: "2026-08-10T09:00:00.000Z",
    completa: false,
  },
  {
    id: 2,
    titulo: "Repasar arquitectura de computadoras",
    descripcion: "Revisar el módulo de ensamblador x86 antes del parcial.",
    fechaCreacion: "2026-08-12T14:30:00.000Z",
    completa: false,
  },
  {
    id: 3,
    titulo: "Entregar informe de calidad de software",
    descripcion: "Completar el checklist de casos de prueba y subirlo al campus.",
    fechaCreacion: "2026-08-08T18:15:00.000Z",
    completa: true,
  },
];

export default tareasIniciales;
