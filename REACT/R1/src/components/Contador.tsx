import { useState } from 'react';
import type { FC } from 'react';
import './Contador.css';

/**  El valor se guarda en estado local con useState. */
const Contador: FC = () => {
  const [valor, setValor] = useState<number>(0);

  const incrementar = (): void => setValor((prev) => prev + 1);
  const decrementar = (): void => setValor((prev) => prev - 1);
  const reiniciar = (): void => setValor(0);

  return (
    <section className="contador-card">
      <span className="contador-eyebrow"> Proyecto 3</span>

      <p className="contador-valor">{valor}</p>

      <div className="contador-botones">
        <button
          className="contador-btn contador-btn-decrementar"
          onClick={decrementar}
          aria-label="Decrementar"
        >
          −
        </button>
        <button
          className="contador-btn contador-btn-reiniciar"
          onClick={reiniciar}
          aria-label="Reiniciar contador"
        >
          Reiniciar
        </button>
        <button
          className="contador-btn contador-btn-incrementar"
          onClick={incrementar}
          aria-label="Incrementar"
        >
          +
        </button>
      </div>
    </section>
  );
};

export default Contador;