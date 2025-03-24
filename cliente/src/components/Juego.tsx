import { useParams } from 'react-router-dom';

// Importa tus componentes de juego
import SnakeGame from './Juegos/SnakeGame';
import Tetris from './Juegos/Tetris';
import Flappybird from './Juegos/Flappybird';
import Buscaminas from './Juegos/Buscaminas';
import Othello from './Juegos/Othello';

const Juego = () => {
  const { id } = useParams<{ id: string }>();

  // Función para seleccionar el juego basado en el ID
  const renderGame = () => {
    switch (id) {
      case '1':
        return <SnakeGame />;
      case '2':
        return <Tetris />;
      case '3':
        return <Buscaminas />;
      case '4':
        return <Flappybird />;
      case '5':
        return <Othello />;
      default:
        return <div>Juego no encontrado</div>;
    }
  };

  return (
    <div style={containerStyle}>
      {renderGame()}
    </div>
  );
};

// Estilos del contenedor
const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(to bottom, #6365B5, #D9D9D9)',
  padding: '2rem'
};

export default Juego;