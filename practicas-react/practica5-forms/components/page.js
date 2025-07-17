'use client';

import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody,
} from 'reactstrap';

export default function RegisterFormPage() {
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

  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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
  };

  return (
    <div className="p-4">
      <h2>Registration Form</h2>
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="surname">Surname</Label>
          <Input type="text" name="surname" value={formData.surname} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="age">Age</Label>
          <Input type="number" name="age" value={formData.age} onChange={handleChange} />
        </FormGroup>
        <FormGroup tag="fieldset">
          <Label>Gender</Label>
          <FormGroup check>
            <Input type="radio" name="gender" value="male" onChange={handleChange} checked={formData.gender === 'male'} />
            <Label check>Male</Label>
          </FormGroup>
          <FormGroup check>
            <Input type="radio" name="gender" value="female" onChange={handleChange} checked={formData.gender === 'female'} />
            <Label check>Female</Label>
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <Label for="role">Role</Label>
          <Input type="select" name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select...</option>
            <option>Admin</option>
            <option>User</option>
            <option>Guest</option>
          </Input>
        </FormGroup>
        <FormGroup check>
          <Input type="checkbox" name="options" checked={formData.options} onChange={handleChange} />
          <Label check>Receive notifications</Label>
        </FormGroup>
        <FormGroup>
          <Label for="notes">Notes</Label>
          <Input type="textarea" name="notes" value={formData.notes} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="registerDate">Register Date</Label>
          <Input type="date" name="registerDate" value={formData.registerDate} onChange={handleChange} />
        </FormGroup>
        <div className="d-flex gap-2">
          <Button color="primary" onClick={() => setModalOpen(true)}>Show</Button>
          <Button color="secondary" onClick={handleReset}>Reset</Button>
        </div>
      </Form>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(false)}>Submitted Information</ModalHeader>
        <ModalBody>
          <ul>
            {Object.entries(formData).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value.toString()}</li>
            ))}
          </ul>
        </ModalBody>
      </Modal>
    </div>
  );
}
