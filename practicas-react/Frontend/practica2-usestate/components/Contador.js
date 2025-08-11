'use client';
import { useState } from 'react';

export default function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Contador: {contador}</p>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#1e90ff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#1e90ff'}
        onClick={() => setContador(contador + 1)}
      >
        Aumentar
      </button>
    </div>
  );
}
