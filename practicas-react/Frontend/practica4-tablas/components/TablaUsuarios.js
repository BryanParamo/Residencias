'use client';
import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import datos from '../src/app/data/datos.json';

export default function TablaUsuarios() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState('');

  const mostrarModal = (imagen) => {
    setImagenSeleccionada(imagen);
    setModalAbierto(true);
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <Table bordered striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Icono</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((usuario, index) => (
            <tr key={usuario.id}>
              <td>{index + 1}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td><FontAwesomeIcon icon={faUser} /></td>
              <td>
                <Button color="secondary" onClick={() => mostrarModal(usuario.imagen)}>
                  Ver Imagen
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalAbierto} toggle={() => setModalAbierto(false)}>
        <ModalHeader toggle={() => setModalAbierto(false)}>Imagen del Usuario</ModalHeader>
        <ModalBody>
          <img src={imagenSeleccionada} alt="Imagen usuario" style={{ width: '100%' }} />
        </ModalBody>
      </Modal>
    </div>
  );
}
