import React, { useState } from 'react';

export default function Form({ onAdd }) {
  const [formData, setFormData] = useState({ nombre: '', correo: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ nombre: '', correo: '' }); // Limpiar campos
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input type="email" name="correo" className="form-control" value={formData.correo} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
}
