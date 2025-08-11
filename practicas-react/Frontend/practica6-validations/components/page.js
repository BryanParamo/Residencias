'use client';

import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

export default function RegisterFormPage() {
  const today = new Date().toISOString().split('T')[0];

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

  const [touched, setTouched] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const validate = {
    name: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
    surname: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^.{6,}$/,
    age: /^(100|[1-9]?[0-9])$/,
    registerDate: (value) => value >= today,
    gender: (value) => ['male', 'female', ''].includes(value),
    role: (value) => ['Admin', 'User', 'Guest', ''].includes(value),
  };

  const getFeedback = (field) => {
    switch (field) {
      case 'name':
      case 'surname':
        return 'Este campo solo acepta letras';
      case 'email':
        return 'Introduce un correo electrónico válido';
      case 'password':
        return 'La contraseña debe tener al menos 6 caracteres';
      case 'age':
        return 'Solo se permiten números entre 1 y 100';
      case 'registerDate':
        return 'La fecha debe ser igual o posterior a hoy';
      case 'gender':
        return 'Selecciona un género válido';
      case 'role':
        return 'Selecciona un rol válido';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const isValid = (field) => {
    if (!touched[field]) return undefined;
    const value = formData[field];
    if (field === 'registerDate') return validate.registerDate(value);
    if (field === 'gender') return validate.gender(value);
    if (field === 'role') return validate.role(value);
    if (field === 'options' || field === 'notes') return true;
    if (field === 'password') return validate.password.test(value);
    return validate[field]?.test(value);
  };

  const handleReset = () => {
    setFormData({
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
    setTouched({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'surname', 'email', 'password', 'age', 'gender', 'role', 'registerDate'];
    const allValid = requiredFields.every((field) => isValid(field) === true);

    if (!allValid) {
      alert('Por favor corrige los errores antes de enviar');
      return;
    }

    alert('Formulario enviado exitosamente');

    // para limpiar el formulario luego de enviarlo pe causa
    handleReset();
  };

  return (
    <div className="p-4">
      <h2>Registration Form</h2>
      <Form onSubmit={handleSubmit}>
        {/* Nombre */}
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            valid={isValid('name') === true}
            invalid={isValid('name') === false}
          />
          <FormFeedback>{getFeedback('name')}</FormFeedback>
        </FormGroup>

        {/* Apellido */}
        <FormGroup>
          <Label for="surname">Lastname</Label>
          <Input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            valid={isValid('surname') === true}
            invalid={isValid('surname') === false}
          />
          <FormFeedback>{getFeedback('surname')}</FormFeedback>
        </FormGroup>

        {/* Email */}
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            valid={isValid('email') === true}
            invalid={isValid('email') === false}
          />
          <FormFeedback>{getFeedback('email')}</FormFeedback>
        </FormGroup>

        {/* Password */}
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            valid={isValid('password') === true}
            invalid={isValid('password') === false}
          />
          <FormFeedback>{getFeedback('password')}</FormFeedback>
        </FormGroup>

        {/* Edad */}
        <FormGroup>
          <Label for="age">Age</Label>
          <Input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            valid={isValid('age') === true}
            invalid={isValid('age') === false}
          />
          <FormFeedback>{getFeedback('age')}</FormFeedback>
        </FormGroup>

        {/* Género */}
        <FormGroup tag="fieldset">
          <Label>Gender</Label>
          <FormGroup check>
            <Input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
              checked={formData.gender === 'male'}
              invalid={isValid('gender') === false}
            />
            <Label check>Male</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
              checked={formData.gender === 'female'}
              invalid={isValid('gender') === false}
            />
            <Label check>Female</Label>
          </FormGroup>
          {isValid('gender') === false && (
            <div className="text-danger">{getFeedback('gender')}</div>
          )}
        </FormGroup>

        {/* Rol */}
        <FormGroup>
          <Label for="role">Role</Label>
          <Input
            type="select"
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            valid={isValid('role') === true}
            invalid={isValid('role') === false}
          >
            <option value="">Select...</option>
            <option>Admin</option>
            <option>User</option>
            <option>Guest</option>
          </Input>
          <FormFeedback>{getFeedback('role')}</FormFeedback>
        </FormGroup>

        {/* Opciones checkbox */}
        <FormGroup check>
          <Input
            type="checkbox"
            name="options"
            id="options"
            checked={formData.options}
            onChange={handleChange}
          />
          <Label check htmlFor="options">Receive notifications</Label>
        </FormGroup>

        {/* Notas */}
        <FormGroup>
          <Label for="notes">Notes</Label>
          <Input
            type="textarea"
            name="notes"
            id="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </FormGroup>

        {/* Fecha de registro */}
        <FormGroup>
          <Label for="registerDate">Register Date</Label>
          <Input
            type="date"
            name="registerDate"
            id="registerDate"
            min={today}
            value={formData.registerDate}
            onChange={handleChange}
            valid={isValid('registerDate') === true}
            invalid={isValid('registerDate') === false}
          />
          <FormFeedback>{getFeedback('registerDate')}</FormFeedback>
        </FormGroup>

        <div className="d-flex gap-2">
          <Button color="primary" type="submit">
            Enviar
          </Button>
          <Button color="secondary" type="button" onClick={handleReset}>
            Reiniciar
          </Button>
          <Button color="info" type="button" onClick={() => setModalOpen(true)}>
            Mostrar
          </Button>
        </div>
      </Form>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(false)}>Información del formulario</ModalHeader>
        <ModalBody>
          <ul>
            {Object.entries(formData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>{' '}
                {key === 'password' ? '******' : typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value || '(vacío)'}
              </li>
            ))}
          </ul>
        </ModalBody>
      </Modal>
    </div>
  );
}
