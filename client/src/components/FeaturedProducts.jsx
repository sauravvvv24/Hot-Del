import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    img: 'https://thumbs.dreamstime.com/z/fresh-milk-products-13235989.jpg?ct=jpeg',
    name: 'Fresh Milk',
  },
  {
    img: 'https://thumbs.dreamstime.com/z/fresh-organic-dairy-products-cheese-butter-sour-cream-yoghurt-milk-fresh-organic-dairy-products-white-table-selective-focus-103864955.jpg?ct=jpeg',
    name: 'Butter & Cheese',
  },
  {
    img: 'https://thumbs.dreamstime.com/z/frozen-fresh-vegetables-green-food-background-close-up-beans-peas-healthy-diet-vegetarian-nutrition-concepts-space-95098481.jpg?ct=jpeg',
    name: 'Frozen Peas',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Featured Dairy Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow hover:shadow-lg transition">
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <Link
                to="/products"
                className="text-blue-600 hover:text-blue-800 font-medium transition"
              >
                View Products →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
