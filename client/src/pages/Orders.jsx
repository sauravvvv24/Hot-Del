// pages/Orders.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrders } from '../api/order';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders(user._id);
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders');
      }
    };

    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border p-3 rounded">
              <p className="text-sm text-gray-600">Order ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <ul className="ml-4 mt-2">
                {order.items.map(item => (
                  <li key={item.productId._id}>
                    {item.productId.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
