// src/main.jsx (or index.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { HotelProvider } from './context/HotelContext';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HotelProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </HotelProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
