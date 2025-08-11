'use client';

import Contador from '../../components/Contador';
import ImagenCambiante from '../../components/ImagenCambiante';
import CambiarFondo from '../../components/CambiarFondo';

export default function Home() {
  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>Práctica #2 – useState</h1>
      <hr />

      <section style={{ marginBottom: '40px' }}>
        <h2>Contador</h2>
        <Contador />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Imagen que cambia</h2>
        <ImagenCambiante />
      </section>

      <section>
        <h2>Cambiar color de fondo</h2>
        <CambiarFondo />
      </section>
    </div>
  );
}


