// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-32">

        {/* ========================== HERO SECTION ========================== */}
        <section className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-blue-700 leading-tight">
            Powering Hotel Supplies<br className="hidden md:block" /> with Freshness & Speed
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hot-Del connects hotels with top dairy & frozen vendors. Fast logistics. Seamless ordering. Trusted service.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/products"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              Browse Products
            </Link>
            <Link
              to="/hotel-signup"
              className="px-6 py-3 bg-white text-blue-700 border border-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
            >
              Hotel Signup
            </Link>
          </div>
        </section>

        {/* ========================== FEATURES ========================== */}
        <section className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: '🧀',
              title: 'Premium Dairy',
              desc: 'Top-grade cheese, milk, paneer, cream, and more—handpicked for quality kitchens.'
            },
            {
              icon: '📦',
              title: 'Easy Ordering',
              desc: 'Filter by product, vendor, or region. Instant checkout with tracking.'
            },
            {
              icon: '🚚',
              title: 'On-Time Delivery',
              desc: 'Reliable delivery schedules across cities with cold chain logistics.'
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md text-center transition-all"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* ========================== SELLER CTA ========================== */}
        <section className="grid md:grid-cols-2 items-center gap-10">
          <img
            src="https://images.unsplash.com/photo-1603297631033-fb4e4c2dfb09?auto=format&fit=crop&w=800&q=80"
            alt="Vendor"
            className="rounded-xl shadow-lg w-full h-80 object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">Sell with Hot-Del</h2>
            <p className="text-gray-600 mb-6">
              Join our vendor network and gain access to 500+ hotels actively sourcing dairy & frozen goods. We manage payments, logistics & trust.
            </p>
            <Link
              to="/seller-signup"
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
              Join as Seller
            </Link>
          </div>
        </section>

        {/* ========================== ORDER MANAGEMENT ========================== */}
        <section className="grid md:grid-cols-2 items-center gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Smart Order Tracking</h2>
            <p className="text-gray-600 mb-6">
              Monitor orders, payments, and delivery statuses—all from a unified dashboard for hotels and vendors.
            </p>
            <Link
              to="/orders"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              View Dashboard
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1ab?auto=format&fit=crop&w=800&q=80"
            alt="Order Dashboard"
            className="rounded-xl shadow-lg w-full h-80 object-cover"
          />
        </section>

        {/* ========================== TRUSTED BY HOTELS ========================== */}
        <section className="bg-gray-50 p-12 rounded-2xl text-center space-y-6">
          <h2 className="text-3xl font-bold">Trusted by 500+ Hotels</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            From boutique hotels to large chains, Hot-Del is the preferred source for reliable supply of dairy essentials.
          </p>
          <img
            src="https://images.unsplash.com/photo-1617196038435-19c9d2bdc2cf?auto=format&fit=crop&w=800&q=80"
            alt="Trusted Hotels"
            className="rounded-xl shadow mx-auto object-cover max-h-80"
          />
        </section>

        {/* ========================== FINAL CTA ========================== */}
        <section className="text-center space-y-6 bg-blue-600 text-white py-16 rounded-2xl shadow-lg">
          <h2 className="text-4xl font-bold">Start Sourcing Smarter</h2>
          <p className="max-w-xl mx-auto text-lg">
            Register your hotel and simplify your procurement journey with a trusted platform.
          </p>
          <Link
            to="/hotel-signup"
            className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Register Your Hotel
          </Link>
        </section>

      </div>
    </div>
  );
};

export default Home;
