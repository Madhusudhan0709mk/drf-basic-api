import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productup = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product data from the API
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}/`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleUpdate = async () => {
    try {
      // Make a PUT request to update the product
      await axios.put(`http://127.0.0.1:8000/api/products/${productId}/`, product);
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // Make a DELETE request to delete the product
      await axios.delete(`http://127.0.0.1:8000/api/products/${productId}/`);
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Productup;
