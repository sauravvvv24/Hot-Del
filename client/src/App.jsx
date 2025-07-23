// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';

import HotelLogin from './pages/HotelLogin';
import HotelSignup from './pages/HotelSignup';

import SellerLogin from './pages/SellerLogin';
import SellerSignup from './pages/SellerSignup';
import SellerDashboard from './pages/SellerDashboard';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        {/* Hotel Auth */}
        <Route path="/hotel-login" element={<HotelLogin />} />
        <Route path="/hotel-signup" element={<HotelSignup />} />

        {/* Seller Auth */}
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route path="/seller-signup" element={<SellerSignup />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
      </Routes>
    </>
  );
};

export default App;
