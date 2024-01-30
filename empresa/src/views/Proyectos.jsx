import React, { useState } from 'react';
import Header from "../components/header";



function CrudTable () {
    const [data, setData] = useState([
        { id: 1, name: 'Item 1', description: 'Description 1', quantity: 5, price: 10 },
        { id: 2, name: 'Item 2', description: 'Description 2', quantity: 3, price: 15 },
        { id: 3, name: 'Item 3', description: 'Description 3', quantity: 8, price: 20 },
      ]);
    
      const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        quantity: 0,
        price: 0,
      });
    
      const [editItemId, setEditItemId] = useState(null);
    
      const handleAddItem = () => {
        if (editItemId !== null) {
          // Editar el elemento existente
          const updatedData = data.map((item) =>
            item.id === editItemId ? { ...newItem, id: editItemId } : item
          );
          setData(updatedData);
          setEditItemId(null);
        } else {
          // Agregar un nuevo elemento
          setData([...data, { ...newItem, id: data.length + 1 }]);
        }
        setNewItem({ name: '', description: '', quantity: 0, price: 0 });
      };
    
      const handleEditItem = (id) => {
        const itemToEdit = data.find((item) => item.id === id);
        if (itemToEdit) {
          setNewItem(itemToEdit);
          setEditItemId(id);
        }
      };
    
      const handleDeleteItem = (id) => {
        setData(data.filter((item) => item.id !== id));
      };


    
    return(
    <>
    <Header></Header>
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', margin: 0 }}>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ color: '#007bff' }}>CRUD Table</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#007bff', color: 'white' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#007bff', color: 'white' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#007bff', color: 'white' }}>Description</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#007bff', color: 'white' }}>Quantity</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#007bff', color: 'white' }}>Price</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#007bff', color: 'white' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.description}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.quantity}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.price}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  <button onClick={() => handleEditItem(item.id)} style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>Edit</button>
                  <button onClick={() => handleDeleteItem(item.id)} style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '20px' }}>
          <h2 style={{ color: '#007bff' }}>{editItemId !== null ? 'Edit Item' : 'Add New Item'}</h2>
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            style={{ marginRight: '8px' }}
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            style={{ marginRight: '8px' }}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
            style={{ marginRight: '8px' }}
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
            style={{ marginRight: '8px' }}
          />
          <button onClick={handleAddItem} style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{editItemId !== null ? 'Save' : 'Add'}</button>
        </div>
      </div>
    </div>
    </>
 
	);
};

export default CrudTable;