import React from 'react'
import { useState } from 'react';
import axios from 'axios';
export const AddProduct = () => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        const newProduct = {name,price,description};

        axios.post('http://127.0.0.1:8000/api/products/',newProduct)
        .then(res=>{
            console.log('Product added successfully:',res.data);
            setName('');
            setPrice('');
            setDescription('');
        })
        .catch(error =>{
            console.log('Error adding profuct:',error);
        });
    }
  return (
    <>
    
     <h1>Add Product</h1>
    <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e)=>setName(e.target.value)} value={name} name="name" autoComplete="name" />

        <input type='text' onChange={(e)=>setPrice(e.target.value)} value={price} name="price" autoComplete="price"  />

        <textarea value={description} onChange={e => setDescription(e.target.value)} name="description" autoComplete="description"  />

        <button type="submit">Add</button>
    </form>
    </>
  )
}
export default AddProduct;