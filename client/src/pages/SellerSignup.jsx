import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerSignup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        ...form,
        role: 'seller',
      });
      alert('Signup successful');
      navigate('/seller-login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Seller Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" name="name" placeholder="Seller Name" className="border p-2 w-full mb-3"
          value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="border p-2 w-full mb-3"
          value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="border p-2 w-full mb-3"
          value={form.password} onChange={handleChange} required />
        <button type="submit" className="bg-blue-700 text-white px-4 py-2">Signup</button>
      </form>
    </div>
  );
};

export default SellerSignup;
