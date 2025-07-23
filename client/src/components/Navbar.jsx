import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <div className="bg-blue-600 text-white font-bold text-lg px-2 py-1 rounded-md mr-2">HD</div>
            <span className="text-xl font-bold text-blue-700">Hot-Del</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/products" 
              className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
            >
              Products
            </Link>
            
            {!user && (
              <>
                <Link 
                  to="/hotel-signup" 
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Hotel Signup
                </Link>
                <Link 
                  to="/seller-signup" 
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
                >
                  Seller Signup
                </Link>
              </>
            )}

            {user && (
              <div className="flex items-center space-x-3 ml-4">
                <div className="relative group">
                  <button className="flex items-center focus:outline-none">
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8 mr-2" />
                    <span className="text-gray-700 font-medium">{user.name}</span>
                    <svg className="w-4 h-4 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    {user.role === 'hotel' && (
                      <>
                        <Link 
                          to="/cart" 
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Cart
                        </Link>
                        <Link 
                          to="/orders" 
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                      </>
                    )}
                    
                    {user.role === 'seller' && (
                      <>
                        <Link 
                          to="/add-product" 
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Add Product
                        </Link>
                        <Link 
                          to="/my-products" 
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Products
                        </Link>
                      </>
                    )}
                    
                    {user.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {!user && (
              <div className="flex space-x-2 mr-4">
                <Link 
                  to="/hotel-login" 
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg"
                >
                  Hotel
                </Link>
                <Link 
                  to="/seller-login" 
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg"
                >
                  Seller
                </Link>
              </div>
            )}
            
            <button 
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/products" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            
            {user && (
              <>
                {user.role === 'hotel' && (
                  <>
                    <Link 
                      to="/cart" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Cart
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                  </>
                )}
                
                {user.role === 'seller' && (
                  <>
                    <Link 
                      to="/add-product" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Add Product
                    </Link>
                    <Link 
                      to="/my-products" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Products
                    </Link>
                  </>
                )}
                
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                >
                  Logout
                </button>
              </>
            )}
            
            {!user && (
              <div className="pt-4 space-y-2">
                <Link 
                  to="/hotel-signup" 
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hotel Signup
                </Link>
                <Link 
                  to="/seller-signup" 
                  className="block w-full text-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Seller Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;