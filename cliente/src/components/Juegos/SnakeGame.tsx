// components/SnakeGame.tsx
import React, { useState, useEffect } from 'react';

const SnakeGame = () => {
    // Lógica del juego aquí
    return (
      <div style={gameContainerStyle}>
        <h2 style={titleStyle}>Snake</h2>
        <p>¡Hola! Este es el Juego de Snake.</p>
      </div>
    );
  };
  
  const gameContainerStyle: React.CSSProperties = {
    backgroundColor: '#000',
    padding: '20px',
    borderRadius: '10px',
    color: '#fff'
  };
  
  const titleStyle: React.CSSProperties = {
    color: '#4CAF50',
    textAlign: 'center'
  };
  
  export default SnakeGame;