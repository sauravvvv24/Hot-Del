import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const { cartItems } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please login to place an order.');
      toast.error('Please login to place an order.');
      return;
    }
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      toast.error('Your cart is empty.');
      return;
    }
    if (!address.street || !address.city || !address.state || !address.zip || !address.country) {
      setError('Please fill in all address fields.');
      toast.error('Please fill in all address fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:3000/api/orders/place', {
        hotelId: user._id,
        address,
        items: cartItems.map(item => ({
          productId: item.productId || item._id,
          quantity: item.quantity,
        })),
        total: getTotal(),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Order placed successfully!');
      navigate('/order-confirmation', { state: { orderId: res.data.orderId } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order.');
      toast.error(err.response?.data?.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input type="text" name="street" value={address.street} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" name="city" value={address.city} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" name="state" value={address.state} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <input type="text" name="zip" value={address.zip} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input type="text" name="country" value={address.country} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <ul className="divide-y divide-gray-200 mb-2">
              {cartItems.map((item) => (
                <li key={item.productId || item._id} className="py-2 flex justify-between text-sm">
                  <span>{item.productName || item.name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{getTotal().toFixed(2)}</span>
            </div>
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-70 mt-4 text-lg font-semibold">
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;