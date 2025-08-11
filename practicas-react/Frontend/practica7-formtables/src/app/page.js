'use client';

import React, { useState } from 'react';
import RegisterFormPage from '../../components/page';  
import Table from '../../components/table';
import EditModal from '../../components/editModal';

export default function Page() {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const addItem = (item) => setData([...data, item]);

  const deleteItem = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  const updateItem = (index, updatedItem) => {
    const updated = [...data];
    updated[index] = updatedItem;
    setData(updated);
  };

  return (
    <div className="container mt-4">
      <RegisterFormPage onAdd={addItem} />
      <hr />
      <h2 className="mb-3">Registros</h2>
      <Table 
        data={data} 
        onDelete={deleteItem} 
        onEdit={(item, index) => setEditingItem({ item, index })} 
      />
      <EditModal
        show={!!editingItem}
        item={editingItem?.item}
        index={editingItem?.index}
        onClose={() => setEditingItem(null)}
        onUpdate={updateItem}
      />
    </div>
  );
}
