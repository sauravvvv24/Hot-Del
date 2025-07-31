// src/api/cart.js
import axios from 'axios';

const API = 'http://localhost:5000/api/cart'; // Adjust for production

export const addToCart = async (hotelId, productId) => {
  return await axios.post(`${API}/add`, { hotelId, productId });
};

export const getCart = async (hotelId) => {
  return await axios.get(`${API}/${hotelId}`);
};

export const removeFromCart = async (hotelId, productId) => {
  return await axios.delete(`${API}/remove`, {
    data: { hotelId, productId }
  });
};
