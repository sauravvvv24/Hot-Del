import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import HotelSignup from './pages/HotelSignup';
import SellerSignup from './pages/SellerSignup';
import SellerLogin from './pages/SellerLogin';
import HotelLogin from './pages/HotelLogin';
import AddProduct from './pages/AddProduct';
import MyProducts from './pages/MyProducts';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminPanel from './pages/AdminPanel';
import Signup from './pages/Signup'; // ✅ Unified Signup
import Login from './pages/Login';   // ✅ Unified Login (optional)

const App = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-4">
        <Routes>
          {/* Home and Products */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:productId" element={<ProductDetail />} />

          {/* Unified Auth (optional, remove if not using these) */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Separate Auth Routes */}
          <Route path="/hotel-signup" element={<HotelSignup />} />
          <Route path="/seller-signup" element={<SellerSignup />} />
          <Route path="/hotel-login" element={<HotelLogin />} />
          <Route path="/seller-login" element={<SellerLogin />} />

          {/* Seller-Specific */}
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/my-products" element={<MyProducts />} />

          {/* Hotel-Specific */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<AdminPanel />} />

          {/* Redirects for typos */}
          <Route path="/hotelsignup" element={<Navigate to="/hotel-signup" />} />
          <Route path="/hotellogin" element={<Navigate to="/hotel-login" />} />
          <Route path="/sellersignup" element={<Navigate to="/seller-signup" />} />
          <Route path="/sellerlogin" element={<Navigate to="/seller-login" />} />

          {/* Catch-all */}
          <Route path="*" element={<div className="text-center mt-10 text-xl">404 - Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
