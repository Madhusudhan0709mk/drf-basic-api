import React, { useState } from 'react';
import axios from 'axios';

const ProductCreate = () => {
  const [name, setName] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/products/', { name });
      alert('Product created successfully!');
      setName(''); // Clear input field
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter product name" required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ProductCreate;
