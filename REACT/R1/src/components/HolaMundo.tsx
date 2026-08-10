import type { FC } from 'react';
import './HolaMundo.css';

const HolaMundo: FC = () => {
  return (
    <section className="hola-card">
      <span className="hola-eyebrow">React + Vite</span>
      <h1 className="hola-title">
        ¡Hola, <span className="hola-highlight">mundo</span>!
      </h1>
    </section>
  );
};

export default HolaMundo;