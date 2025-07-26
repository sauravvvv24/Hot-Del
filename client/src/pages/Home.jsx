// src/pages/Home.jsx
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <HeroBanner />
      <FeaturedProducts />
      <CallToAction />
    </div>
  );
};

export default Home;
