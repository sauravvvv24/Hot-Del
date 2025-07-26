import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import HotelSignup from './pages/HotelSignup';
import HotelLogin from './pages/HotelLogin';
import SellerSignup from './pages/SellerSignup';
import SellerLogin from './pages/SellerLogin';
import Orders from './pages/Orders';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import SellerDashboard from './pages/SellerDashboard';
import AdminPanel from './pages/AdminPanel';

import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="/edit-product/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
          <Route path="/seller-dashboard" element={<PrivateRoute><SellerDashboard /></PrivateRoute>} />
          <Route path="/admin-panel" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          <Route path="/hotel-signup" element={<HotelSignup />} />
          <Route path="/hotel-login" element={<HotelLogin />} />
          <Route path="/seller-signup" element={<SellerSignup />} />
          <Route path="/seller-login" element={<SellerLogin />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
