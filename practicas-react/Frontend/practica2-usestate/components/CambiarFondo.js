'use client';
import { useState } from 'react';

export default function CambiarFondo() {
  const [colorFondo, setColorFondo] = useState('#ffffff');

  const cambiarColor = () => {
    const colores = ['#f8c291', '#82ccdd', '#b8e994', '#f6e58d'];
    const aleatorio = colores[Math.floor(Math.random() * colores.length)];
    setColorFondo(aleatorio);
  };

  return (
    <div style={{ backgroundColor: colorFondo, padding: '20px', marginTop: '10px' }}>
      <p style={{ color: 'black' }}>
            Haz clic para cambiar el color de fondo
      </p>

      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#e74c3c'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
        onClick={cambiarColor}
      >
        Cambiar Fondo
      </button>
    </div>
  );
}
