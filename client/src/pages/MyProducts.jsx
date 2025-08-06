// src/pages/MyProducts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to view your products');
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.get('http://localhost:3000/api/products/mine', config);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.error || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.delete(`http://localhost:3000/api/products/${productId}`, config);
      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">My Products</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">You haven't added any products yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <img 
                src={product.image || '/placeholder-product.jpg'} 
                alt={product.name} 
                className="h-48 w-full object-cover rounded mb-4"
                onError={(e) => {
                  e.target.src = '/placeholder-product.jpg';
                }}
              />
              <h3 className="text-xl font-bold mt-2 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-lg">₹{product.price?.toFixed(2) || '0.00'}</div>
                <div className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => alert('Edit functionality to be added')}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
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
