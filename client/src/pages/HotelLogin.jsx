// src/pages/HotelLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HotelLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ custom hook from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/hotel-login', {
        email,
        password,
      });

      const { token, user } = res.data;
      login(user, token); // ✅ Store in context + localStorage

      navigate('/products'); // or '/hotel-dashboard' if that's implemented
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Hotel Login</h2>
        {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>}

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="mb-4 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="mb-6 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/hotel-signup" className="text-blue-600 hover:underline">
            Signup here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default HotelLogin;
