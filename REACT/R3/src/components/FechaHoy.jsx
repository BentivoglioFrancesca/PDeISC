// FechaHoy.jsx
import { useState, useEffect } from 'react';

export default function FechaHoy() {
  const [ahora, setAhora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => setAhora(new Date()), 60000);
    return () => clearInterval(intervalo);
  }, []);

  const texto = ahora.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return <span className="fecha-hoy">{texto}</span>;
}
