import styles from './Juegos.module.css';
import snake from '../../assets/snake.png';
import { BsPlayCircle } from 'react-icons/bs';

const SnakeGame = () => {
  return (
    <div className={styles.container} data-testid='snake'>
      {/* Título */}
      <h1 className={styles.titulo}>🐍 SNAKE <span className={styles.icono}>🎮</span></h1>

      {/* Sección de la imagen y la descripción */}
      <div className={styles.contenido}>
        {/* Enlace a la URL donde está el juego */}
        <a href="http://localhost:5173/catalogo" target="_blank" rel="noopener noreferrer" className={styles.imagenContainer} data-testid='snakeImg'>
          <img src={snake} alt="Snake" className={styles.imagenSnake} />
          <BsPlayCircle className={styles.playIcon} size={80} color="Red" />
        </a>

        <div className={styles.descripcionBox} data-testid='snakeDesc'>
          <h2>Descripción:</h2>
          <p>¡Bienvenido al clásico juego de Snake! Controla a la serpiente mientras se desliza por el tablero en busca de comida.</p>
          <ul>
            <li>🎓 <strong>Cómo Jugar:</strong></li>
            <li>💠 Usa las flechas de dirección para mover la serpiente.</li>
            <li>💠 Come la comida para crecer y aumentar tu puntuación.</li>
            <li>💠 Evita chocar contra los bordes y tu propio cuerpo.</li>
          </ul>
          <p>🎯 <strong>Objetivo:</strong> Sobrevive el mayor tiempo posible y consigue la puntuación más alta.</p>
          <p>¡Diviértete y demuestra tus reflejos! 🐍🔥</p>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
