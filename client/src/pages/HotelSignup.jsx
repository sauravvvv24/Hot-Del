// src/pages/HotelSignup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const HotelSignup = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '',
    phone: '',
    address: '',
    hotelType: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Hotel name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email address';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const payload = { ...form, role: 'hotel' };
      const response = await axios.post('http://localhost:5000/api/auth/signup', payload);
      alert(response.data.msg || 'Signup successful! Please check your email to verify your account.');
      navigate('/hotel-login');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || err.message;
      alert(`Signup failed: ${errorMsg}`);
      if (errorMsg.includes('email')) {
        setErrors({ ...errors, email: errorMsg });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center justify-center">
            <div className="bg-blue-600 text-white font-bold text-lg px-2 py-1 rounded-md mr-2">HD</div>
            <span className="text-2xl font-bold text-blue-700">Hot-Del</span>
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Create Your Hotel Account</h1>
          <p className="mt-2 text-gray-600 max-w-lg mx-auto">
            Join 500+ hotels already sourcing premium dairy and frozen foods with Hot-Del
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:grid md:grid-cols-2">
            {/* Form Section */}
            <div className="p-8 sm:p-10">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Hotel Name
                  </label>
                  {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Grand Palace Hotel"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="contact@yourhotel.com"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  {errors.password && <span className="text-sm text-red-600">{errors.password}</span>}
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    {errors.phone && <span className="text-sm text-red-600">{errors.phone}</span>}
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91 9876543210"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="hotelType" className="block text-sm font-medium text-gray-700 mb-2">
                    Hotel Type
                  </label>
                  <select
                    id="hotelType"
                    name="hotelType"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.hotelType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="boutique">Boutique Hotel</option>
                    <option value="luxury">Luxury Hotel</option>
                    <option value="resort">Resort</option>
                    <option value="business">Business Hotel</option>
                    <option value="budget">Budget Hotel</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Hotel Address
                  </label>
                  {errors.address && <span className="text-sm text-red-600">{errors.address}</span>}
                </div>
                <textarea
                  id="address"
                  name="address"
                  placeholder="123 Business Avenue, Mumbai"
                  rows="3"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  value={form.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              
              <button
                type="submit"
                onClick={handleSignup}
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform hover:-translate-y-0.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : 'Create Hotel Account'}
              </button>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/hotel-login" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
            
            {/* Benefits Section */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-700 p-8 sm:p-10 flex flex-col justify-center text-white">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Why Join Hot-Del?</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="ml-3 font-medium">Access to 200+ verified dairy and frozen food vendors</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="ml-3 font-medium">Save 15+ hours weekly on procurement</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="ml-3 font-medium">Guaranteed on-time delivery with temperature tracking</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="ml-3 font-medium">Dedicated account manager for premium customers</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-400/30">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-yellow-100">"Hot-Del reduced our procurement costs by 18% and eliminated spoilage with their reliable cold chain."</p>
                    <p className="mt-2 text-sm text-blue-200">- Priya Sharma, Procurement Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Are you a vendor?{' '}
            <Link to="/seller-signup" className="font-medium text-green-600 hover:text-green-500">
              Sign up as a seller instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelSignup;