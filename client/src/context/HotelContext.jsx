// src/context/HotelContext.js
import React, { createContext, useState, useEffect } from 'react';

export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      if (prevCart.find((item) => item._id === product._id)) return prevCart;
      return [...prevCart, product];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = async () => {
    if (!user) {
      alert('Please login first!');
      return;
    }

    const products = cart.map((p) => ({ productId: p._id, quantity: 1 }));
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id, products }),
      });

      if (res.ok) {
        alert('Order placed!');
        clearCart();
      } else {
        const errorData = await res.json();
        alert(`Failed to place order: ${errorData.message || res.statusText}`);
      }
    } catch (error) {
      alert(`Error placing order: ${error.message}`);
    }
  };

  return (
    <HotelContext.Provider
      value={{ user, setUser, cart, addToCart, removeFromCart, clearCart, placeOrder, logout }}
    >
      {children}
    </HotelContext.Provider>
  );
};
