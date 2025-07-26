// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* ==================== BANNER ==================== */}
      <section className="relative h-[80vh] bg-cover bg-center flex items-center justify-center" style={{
        backgroundImage: `url('https://thumbs.dreamstime.com/z/top-view-photo-dairy-products-over-blue-wooden-background-symbols-jewish-holiday-shavuot-banner-147754551.jpg?ct=jpeg')`
      }}>
        <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 z-10" />
        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Premium Dairy & Frozen Goods
          </h1>
          <p className="text-lg md:text-2xl mb-6">Supplying quality directly to hotels and restaurants</p>
          <Link to="/products" className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition">
            Browse Products
          </Link>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Dairy Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
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
          ].map((item, idx) => (
            <div key={idx} className="bg-white shadow rounded-xl overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <Link to="/products" className="text-blue-600 hover:underline">
                  View Products
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== CALL TO ACTION ==================== */}
      <section className="bg-yellow-100 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Get Started with Hot-Del</h2>
        <p className="mb-6 text-lg">Create an account and start ordering premium products today.</p>
        <div className="space-x-4">
          <Link to="/hotelsignup" className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
            Hotel Signup
          </Link>
          <Link to="/sellersignup" className="bg-white border border-black px-6 py-3 rounded-full hover:bg-gray-100 transition">
            Become a Seller
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
