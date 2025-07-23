// src/pages/HotelSignup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HotelSignup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, role: 'hotel' };
      const response = await axios.post('http://localhost:5000/api/auth/signup', payload);
      alert(response.data.msg || 'Signup successful');
      navigate('/hotel-login');
    } catch (err) {
      alert(`Signup failed: ${err.response?.data?.msg || err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Hotel Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Hotel Name"
          className="border p-2 w-full mb-3"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Signup
        </button>
      </form>
    </div>
  );
};

export default HotelSignup;
