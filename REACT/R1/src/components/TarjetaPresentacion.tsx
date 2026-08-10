import type { FC } from 'react';
import './TarjetaPresentacion.css';

/** Props que recibe la tarjeta de presentación. */
interface TarjetaPresentacionProps {
  nombre: string;
  apellido: string;
  profesion: string;
  imagenUrl: string;
}

/**
 * TarjetaPresentacion / Muestra una tarjeta con foto, nombre completo y profesión. */
const TarjetaPresentacion: FC<TarjetaPresentacionProps> = ({
  nombre,
  apellido,
  profesion,
  imagenUrl,
}) => {
  return (
    <article className="tarjeta">
      <div className="tarjeta-avatar-wrap">
        <img
          src={imagenUrl}
          alt={`Foto de ${nombre} ${apellido}`}
          className="tarjeta-avatar"
        />
      </div>
      <h1 className="tarjeta-nombre">
        {nombre} <span className="tarjeta-apellido">{apellido}</span>
      </h1>
      <p className="tarjeta-profesion">{profesion}</p>
    </article>
  );
};

export default TarjetaPresentacion;