import styles from './Juegos.module.css';
import flappy from '../../assets/flappy.png';
import { BsPlayCircle } from 'react-icons/bs';

const Flappybird = () => {
  return (
    <div className={styles.container} data-testid='flappybird'>
      <h1 className={styles.titulo}>🐦‍⬛ Flappy Bird <span className={styles.icono}>🎮</span></h1>
      <div className={styles.contenido}>
        <a 
          href="/src/components/Juegos/flappybird/flappybird.html"
          rel="noopener noreferrer"
          className={styles.imagenContainer} data-testid='flappybirdImg'
        >
          <img src={flappy} alt="Flappy Bird" className={styles.imagenSnake} />
          <BsPlayCircle className={styles.playIcon} size={80} color="Red" />
        </a>

        <div className={styles.descripcionBox} data-testid='flappybirdDesc'>
          <h2>Descripción:</h2>
          <p>¡Bienvenido a Flappy Bird! Ayuda a este pequeño pájaro a volar lo más lejos posible mientras esquivas los obstáculos.</p>
          
          <ul>
            <li>🎓 <strong>Cómo Jugar:</strong></li>
            <li>💠 Haz clic con el mouse o toca la pantalla para hacer que el pájaro aletee y suba.</li>
            <li>💠 Suelta para que baje por la gravedad.</li>
            <li>💠 Esquiva los tubos y mantente en el aire el mayor tiempo posible.</li>
          </ul>

          <p>🎯 <strong>Objetivo:</strong> Consigue la mayor puntuación sobreviviendo el mayor tiempo posible sin chocar.</p>
          <p>¡Pon a prueba tus reflejos y llega lo más lejos que puedas! 🐦🔥</p>
        </div>
      </div>
    </div>
  );
};

export default Flappybird;
