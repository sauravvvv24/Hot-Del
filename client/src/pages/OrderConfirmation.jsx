import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getOrderById } from '../api/order';

const OrderConfirmation = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId || orderId === 'N/A') {
        setLoading(false);
        setError('No order ID found.');
        return;
      }
      try {
        const res = await getOrderById(orderId);
        setOrder(res.data);
      } catch (err) {
        setError('Failed to fetch order details.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Order Placed Successfully!</h2>
        <div className="text-lg font-semibold text-gray-800 mb-2">Order ID: <span className="text-blue-600">{orderId}</span></div>
        {loading ? (
          <div className="text-gray-500 mt-4">Loading order details...</div>
        ) : error ? (
          <div className="text-red-600 mt-4">{error}</div>
        ) : order ? (
          <div className="mt-6 text-left">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <ul className="divide-y divide-gray-200 mb-2">
              {order.items.map((item, idx) => (
                <li key={idx} className="py-2 flex justify-between text-sm">
                  <span>{item.productId?.name || item.productName || 'Product'}</span>
                  <span>Qty: {item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="font-bold mt-2">Total: ₹{order.total?.toFixed(2) || 'N/A'}</div>
          </div>
        ) : null}
        <div className="mt-8 flex flex-col gap-2">
          <Link to="/products" className="text-blue-600 hover:underline font-medium">Continue Shopping</Link>
          <Link to="/orders" className="text-green-700 hover:underline font-medium">View My Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;