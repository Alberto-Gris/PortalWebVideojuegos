// Componente Juego.tsx
import { useParams } from 'react-router-dom';

// Importa tus componentes de tutorial
import SnakeT from '../components/Tutoriales/SnakeT';

const Tutorial = () => {
  const { id } = useParams<{ id: string }>();

  // Función para seleccionar el juego basado en el ID
  const renderTuto = () => {
    switch(id) {
      case '1':
        return <SnakeT />;
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