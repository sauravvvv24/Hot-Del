import React from 'react';
import { addToCart } from '../api/cart';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { user } = useAuth(); // Logged-in hotel user

  const handleAddToCart = async () => {
    if (!user) return alert("Login first");

    try {
      await addToCart(user._id, product._id);
      alert("Added to cart!");
    } catch (err) {
      alert("Error adding to cart");
    }
  };

  return (
    <div className="border rounded p-3">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="font-bold mt-2">{product.name}</h2>
      <p className="text-sm">₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white mt-2 px-3 py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
