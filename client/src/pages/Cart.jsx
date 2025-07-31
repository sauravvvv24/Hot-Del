import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items when component mounts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart'); // Adjust endpoint if needed
        setCartItems(response.data.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`/api/cart/${productId}`);
      setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) return <div className="p-4">Loading cart...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.productId} className="flex justify-between items-center border p-4 rounded">
              <div>
                <p className="font-medium">Product: {item.productName || item.productId}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.productId)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
