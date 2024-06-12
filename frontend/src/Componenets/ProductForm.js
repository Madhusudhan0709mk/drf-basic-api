import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductForm.css'; // Import custom CSS file

export const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store the selected product detail
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setError('Error fetching products. Please try again later.');
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${productId}/`);
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleView = async (productId) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`);
      setSelectedProduct(res.data); // Update selectedProduct state with the fetched product detail
    } catch (error) {
      console.error('error fetching product', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/products/${selectedProduct.id}/`, {
        name: updatedName,
        price: updatedPrice,
        description: updatedDescription
      });
      console.log('Product updated successfully');
      // You may want to fetch products again to update the list
      // For simplicity, I'm just resetting the selectedProduct state
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <>
      <div className="container">
        {error && <p className="alert alert-danger">{error}</p>}
        <div className="row">
          {/* Map over products array */}
          {products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Price: {product.price}</h6>
                  <p className="card-text">{product.description}</p>
                  <button className='btn btn-primary mr-2' type="button" onClick={() => handleView(product.id)}>View</button>
                  {/* Assuming you have a function handleDelete */}
                  <button className='btn btn-danger' type="button" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conditionally render selected product detail */}
      {selectedProduct && (
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{selectedProduct.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Price: {selectedProduct.price}</h6>
                <p className="card-text">{selectedProduct.description}</p>
                {/* Update form */}
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      value={updatedPrice}
                      onChange={(e) => setUpdatedPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <button className='btn btn-primary mr-2' type="button" onClick={handleUpdate}>Update</button>
                  <button className='btn btn-secondary' type="button" onClick={() => setSelectedProduct(null)}>Close</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
