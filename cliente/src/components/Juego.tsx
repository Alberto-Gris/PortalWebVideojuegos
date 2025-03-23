// Componente Juego.tsx
import { useParams } from 'react-router-dom';

// Importa tus componentes de juego
import SnakeGame from '../components/Juegos/SnakeGame';
const Juego = () => {
  const { id } = useParams<{ id: string }>();

  // Función para seleccionar el juego basado en el ID
  const renderGame = () => {
    switch(id) {
      case '1':
        return <SnakeGame />;
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
  backgroundColor: '#1a1a1a',
  padding: '2rem'
};

export default Juego;