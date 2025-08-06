// pages/Orders.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrders, getSellerOrders } from '../api/order';
import { useLocation } from 'react-router-dom';

const Orders = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const isSellerRoute = location.pathname.startsWith('/seller/orders');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        let res;
        if (isSellerRoute || user?.role === 'seller') {
          res = await getSellerOrders(token);
        } else {
          res = await getOrders(user._id);
        }
        setOrders(res.data || []);
      } catch (err) {
        setError('Failed to fetch orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    if (user && token) fetchOrders();
  }, [user, token, isSellerRoute]);

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">
        {isSellerRoute || user?.role === 'seller' ? 'Orders on My Products' : 'My Orders'}
      </h1>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mr-4"></div>
          <span className="text-gray-500">Loading orders...</span>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center py-8">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500 text-center py-12">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">Products</th>
                <th className="py-2 px-4 text-left">Buyer (Hotel)</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-blue-50">
                  <td className="py-2 px-4 font-mono text-xs">{order._id}</td>
                  <td className="py-2 px-4">
                    <ul className="list-disc ml-4">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          {item.productId?.name || 'Product'} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4">
                    {order.hotelId?.name || order.hotelId?.email || 'Hotel'}
                  </td>
                  <td className="py-2 px-4">
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-xs text-gray-500">
                    {order.orderedAt ? new Date(order.orderedAt).toLocaleString() : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
