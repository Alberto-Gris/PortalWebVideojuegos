import styles from './Juegos.module.css';
import othello from '../../assets/othello.png';
import { BsPlayCircle } from 'react-icons/bs';

const Othello = () => {
  return (
    <div className={styles.container}>
      {/* Título */}
      <h1 className={styles.titulo}>⚫⚪ Othello <span className={styles.icono}>🎮</span></h1>

      {/* Sección de la imagen y la descripción */}
      <div className={styles.contenido}>
        {/* Enlace a la URL donde está el juego */}
        <a href="http://localhost:5173/catalogo" target="_blank" rel="noopener noreferrer" className={styles.imagenContainer}>
          <img src={othello} alt="Othello" className={styles.imagenSnake} />
          <BsPlayCircle className={styles.playIcon} size={80} color="Red" />
        </a>

        <div className={styles.descripcionBox}>
          <h2>Descripción:</h2>
          <p>Othello es un juego de estrategia donde dos jugadores compiten por dominar el tablero colocando fichas blancas y negras para capturar las del oponente.</p>
          
          <ul>
            <li>🎓 <strong>Cómo Jugar:</strong></li>
            <li>💠 Coloca tus fichas de manera que encierres las del rival entre dos de las tuyas.</li>
            <li>💠 Las fichas del oponente atrapadas se voltean a tu color.</li>
            <li>💠 Planea tus movimientos para maximizar las capturas y controlar el tablero.</li>
            <li>💠 El juego termina cuando no hay más movimientos posibles.</li>
          </ul>
          
          <p>🎯 <strong>Objetivo:</strong> Termina la partida con más fichas de tu color en el tablero.</p>
          <p>¡Piensa estratégicamente y controla el juego! ⚫⚪</p>
        </div>
      </div>
    </div>
  );
};

export default Othello;
