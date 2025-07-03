'use client';
import { useState } from 'react';
import { Button, Toast, ToastBody } from 'reactstrap';

export default function ToastEjemplo() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button color="primary" onClick={() => setVisible(!visible)}>
        Mostrar Toast
      </Button>
      <Toast isOpen={visible}>
        <ToastBody style={{ backgroundColor: '#007bff', color: 'white' }}>
          Este es un Toast azul usando ReactStrap.
        </ToastBody>
      </Toast>
    </div>
  );
}
