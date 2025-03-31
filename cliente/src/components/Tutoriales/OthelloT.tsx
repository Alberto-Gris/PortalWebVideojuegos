// components/OthelloT.tsx
import React from 'react';
import othello from '../../assets/othello.mp4'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';

const OthelloT = () => {
    return (
      <div style={gameContainerStyle}>
        <div style={buttonContainerStyle}>
        <Link to="/catalogo" style={buttonStyle}>
          Ir al Catálogo
        </Link>
      </div>
        <h2 style={titleStyle}>Tutorial del juego Othello</h2>
        <div style={videoContainerStyle}>
          <video 
            style={videoStyle}
            controls
            src={othello} // Reemplaza con la ruta de tu video
            title="Tutorial del juego Othello"
          >
            Tu navegador no soporta videos HTML5.
          </video>
        </div>
        <p style={tutorialTextStyle}>
          ¡Bienvenido al tutorial de Othello! En este video te mostraremos cómo jugar a este clásico juego de estrategia.
        </p>
      </div>
    );
};

const gameContainerStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  padding: '2rem',
  borderRadius: '15px',
  color: '#fff',
  maxWidth: '800px',
  margin: '2rem auto',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  position: 'relative',
  paddingTop: '4rem' // Aumentamos espacio superior
};

const titleStyle: React.CSSProperties = {
  color: '#4CAF50',
  textAlign: 'center',
  fontSize: '2.5rem',
  marginBottom: '1rem',
  textTransform: 'uppercase',
  letterSpacing: '2px',
   marginTop: '3rem'
};

const buttonContainerStyle: React.CSSProperties = {
  position: 'absolute', // Cambiado a posición absoluta
  top: '10px', // Reducimos distancia del borde superior
  left: '10px', // Reducimos distancia del borde izquierdo
  zIndex: 1
};

const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '0.75rem 1.5rem',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#4CAF50', // Cambiado a verde
  border: 'none',
  borderRadius: '8px',
  textDecoration: 'none',
  textAlign: 'center',
  cursor: 'pointer',
  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease', // Efecto hover opcional
  transform: 'translateX(-5px)' // Ajuste fino de posición
};


const videoContainerStyle: React.CSSProperties = {
  position: 'relative',
  paddingBottom: '56.25%', // Relación 16:9
  height: 0,
  overflow: 'hidden',
  borderRadius: '8px',
  marginBottom: '1.5rem'
};

const videoStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const tutorialTextStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  lineHeight: '1.6',
  textAlign: 'center',
  color: '#ddd',
  marginTop: '1.5rem',
  padding: '0 1rem'
};

export default OthelloT;
