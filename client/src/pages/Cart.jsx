// src/pages/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, clearCart } = useCart();

  const handleOrder = () => {
    // You can later send `cartItems` to backend via axios here
    console.log('Placing Order with:', cartItems);
    clearCart();
    alert('✅ Order placed!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">My Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">🛒 Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border rounded-md px-4 py-2 hover:shadow-sm"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                </div>
                <p className="font-medium text-blue-600">₹{item.price}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
