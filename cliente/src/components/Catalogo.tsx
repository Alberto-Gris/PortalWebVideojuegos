import { CSSProperties } from 'react';
import { FaGamepad } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import snake from '../assets/snake.png';
import tetrix from '../assets/tetrix.png'; 
import buscaminas from '../assets/buscaminas.png';
import fla from '../assets/flappy.png';

import { useBackground } from './BackgroundContext';

const Catalogo = () => {
  // Estilos principales
  //const containerStyle: CSSProperties = {
  //  background: 'linear-gradient(to bottom, #BFC0EA, #6365B5)',
  //  minHeight: '100vh',
  //  padding: '2rem',
  //  position: 'relative' 
  //};

  // Estilos del rectángulo decorativo
  const rectanguloStyle: CSSProperties = {
    width: '35px',
    height: '69px',
    backgroundColor: '#301E59',
    borderRadius: '10px',
    position: 'absolute',
    left: '57px',
    top: '163px'
  };

  // Estilos del título
  const titulojuegosStyle: CSSProperties = {
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: '600',
    position: 'absolute',
    left: '107px', // 57 + 35 + 15 (margen)
    top: '183px',  // 163 + 20
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
  };

   // Estilos del ícono del mando
   const iconoStyle: CSSProperties = {
    position: 'absolute',
    left: '350px',
    top: '166px',
    width: '64px',
    height: '64px',
    color: '#FFFFFF',
    filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))'
  };

   // Contenedor de imágenes
   const contenedorImagenesStyle: CSSProperties = {
    position: 'absolute',
    left: '75px',
    top: '253px',
    width: '1980px',
    height: '282px',
    backgroundColor: '#D9D9D9',
    borderRadius: '25px',
    display: 'flex',
    overflowX: 'auto', // Para scroll horizontal si hay muchas imágenes
    gap: '160px', // Aumenta el espacio entre elementos
    padding: '30px', // Más padding interno
    scrollPadding: '30px'// Para mejor experiencia en scroll
  };

  const imagenStyle: CSSProperties = {
    width: '300px',
    height: '200px',
    backgroundColor: '#FFFFFF',
    borderRadius: '15px',
    flexShrink: 0, // Evita que se reduzcan con el scroll
    top: '70px',
    right: '70px',
    objectFit: 'cover', // Para que las imágenes no se distorsionen
    margin: '0 20px', // Separación horizontal entre imágenes
  };

  const tituloTutoStyle: CSSProperties = {
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: '600',
    position: 'absolute',
    left: '107px', // 57 + 35 + 15 (margen)
    top: '617px',  // 163 + 20
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
  };

   // Estilos del rectángulo decorativo
   const rectanguloTutoStyle: CSSProperties = {
    width: '35px',
    height: '69px',
    backgroundColor: '#301E59',
    borderRadius: '10px',
    position: 'absolute',
    left: '57px',
    top: '606px'
  };

  const contenedorImagenesTutoStyle: CSSProperties = {
    position: 'absolute',
    left: '75px',
    top: '696px',
    width: '1980px',
    height: '282px',
    backgroundColor: '#D9D9D9',
    borderRadius: '25px',
    display: 'flex',
    overflowX: 'auto', // Para scroll horizontal si hay muchas imágenes
    gap: '160px', // Aumenta el espacio entre elementos
    padding: '30px', // Más padding interno
    scrollPadding: '30px'// Para mejor experiencia en scroll
  };
  // Nuevo estilo para el contenedor de imagen + texto
  const tutorialItemStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  };
  // Nuevo estilo para el texto "Jugar ahora"
  const jugarAhoraStyle: CSSProperties = {
    color: '#301E59',
    fontSize: '18px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  };
  // Estilo para el texto "Ver Tutorial"
  const verTutorialStyle: CSSProperties = {
    color: '#301E59',
    fontSize: '18px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  };

  const { fondoIndex, fondos } = useBackground();

  return (
    <div
      className="min-h-screen p-8 flex justify-center items-center transition-all duration-500"
      style={{
        backgroundImage: `url(${fondos[fondoIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
       {/* Sección de Juegos */}
       <div style={rectanguloStyle}></div>
      <h2 style={titulojuegosStyle}>Juegos disponibles</h2>
      <div style={iconoStyle}>
        <FaGamepad size={64} />
      </div>
      
      <div style={contenedorImagenesStyle}>
        {[snake, tetrix, buscaminas, fla].map((imagen, index) => (
          <div key={`juego-${index}`} style={tutorialItemStyle}>
            <img 
              src={imagen} 
              style={imagenStyle} 
              alt={`Juego ${index + 1}`}
            />
            <Link
              to={`/juego/${index + 1}`}
              style={jugarAhoraStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6365B5';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#301E59';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Jugar ahora
            </Link>
          </div>
        ))}
      </div>
      
      {/* Sección de Tutoriales */}
       <div style={rectanguloTutoStyle}></div>
      <h2 style={tituloTutoStyle}>Tutoriales</h2>
      <div style={contenedorImagenesTutoStyle}>
        {[snake, tetrix, buscaminas, fla].map((imagen, index) => (
          <div key={`tutorial-${index}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <img 
              src={imagen} 
              style={imagenStyle} 
              alt={`Tutorial ${index + 1}`}
            />
            <Link
              to={`/tutorial/${index + 1}`}
              style={verTutorialStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6365B5';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#301E59';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Ver Tutorial
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;