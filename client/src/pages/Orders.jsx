import React, { useState, useEffect, useContext } from 'react';
import { HotelContext } from '../context/HotelContext';

const Orders = () => {
  const { user } = useContext(HotelContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-100"
            >
              <div className="mb-2">
                <span className="text-sm text-gray-500">Order #{idx + 1}</span>
              </div>
              <p className="mb-2 font-semibold">
                Status:{' '}
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {order.status}
                </span>
              </p>

              <ul className="list-disc list-inside space-y-1">
                {order.products.map((item, i) => (
                  <li key={i} className="text-gray-700">
                    {item.productId.name} - ₹{item.productId.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
