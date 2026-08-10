import { useState } from 'react';
import type { FC, FormEvent, ChangeEvent } from 'react';
import './FormularioSimple.css';

/** Solo letras (con tildes/ñ) y espacios; bloquea números y símbolos. */
const SOLO_LETRAS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

/** El valor del input se guarda en estado con useState.
 * Valida en tiempo real que solo se ingresen letras. */

const FormularioSimple: FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const [nombreEnviado, setNombreEnviado] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  /** Ignora cualquier tecla que no sea letra o espacio (validación en tiempo real). */
  const manejarCambioNombre = (e: ChangeEvent<HTMLInputElement>): void => {
    const valor = e.target.value;
    if (SOLO_LETRAS.test(valor)) {
      setNombre(valor);
      setError('');
    } else {
      setError('Solo se permiten letras, sin números ni símbolos.');
    }
  };

  const enviarFormulario = (e: FormEvent): void => {
    e.preventDefault();
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      setError('Ingresá tu nombre antes de continuar.');
      setNombreEnviado(null);
      return;
    }

    setError('');
    setNombreEnviado(nombreLimpio);
  };

  const editarNombre = (): void => {
    setNombreEnviado(null);
  };

  return (
    <section className="form-card">
      <span className="form-eyebrow">Formulario simple</span>

      {nombreEnviado ? (
        <div className="form-bienvenida">
          <h1 className="form-titulo">
            ¡Bienvenido/a,{' '}
            <span className="form-highlight">{nombreEnviado}</span>!
          </h1>
          <p className="form-subtitulo">Gracias por completar el formulario.</p>
          <button className="form-btn-secundario" onClick={editarNombre}>
            Volver a probar
          </button>
        </div>
      ) : (
        <form className="form-formulario" onSubmit={enviarFormulario} noValidate>
          <h1 className="form-titulo">¿Cómo te llamás?</h1>

          <label className="form-label" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            className="form-input"
            placeholder="Escribí tu nombre..."
            value={nombre}
            onChange={manejarCambioNombre}
          />
          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="form-btn-enviar">
            Enviar
          </button>
        </form>
      )}
    </section>
  );
};

export default FormularioSimple;