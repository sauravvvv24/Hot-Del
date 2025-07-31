import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
            <img
              src="https://chatgpt.com/backend-api/public_content/enc/eyJpZCI6Im1fNjg4NGQzOTI4OWE0ODE5MTgyNjQ1NmUwZmRiNmMxOTI6ZmlsZV8wMDAwMDAwMDNkZTQ2MWY4YjllZDVhY2U4MzAyOGE5MSIsInRzIjoiNDg3MTkyIiwicCI6InB5aSIsInNpZyI6ImUwZDhmZDEzM2FmZTUxYmM0OWZlZGY0ZWE2ZjgwYjQxYTE4YmIzOTFkODVkNmRjMzQyNjU1ZmU0ZDA1ZjM4NmIiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsfQ=="
              alt="Logo"
              className="w-14 h-14 mr-2"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
              Hot-Del
            </span>
          </Link>

          {/* ---------- Desktop Navigation ---------- */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/products" className="hover:text-blue-600 font-medium">Products</Link>

            {/* Cart link visible only for hotel users */}
            {user?.role === 'hotel' && (
              <Link to="/cart" className="flex items-center hover:text-blue-600">
                <ShoppingCart className="w-5 h-5 mr-1" />
                Cart
                {cartItems.length > 0 && (
                  <span className="ml-1 text-sm text-red-600 font-semibold">
                    ({cartItems.length})
                  </span>
                )}
              </Link>
            )}

            {/* Auth buttons / profile dropdown */}
            {!user ? (
              <>
                <Link to="/hotel-signup" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Hotel Signup
                </Link>
                <Link to="/seller-signup" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Seller Signup
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-gray-300 border" />
                  <span className="ml-2 text-gray-800">{user.name}</span>
                  <span className="ml-1 text-xs text-gray-500">({user.role})</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 bg-white shadow rounded-lg hidden group-hover:block w-48 z-50">
                  {user.role === 'hotel' && (
                    <Link to="/orders" className="block px-4 py-2 hover:bg-blue-50">My Orders</Link>
                  )}
                  {user.role === 'seller' && (
                    <>
                      <Link to="/add-product" className="block px-4 py-2 hover:bg-blue-50">Add Product</Link>
                      <Link to="/my-products" className="block px-4 py-2 hover:bg-blue-50">My Products</Link>
                    </>
                  )}
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 hover:bg-blue-50">Admin Panel</Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ---------- Mobile Toggle ---------- */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ---------- Mobile Menu ---------- */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t">
          <Link
            to="/products"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700"
          >
            Products
          </Link>

          {/* Cart link visible only for hotel users */}
          {user?.role === 'hotel' && (
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center text-gray-700"
            >
              <ShoppingCart className="w-5 h-5 mr-1" />
              Cart
              {cartItems.length > 0 && (
                <span className="ml-1 text-sm text-red-600 font-semibold">
                  ({cartItems.length})
                </span>
              )}
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/hotel-signup"
                onClick={() => setIsMenuOpen(false)}
                className="block text-blue-600 font-medium"
              >
                Hotel Signup
              </Link>
              <Link
                to="/seller-signup"
                onClick={() => setIsMenuOpen(false)}
                className="block text-green-600 font-medium"
              >
                Seller Signup
              </Link>
            </>
          ) : (
            <>
              {user.role === 'hotel' && (
                <Link
                  to="/orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="block"
                >
                  My Orders
                </Link>
              )}
              {user.role === 'seller' && (
                <>
                  <Link
                    to="/add-product"
                    onClick={() => setIsMenuOpen(false)}
                    className="block"
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/my-products"
                    onClick={() => setIsMenuOpen(false)}
                    className="block"
                  >
                    My Products
                  </Link>
                </>
              )}
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block text-left w-full"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
