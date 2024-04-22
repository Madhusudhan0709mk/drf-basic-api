import React,{useEffect, useState} from 'react';
import axios from 'axios';
export const ProductForm = () => {
  // const [name,setName] = useState('');
  // const [price,setPrice] = useState(0);
  // const [description,setDescription] = useState('');
  // fetch('http://127.0.0.1:8000/api/products/')
  // .then((res)=>res.json())
  // .then((data)=>{
  //   console.log(data)
  // })
const [value,setValue] = useState([]);
useEffect(()=>{
  axios.get('http://127.0.0.1:8000/api/products/').then((res)=>{
  
  setValue(res.data)
  })
  .catch(error => console.error('Error fetching products:', error));
},[]);
  
  return (
    <>

    <h1>{value.map(val=>(<li>{ val.name}</li>))}</h1>
{/*     
    <form onSubmit={handleSubmit}>
        <input type='text' value={name} onChange={(e)=>setName(e.target.value)} />
        <input type='text' value={price} onChange={(e)=>setPrice()} />
    </form> */}
    </>
  )
}
