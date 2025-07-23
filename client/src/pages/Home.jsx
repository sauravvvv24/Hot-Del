// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-3 mb-6 md:mb-8">
    <div className="h-1 w-8 md:w-10 bg-blue-600 rounded"></div>
    <h2 className="text-xl md:text-2xl font-semibold text-blue-700">{title}</h2>
  </div>
);

const HotelLogo = ({ name }) => (
  <div className="flex flex-col items-center">
    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-2" />
    <span className="text-sm font-medium text-gray-700">{name}</span>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-20 md:space-y-32">
          
          {/* ========================== HERO SECTION ========================== */}
          <section className="text-center space-y-6 md:space-y-8 pt-4">
            <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="mr-2">✅</span> Trusted by 500+ hotels nationwide
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-blue-700 leading-tight max-w-3xl mx-auto">
              Premium Dairy & Frozen Foods for Hotels. <span className="text-green-600">Delivered Fresh.</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Connect with verified vendors. Streamline ordering. Ensure freshness with our cold chain logistics.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/products"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition transform hover:-translate-y-0.5"
              >
                Browse Products
              </Link>
              <Link
                to="/hotel-signup"
                className="px-6 py-3 bg-white text-blue-700 border border-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition transform hover:-translate-y-0.5"
              >
                Hotel Signup
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="mr-2">🔒</span> Secure Platform
              </div>
              <div className="flex items-center">
                <span className="mr-2">✅</span> Verified Vendors
              </div>
              <div className="flex items-center">
                <span className="mr-2">📦</span> Temperature-Controlled
              </div>
            </div>
          </section>

          {/* ========================== FEATURES ========================== */}
          <section className="bg-gray-50 p-6 md:p-10 rounded-2xl shadow">
            <div className="max-w-4xl mx-auto">
              <SectionHeader title="Why Hotels Choose Hot-Del" />
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    icon: '🥛',
                    title: 'Premium Dairy',
                    desc: 'Top-grade cheese, milk, butter, and cream from certified suppliers'
                  },
                  {
                    icon: '📱',
                    title: 'Easy Ordering',
                    desc: 'Mobile-friendly platform with bulk ordering and repeat orders'
                  },
                  {
                    icon: '⏱️',
                    title: 'On-Time Delivery',
                    desc: '97% on-time delivery rate with temperature tracking'
                  }
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="bg-white p-5 md:p-6 rounded-2xl shadow hover:shadow-md transition-all flex flex-col items-center text-center"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-sm md:text-base">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ========================== VENDOR CTA ========================== */}
          <section className="grid md:grid-cols-2 items-center gap-8 md:gap-12">
            <div className="relative">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-96" />
              <div className="absolute -bottom-4 -right-4 bg-white px-4 py-3 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="mr-2 text-green-600">✅</div>
                  <div>
                    <p className="font-medium">Verified Vendor</p>
                    <p className="text-sm text-gray-500">4.8/5 (120 reviews)</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <SectionHeader title="Grow Your Business" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Join Our Vendor Network</h3>
              <p className="text-gray-600 mb-6">
                Access 500+ hotels actively sourcing dairy & frozen goods. We handle payments, logistics, and quality control.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Competitive commission rates</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Weekly payments</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dedicated account manager</span>
                </li>
              </ul>
              <Link
                to="/seller-signup"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition shadow hover:shadow-md"
              >
                Join as Seller
                <span className="ml-2">→</span>
              </Link>
            </div>
          </section>

          {/* ========================== ORDER TRACKING ========================== */}
          <section className="bg-gray-50 p-6 md:p-10 rounded-2xl shadow grid md:grid-cols-2 items-center gap-8 md:gap-12">
            <div>
              <SectionHeader title="Smart Order Management" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Real-Time Tracking</h3>
              <p className="text-gray-600 mb-6">
                Monitor orders from placement to delivery with our intuitive dashboard. Get temperature alerts and ETAs.
              </p>
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-lg flex items-center justify-center text-xl">📱</div>
                </div>
                <div>
                  <p className="font-medium">Mobile Notifications</p>
                  <p className="text-sm text-gray-500">Real-time updates on your phone</p>
                </div>
              </div>
              <Link
                to="/demo"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow hover:shadow-md"
              >
                View Demo Dashboard
                <span className="ml-2">→</span>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-96" />
              <div className="absolute -top-4 -left-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="mr-2 text-blue-500">📊</div>
                  <p className="font-medium">Live Dashboard</p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================== TRUSTED BY HOTELS ========================== */}
          <section className="max-w-5xl mx-auto">
            <SectionHeader title="Trusted by 500+ Hotels" />
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-400 text-2xl mr-1">★</span>
                    <span className="text-yellow-400 text-2xl mr-1">★</span>
                    <span className="text-yellow-400 text-2xl mr-1">★</span>
                    <span className="text-yellow-400 text-2xl mr-1">★</span>
                    <span className="text-yellow-400 text-2xl mr-2">★</span>
                    <span className="font-bold">4.9/5</span>
                  </div>
                  <blockquote className="text-gray-700 text-lg italic mb-6">
                    "Hot-Del cut our dairy procurement time by 70% and reduced spoilage with their reliable cold chain. Essential for our 5-star kitchen."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12 mr-4" />
                    <div>
                      <p className="font-semibold">Rajesh Mehta</p>
                      <p className="text-gray-500">Head Chef, Grand Palace Hotel</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 p-6 flex flex-wrap items-center justify-center gap-6">
                  {['Luxury Inn', 'SeaView Resort', 'Grand Palace', 'Urban Suites', 'Mountain Lodge', 'Royal Stay'].map((name, i) => (
                    <HotelLogo key={i} name={name} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ========================== FINAL CTA ========================== */}
          <section className="text-center space-y-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 md:py-16 rounded-2xl shadow-lg">
            <h2 className="text-2xl md:text-4xl font-bold max-w-2xl mx-auto">
              Transform Your Hotel's Supply Chain
            </h2>
            <p className="max-w-xl mx-auto text-base md:text-lg opacity-90">
              Join industry leaders who save 15+ hours weekly on procurement
            </p>
            <Link
              to="/hotel-signup"
              className="inline-block px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1"
            >
              Register Your Hotel - Free 30-Day Trial
            </Link>
            <div className="text-sm opacity-80 flex justify-center items-center gap-2">
              <span>🔒 PCI DSS Compliant</span>
              <span>•</span>
              <span>✅ ISO 22000 Certified</span>
            </div>
          </section>
        </div>
      </main>

      {/* ========================== FOOTER ========================== */}
      <Footer/>
    </div>
  );
};

export default Home;