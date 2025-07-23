import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-white">Hot-Del</Link>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/hotel-login" className="hover:underline">Hotel Login</Link>
            <Link to="/seller-login" className="hover:underline">Seller Login</Link>
          </>
        )}

        {user?.role === 'hotel' && (
          <>
            <Link to="/products" className="hover:underline">Products</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
            <Link to="/orders" className="hover:underline">My Orders</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}

        {user?.role === 'seller' && (
          <>
            <Link to="/add-product" className="hover:underline">Add Product</Link>
            <Link to="/products" className="hover:underline">My Products</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}

        {user?.role === 'admin' && (
          <>
            <Link to="/admin" className="hover:underline">Admin Panel</Link>
            <Link to="/products" className="hover:underline">All Products</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
