// Componente Juego.tsx
import { useParams } from 'react-router-dom';

// Importa tus componentes de tutorial
import SnakeT from '../components/Tutoriales/SnakeT';
import TetrixT from './Tutoriales/TetrixT';
import BuscaminasT from './Tutoriales/BuscaminasT';
import FlappyT from './Tutoriales/FlappyT';
import OthelloT from './Tutoriales/OthelloT';

const Tutorial = () => {
  const { id } = useParams<{ id: string }>();

  // Función para seleccionar el juego basado en el ID
  const renderTuto = () => {
    switch(id) {
      case '1':
        return <SnakeT />;
      case '2':
        return <TetrixT />;
      case '3':
        return <BuscaminasT />;
      case '4':
        return <FlappyT />;
      case '5':
        return <OthelloT />;
      default:
        return <div>Tutorial no encontrado</div>;
    }
  };

  return (
    <div style={containerStyle} data-testid='tutorial'>
      {renderTuto()}
    </div>
  );
};

// Estilos del contenedor
const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#1a1a1a',
  padding: '2rem'
};

export default Tutorial;