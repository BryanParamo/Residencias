'use client';
import { useState } from 'react';

export default function ImagenCambiante() {
  const [imagen, setImagen] = useState('/imagen1.png');

  const cambiarImagen = () => {
    setImagen(imagen === '/imagen1.png' ? '/imagen2.png' : '/imagen1.png');
  };

  return (
    <div>
      <img src={imagen} alt="Imagen dinámica" style={{ width: '200px', borderRadius: '8px' }} />
      <br />
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#1e7e34'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        onClick={cambiarImagen}
      >
        Cambiar imagen
      </button>
    </div>
  );
}
