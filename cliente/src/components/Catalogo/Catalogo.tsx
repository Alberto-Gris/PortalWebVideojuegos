import { FaGamepad } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import snake from '../../assets/snake.png';
import tetrix from '../../assets/tetrix.png';
import buscaminas from '../../assets/buscaminas.png';
import fla from '../../assets/flappy.png';
import othello from '../../assets/othello.png'
import styles from './Catalogo.module.css';

import { useBackground } from '../BackgroundContext';

const Catalogo = () => {
  const juegos = [snake, tetrix, buscaminas, fla, othello];
  const { fondoIndex, fondos } = useBackground();

  return (
    <div
      className="min-h-screen p-8 transition-all duration-500"
      style={{
        backgroundImage: `url(${fondos[fondoIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Sección de Juegos */}
      <div className={styles.seccionTitulo}>
        <div className={styles.rectangulo}></div>
        <h2 className={styles.titulo}>Juegos disponibles</h2>
        <div className={styles.icono}>
          <FaGamepad size={32} />
        </div>
      </div>

      <div className={`${styles.contenedorImagenes} ${styles.juegos}`}>
        {juegos.map((imagen, index) => (
          <div key={`juego-${index}`} className={styles.item}>
            <Link to={`/juego/${index + 1}`} className={styles.link}>
              <img src={imagen} className={styles.imagen} alt={`Juego ${index + 1}`} />
              <span>Jugar ahora</span>
            </Link>
          </div>
        ))}
      </div>

      {/* Sección de Tutoriales */}
      <div className={styles.seccionTitulo}>
        <div className={`${styles.rectangulo} ${styles.tutorial}`}></div>
        <h2 className={`${styles.titulo} ${styles.tutorial}`}>Tutoriales</h2>
      </div>

      <div className={`${styles.contenedorImagenes} ${styles.tutorial}`}>
        {juegos.map((imagen, index) => (
          <div key={`tutorial-${index}`} className={styles.item}>
            <Link to={`/tutorial/${index + 1}`} className={styles.link}>
            <img src={imagen} className={styles.imagen} alt={`Tutorial ${index + 1}`} />
              Ver Tutorial
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Catalogo;
