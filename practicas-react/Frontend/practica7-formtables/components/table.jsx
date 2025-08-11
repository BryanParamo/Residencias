import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function Table({ data, onDelete, onEdit }) {
  return (
    <table className="table table-bordered mt-4">
      <thead className="table-light">
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Edad</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.surname}</td>
            <td>{item.email}</td>
            <td>{item.age}</td>
            <td>{item.role}</td>
            <td>
              <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(item, index)}>
                <FaEdit />
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(index)}>
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
