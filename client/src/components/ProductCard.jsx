import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../api/cart';
import { useAuth } from '../context/AuthContext';
import { CATEGORY_COLORS } from '../constants/categories.js';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await addToCart(user._id, product._id);
      toast.success('Added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('Error adding to cart');
    }
  };

  const getCategoryColor = (category) => {
    return CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-800';
  };

  // Function to get proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-product.jpg';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it starts with /src/assets/, convert to proper path for client
    if (imagePath.startsWith('/src/assets/')) {
      // For client-side, we need to handle this differently
      const assetName = imagePath.split('/').pop();
      return `/src/assets/${assetName}`;
    }
    
    // If it's a relative path starting with /, assume it's in the assets folder
    if (imagePath.startsWith('/')) {
      return imagePath;
    }
    
    return imagePath;
  };

  return (
    <Link to={`/products/${product._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
        {/* Product Image */}
        <div className="relative">
          <img 
            src={getImageUrl(product.image)} 
            alt={product.name} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/placeholder-product.jpg';
            }}
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Out of Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category Badge */}
          {product.category && (
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(product.category)}`}>
              {product.category}
            </span>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-gray-500 mb-2">
              Brand: {product.brand}
            </p>
          )}

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Price, Unit and Stock */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-gray-900">
                ₹{product.price?.toFixed(2) || '0.00'}
              </span>
              {product.unit && (
                <span className="text-sm text-gray-500 ml-1">
                  / {product.unit}
                </span>
              )}
            </div>
            {product.stock !== undefined && (
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;