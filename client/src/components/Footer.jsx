// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 mt-20 rounded-t-3xl shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Hot-Del</h3>
          <p className="text-gray-400 text-sm">
            Hot-Del is your trusted partner in sourcing fresh, cold-chain dairy & frozen products for hotels across India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
            <li><Link to="/hotel-signup" className="hover:text-white transition">Hotel Signup</Link></li>
            <li><Link to="/seller-signup" className="hover:text-white transition">Become a Seller</Link></li>
            <li><Link to="/orders" className="hover:text-white transition">Order Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-300 text-sm">
            📍 Mumbai, Maharashtra<br />
            📞 +91 98765 43210<br />
            📧 support@hotdel.com
          </p>
          <div className="flex gap-4 mt-4 text-2xl">
            <span className="hover:text-blue-400 cursor-pointer">📘</span>
            <span className="hover:text-pink-400 cursor-pointer">📸</span>
            <span className="hover:text-sky-400 cursor-pointer">🐦</span>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text-sm mt-12 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Hot-Del. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
