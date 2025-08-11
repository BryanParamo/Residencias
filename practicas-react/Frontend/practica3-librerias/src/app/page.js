'use client';

import ToastEjemplo from '../../components/ToastEjemplo';
import ModalEjemplo from '../../components/ModalEjemplo';
import CarruselEjemplo from '../../components/CarruselEjemplo';

export default function Home() {
  return (
    <div className="container py-4">
      <h1>Práctica #3 – Librerías</h1>
      <hr />

      <h2>Toast</h2>
      <ToastEjemplo />

      <h2 className="mt-4">Modal</h2>
      <ModalEjemplo />

      <h2 className="mt-4">Carrusel</h2>
      <CarruselEjemplo />
    </div>
  );
}
