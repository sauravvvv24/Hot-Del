import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CATEGORIES, CATEGORY_DISPLAY_NAMES, CATEGORY_ICONS } from '../constants/categories';

const CategorySelector = ({ selectedCategory, onCategorySelect, showAll = true }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    } else {
      // Navigate to category page
      navigate(`/products/category/${category}`);
    }
  };

  const handleAllClick = () => {
    if (onCategorySelect) {
      onCategorySelect('');
    } else {
      navigate('/products');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {showAll && (
          <div
            onClick={handleAllClick}
            className={`cursor-pointer rounded-xl p-6 text-center transition-all hover:scale-105 border-2 ${
              !selectedCategory 
                ? 'bg-blue-50 border-blue-500 shadow-lg' 
                : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">All</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">All Products</p>
          </div>
        )}
        
        {PRODUCT_CATEGORIES.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`cursor-pointer rounded-xl p-6 text-center transition-all hover:scale-105 border-2 ${
              selectedCategory === category 
                ? 'bg-blue-50 border-blue-500 shadow-lg' 
                : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src={CATEGORY_ICONS[category]}
                alt={CATEGORY_DISPLAY_NAMES[category]}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/64/cccccc/666666?text=' + category.charAt(0);
                }}
              />
            </div>
            <p className="text-sm font-semibold text-gray-700">{CATEGORY_DISPLAY_NAMES[category]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector; 