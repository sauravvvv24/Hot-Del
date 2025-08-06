// src/pages/Home.jsx
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import CategorySelector from '../components/CategorySelector';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <HeroBanner />
      
      {/* Category Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <CategorySelector showAll={false} />
        </div>
      </section>
      
      <FeaturedProducts />
      <CallToAction />
    </div>
  );
};

export default Home;
