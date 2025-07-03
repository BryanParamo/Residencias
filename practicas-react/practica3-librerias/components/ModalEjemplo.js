'use client';
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ModalEjemplo() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div>
      <Button color="warning" onClick={() => setAbierto(!abierto)}>
        Mostrar Modal
      </Button>
      <Modal isOpen={abierto} toggle={() => setAbierto(!abierto)}>
        <ModalHeader toggle={() => setAbierto(!abierto)}>Título del Modal</ModalHeader>
        <ModalBody>Este es un modal usando ReactStrap.</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setAbierto(false)}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
