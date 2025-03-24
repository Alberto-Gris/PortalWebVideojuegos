import styles from './Juegos.module.css';
import tetris from '../../assets/tetrix.png';
import { BsPlayCircle } from 'react-icons/bs';

const Tetris = () => {
  return (
    <div className={styles.container}>
      {/* Título */}
      <h1 className={styles.titulo}>👾 TETRIS <span className={styles.icono}>🎮</span></h1>

      {/* Sección de la imagen y la descripción */}
      <div className={styles.contenido}>
        {/* Enlace a la URL donde está el juego */}
        <a href="http://localhost:5173/catalogo" target="_blank" rel="noopener noreferrer" className={styles.imagenContainer}>
          <img src={tetris} alt="Tetris" className={styles.imagenSnake} />
          <BsPlayCircle className={styles.playIcon} size={80} color="Red" />
        </a>

        <div className={styles.descripcionBox}>
          <h2>Descripción:</h2>
          <p>¡Bienvenido al clásico Tetris! Un juego de lógica donde debes encajar piezas de diferentes formas que caen desde la parte superior.</p>
          
          <ul>
            <li>🎓 <strong>Cómo Jugar:</strong></li>
            <li>💠 Usa las flechas de dirección para mover las piezas a la izquierda o derecha.</li>
            <li>💠 Gira las piezas para que encajen en los espacios.</li>
            <li>💠 Completa filas horizontales para eliminarlas y sumar puntos.</li>
            <li>💠 Evita que las piezas se acumulen hasta la parte superior.</li>
          </ul>

          <p>🎯 <strong>Objetivo:</strong> Mantén la pantalla limpia el mayor tiempo posible y consigue la puntuación más alta.</p>
          <p>¡Pon a prueba tu estrategia y velocidad mental! 🧠🎮</p>
        </div>
      </div>
    </div>
  );
};

export default Tetris;
