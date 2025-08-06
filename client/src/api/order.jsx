// src/api/order.js
import axios from 'axios';

const API = 'http://localhost:5000/api/orders';

export const placeOrder = async (hotelId) => {
  return await axios.post(`${API}/place`, { hotelId });
};

export const getOrders = async (hotelId) => {
  return await axios.get(`${API}/${hotelId}`);
};

export const getOrderById = async (orderId) => {
  return await axios.get(`http://localhost:3000/api/orders/${orderId}`);
};

export const getMyProducts = async (token) => {
  return await axios.get('http://localhost:3000/api/products/mine', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSellerOrders = async (token) => {
  return await axios.get('http://localhost:3000/api/orders/seller', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
