import React, { useEffect, useState } from 'react';
import { Modal, Button, Form as BsForm } from 'react-bootstrap';

export default function EditModal({ show, item, index, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    role: '',
    options: false,
    notes: '',
    registerDate: '',
  });

  useEffect(() => {
    if (item) setFormData(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    onUpdate(index, formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BsForm>
          <BsForm.Group className="mb-3">
            <BsForm.Label>Nombre</BsForm.Label>
            <BsForm.Control type="text" name="name" value={formData.name} onChange={handleChange} />
          </BsForm.Group>

          <BsForm.Group className="mb-3">
            <BsForm.Label>Apellido</BsForm.Label>
            <BsForm.Control type="text" name="surname" value={formData.surname} onChange={handleChange} />
          </BsForm.Group>

          <BsForm.Group className="mb-3">
            <BsForm.Label>Email</BsForm.Label>
            <BsForm.Control type="email" name="email" value={formData.email} onChange={handleChange} />
          </BsForm.Group>

          <BsForm.Group className="mb-3">
            <BsForm.Label>Contraseña</BsForm.Label>
            <BsForm.Control type="password" name="password" value={formData.password} onChange={handleChange} />
          </BsForm.Group>

          <BsForm.Group className="mb-3">
            <BsForm.Label>Edad</BsForm.Label>
            <BsForm.Control type="number" name="age" value={formData.age} onChange={handleChange} />
          </BsForm.Group>

          <BsForm.Group className="mb-3">
            <BsForm.Label>Género</BsForm.Label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="form-select">
              <option value="">Selecciona...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </BsForm.Group>

          <BsForm.Group className="mb-3">
            <BsForm.Label>Rol</BsForm.Label>
            <select name="role" value={formData.role} onChange={handleChange} className="form-select">
              <option value="">Selecciona...</option>
              <option>Admin</option>
              <option>User</option>
              <option>Guest</option>
            </select>
          </BsForm.Group>

          <BsForm.Group className="mb-3">
            <BsForm.Check
              type="checkbox"
              name="options"
              label="Receive notifications"
              checked={formData.options}
              onChange={handleChange}
            />
          </BsForm.Group>

          <BsForm.Group className="mb-3">
            <BsForm.Label>Notas</BsForm.Label>
            <BsForm.Control
              as="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </BsForm.Group>

          <BsForm.Group className="mb-3">
            <BsForm.Label>Fecha de Registro</BsForm.Label>
            <BsForm.Control
              type="date"
              name="registerDate"
              value={formData.registerDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </BsForm.Group>
        </BsForm>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
      </Modal.Footer>
    </Modal>
  );
}
