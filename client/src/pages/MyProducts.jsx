// src/pages/MyProducts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get('/api/products/mine'); // Make sure this route exists and returns only seller's products
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">My Products</h2>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow">
              <img src={product.image} alt={product.name} className="h-48 w-full object-cover rounded" />
              <h3 className="text-xl font-bold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.description}</p>
              <div className="mt-2 font-semibold">₹{product.price}</div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  onClick={() => alert('Edit functionality to be added')}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
