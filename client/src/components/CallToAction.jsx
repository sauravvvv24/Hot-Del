// src/components/CallToAction.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="bg-yellow-100 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Get Started with Hot-Del</h2>
      <p className="mb-6 text-lg">Create an account and start ordering premium products today.</p>
      <div className="space-x-4">
        <Link
          to="/hotelsignup"
          className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Hotel Signup
        </Link>
        <Link
          to="/sellersignup"
          className="bg-white border border-black px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Become a Seller
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
