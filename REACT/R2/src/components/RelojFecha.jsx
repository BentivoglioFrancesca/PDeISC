// components/RelojFecha.jsx

// Se actualiza solo cada segundo mediante setInterval.

import { useEffect, useState } from "react";

function formatearFecha(fecha) {
  const opciones = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const texto = fecha.toLocaleDateString("es-AR", opciones);
  // Capitaliza la primera letra ("lunes" -> "Lunes")
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function formatearHora(fecha) {
  return fecha.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function RelojFecha() {
  const [ahora, setAhora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => setAhora(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="reloj-fecha text-center text-md-end">
      <div className="reloj-fecha__dia">{formatearFecha(ahora)}</div>
      <div className="reloj-fecha__hora">{formatearHora(ahora)}</div>
    </div>
  );
}
