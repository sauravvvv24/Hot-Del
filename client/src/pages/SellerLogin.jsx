// src/pages/SellerLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ Integrate with context

const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const { setAuth } = useAuth(); // ✅ Store seller info and token in context

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (res.data?.token && res.data?.user?.role === 'seller') {
        setAuth({ user: res.data.user, token: res.data.token }); // ✅ Store in AuthContext
        navigate('/seller-dashboard'); // or /dashboard/seller/products
      } else {
        setErrorMsg('Not a valid seller account');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setErrorMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Seller Login</h2>
        {errorMsg && (
          <p className="text-red-600 text-center mb-4">{errorMsg}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
