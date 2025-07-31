import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { HotelProvider } from './context/HotelContext';

import './index.css'; // Tailwind CSS or global styles

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
