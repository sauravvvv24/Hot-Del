// src/pages/AddProduct.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PRODUCT_CATEGORIES } from '../constants/categories.js';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AddProduct = ({ editMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    stock: '',
    unit: '',
    brand: '',
    featured: false
  });
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (editMode && id) {
      setLoading(true);
      axios.get(`http://localhost:3000/api/products/${id}`)
        .then(res => {
          setForm({
            ...res.data,
            price: res.data.price || '',
            stock: res.data.stock || '',
            featured: res.data.featured || false,
          });
        })
        .catch(() => toast.error('Failed to load product.'))
        .finally(() => setLoading(false));
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to continue');
        return;
      }
      const productData = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0
      };
      if (editMode && id) {
        await axios.put(`http://localhost:3000/api/products/${id}`, productData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Product updated successfully!');
      } else {
        await axios.post('http://localhost:3000/api/products', productData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Product added successfully!');
        setForm({ name: '', price: '', description: '', category: '', image: '', stock: '', unit: '', brand: '', featured: false });
      }
      setTimeout(() => navigate('/dashboard/seller'), 1200);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setDeleting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product deleted!');
      setTimeout(() => navigate('/dashboard/seller'), 1000);
    } catch (err) {
      toast.error('Failed to delete product');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{editMode ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
          <input type="text" name="name" placeholder="Enter product name" value={form.name} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
            <option value="">Select a category</option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
            <input type="number" name="price" placeholder="0.00" value={form.price} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" min="0" step="0.01" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input type="number" name="stock" placeholder="0" value={form.stock} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" min="0" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit (e.g., 1kg, 500g, 1 piece)</label>
            <input type="text" name="unit" placeholder="1kg" value={form.unit} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input type="text" name="brand" placeholder="Brand name" value={form.brand} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" placeholder="Enter product description" value={form.description} onChange={handleChange} rows="3" className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input type="url" name="image" placeholder="https://example.com/image.jpg" value={form.image} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <label className="text-sm font-medium text-gray-700">Mark as Featured Product</label>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium">
          {loading ? (editMode ? 'Updating...' : 'Adding...') : (editMode ? 'Update Product' : 'Add Product')}
        </button>
        {editMode && (
          <button type="button" onClick={handleDelete} disabled={deleting} className="w-full mt-2 bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium">
            {deleting ? 'Deleting...' : 'Delete Product'}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
