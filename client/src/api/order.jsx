// src/api/order.js
import axios from 'axios';

const API = 'http://localhost:5000/api/orders';

export const placeOrder = async (hotelId) => {
  return await axios.post(`${API}/place`, { hotelId });
};

export const getOrders = async (hotelId) => {
  return await axios.get(`${API}/${hotelId}`);
};
