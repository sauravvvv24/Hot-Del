import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out overflow-hidden">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {/* Optional badge */}
        {product.inStock === false && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
            Out of Stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-36">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-green-600 font-bold mt-1">₹{product.price}</p>
        </div>

        {/* Action Button */}
        <button
          disabled={product.inStock === false}
          className={`mt-3 w-full py-1.5 rounded text-white text-sm font-medium
            ${product.inStock ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}
          `}
        >
          {product.inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
