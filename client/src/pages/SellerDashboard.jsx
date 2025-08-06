// src/pages/SellerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyProducts } from '../api/order';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const SellerDashboard = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getMyProducts(token);
        setProducts(res.data || []);
      } catch (err) {
        setError('Failed to load your products.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProducts();
  }, [token]);

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-800 mb-2">🛍 Seller Dashboard</h1>
            <p className="text-lg text-gray-700">Manage your products and view your orders here.</p>
          </div>
          <Link to="/seller/add-product" className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition">+ Add Product</Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mr-4"></div>
            <span className="text-gray-500">Loading your products...</span>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center py-8">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-gray-500 text-center py-12">You have not added any products yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product._id} className="relative group">
                <ProductCard product={product} />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => navigate(`/seller/edit-product/${product._id}`)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-xs font-semibold"
                  >Edit</button>
                  {/* Delete button can be added here */}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link to="/seller/orders" className="text-blue-700 hover:underline font-medium">View Orders on My Products</Link>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
