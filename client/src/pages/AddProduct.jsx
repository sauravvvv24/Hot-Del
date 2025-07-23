import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ⛔ Access check
  if (!user || (user.role !== 'seller' && user.role !== 'admin')) {
    return <Navigate to="/" />;
  }

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/products', {
        ...form,
        seller: user._id, // backend should accept and save this
      });
      alert('Product added!');
      navigate('/products');
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
