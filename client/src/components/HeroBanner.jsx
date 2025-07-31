// src/components/HeroBanner.jsx
import React from "react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section
      className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url("/images/hero-bg.png")`,
      }}
    >
      <div
        className=" absolute inset-0
           bg-opacity-40 z-10"
      />
      <div className="relative z-20 text-center text-Black px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Premium Dairy & Frozen Goods
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Supplying quality directly to hotels and restaurants
        </p>
        <Link
          to="/products"
          className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
        >
          Browse Products
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;
