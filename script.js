// your_script.js

document.addEventListener('DOMContentLoaded', function () {
    fetchProducts();

    document.getElementById('addForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const newData = {
            name: formData.get('name'),
            price: formData.get('price'),
            description: formData.get('description')
        };
        addProduct(newData);
    });
});

function fetchProducts() {
    fetch("http://127.0.0.1:8000/api/products/")
        .then(res => res.json())
        .then(data => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';
            data.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <h3>${product.name}</h3>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <button class="btn btn-primary" onclick="updateProduct(${product.id})">Update</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                `;
                productList.appendChild(productItem);
            });
        });
}

function addProduct(data) {
    fetch("http://127.0.0.1:8000/api/products/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        fetchProducts();
        document.getElementById('addForm').reset();
    });
}

function updateProduct(id) {
    const newData = {
        name: 'Updated Name',
        price: 'Updated Price',
        description: 'Updated Description'
    };
    const url = `http://127.0.0.1:8000/api/products/${id}/`;
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    };

    console.log('Updating product:', id);
    console.log('Request URL:', url);
    console.log('Request Body:', requestOptions.body);

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Updated product:', data);
            fetchProducts(); // Refresh product list after update
        })
        .catch(error => {
            console.error('Error updating product:', error);
        });
}


function deleteProduct(id) {
    const url = `http://127.0.0.1:8000/api/products/${id}/`;
    const requestOptions = {
        method: 'DELETE'
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Product deleted successfully');
            fetchProducts(); // Refresh product list after delete
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
