'use client';

import Titulo from '../../components/Titulo';
import Parrafo from '../../components/Parrafo';
import Imagen from '../../components/Imagen';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#f0f8ff', padding: '60px' }}>
      <Titulo
        texto="WAOS THIS IS REAL BRO XD"
        color="#1e90ff"
        fuente="Georgia"
        tamaño="42px"
      />
      <Parrafo
        texto="Este sitio usa componentes reutilizables en React usando props."
        color="#333"
        fuente="Arial"
        tamaño="20px"
      />
      <Imagen
        src="/ah.jpeg"
        alt="Logo Vercel"
        ancho="200px"
      />
    </div>
  );
}
