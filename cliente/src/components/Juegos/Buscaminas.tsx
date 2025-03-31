import styles from './Juegos.module.css';
import busca from '../../assets/buscaminas.png';
import { BsPlayCircle } from 'react-icons/bs';

const Buscaminas = () => {
  return (
    <div className={styles.container} data-testid='buscaminas'>
      {/* Título */}
      <h1 className={styles.titulo}>💥 Buscaminas <span className={styles.icono}>🎮</span></h1>

      {/* Sección de la imagen y la descripción */}
      <div className={styles.contenido}>
        {/* Enlace a la URL donde está el juego */}
        <a href="http://localhost:5173/catalogo" target="_blank" rel="noopener noreferrer" className={styles.imagenContainer} data-testid='buscaminasImg'>
          <img src={busca} alt="Buscaminas" className={styles.imagenSnake} />
          <BsPlayCircle className={styles.playIcon} size={80} color="Red" />
        </a>

        <div className={styles.descripcionBox} data-testid='buscaminasDesc'>
          <h2>Descripción:</h2>
          <p>¡Pon a prueba tu lógica en el clásico juego de Buscaminas! Descubre las celdas vacías y evita detonar las minas escondidas en el tablero.</p>
          
          <ul>
            <li>🎓 <strong>Cómo Jugar:</strong></li>
            <li>💠 Haz clic en una celda para revelar lo que hay debajo.</li>
            <li>💠 Si encuentras un número, indica cuántas minas hay alrededor.</li>
            <li>💠 Marca las minas con banderas para no olvidarlas.</li>
            <li>💠 Evita hacer clic en una mina o perderás la partida.</li>
          </ul>
          
          <p>🎯 <strong>Objetivo:</strong> Revela todas las celdas seguras sin explotar ninguna mina.</p>
          <p>¡Buena suerte, estratega! 💣🚩</p>
        </div>
      </div>
    </div>
  );
};

export default Buscaminas;
