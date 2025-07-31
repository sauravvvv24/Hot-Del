// src/pages/AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    inStock: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/products', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Product added successfully!');
      setForm({ name: '', price: '', image: '', inStock: true });
    } catch (err) {
      alert('Failed to add product');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (INR)"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="inStock"
            checked={form.inStock}
            onChange={handleChange}
          />
          <span>In Stock</span>
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
