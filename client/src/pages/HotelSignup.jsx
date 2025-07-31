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
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
      alert(response.data.msg || 'Signup successful!');
      navigate('/hotel-login');
    } catch (err) {
      const msg = err.response?.data?.msg || err.message;
      alert(`Signup failed: ${msg}`);
      if (msg.includes('email')) {
        setErrors(prev => ({ ...prev, email: msg }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left: Form Section */}
        <form className="p-8 md:p-10" onSubmit={handleSignup}>
          <div className="mb-6 text-center">
            <Link to="/" className="inline-flex items-center text-blue-700 font-bold text-xl">
              <div className="bg-blue-600 text-white px-2 py-1 rounded-md mr-2">HD</div>Hot-Del
            </Link>
            <h1 className="mt-4 text-2xl font-bold">Create Hotel Account</h1>
            <p className="text-gray-600 text-sm mt-1">Start sourcing with 500+ hotels using Hot-Del</p>
          </div>

          {['name', 'email', 'password', 'phone', 'address'].map((field) => (
            <div className="mb-5" key={field}>
              <label htmlFor={field} className="block mb-1 text-sm font-semibold">
                {field === 'name' ? 'Hotel Name' :
                 field === 'email' ? 'Email Address' :
                 field === 'phone' ? 'Phone Number' :
                 field === 'address' ? 'Hotel Address' :
                 'Password'}
              </label>
              {errors[field] && <p className="text-sm text-red-500 mb-1">{errors[field]}</p>}
              {field !== 'address' ? (
                <input
                  type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                  name={field}
                  id={field}
                  placeholder={
                    field === 'email' ? 'hotel@example.com' :
                    field === 'phone' ? '+91 9876543210' :
                    field === 'name' ? 'Hotel Royal View' : ''
                  }
                  className={`w-full px-4 py-2 rounded-md border ${errors[field] ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-blue-200`}
                  value={form[field]}
                  onChange={handleChange}
                />
              ) : (
                <textarea
                  rows={3}
                  id="address"
                  name="address"
                  placeholder="123 Marine Drive, Mumbai"
                  className={`w-full px-4 py-2 rounded-md border ${errors[field] ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-blue-200`}
                  value={form.address}
                  onChange={handleChange}
                ></textarea>
              )}
            </div>
          ))}

          {/* Hotel Type */}
          <div className="mb-5">
            <label htmlFor="hotelType" className="block mb-1 text-sm font-semibold">Hotel Type</label>
            <select
              id="hotelType"
              name="hotelType"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-200"
              value={form.hotelType}
              onChange={handleChange}
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

          {/* Terms */}
          <div className="flex items-center mb-5">
            <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-blue-600 rounded" />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating Account...' : 'Create Hotel Account'}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account? <Link to="/hotel-login" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </form>

        {/* Right: Info Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 md:p-10 flex flex-col justify-center space-y-6">
          <h2 className="text-xl font-bold">Why Join Hot-Del?</h2>
          <ul className="space-y-3 text-sm">
            <li>✓ 200+ verified dairy & frozen vendors</li>
            <li>✓ Save 15+ hours on procurement</li>
            <li>✓ On-time cold delivery guaranteed</li>
            <li>✓ Dedicated account manager</li>
          </ul>
          <blockquote className="mt-4 bg-white/10 p-4 rounded-md text-sm border-l-4 border-yellow-300">
            “Hot-Del reduced our costs by 18% and ensured zero spoilage.”<br />
            <span className="text-yellow-200">– Priya Sharma, Procurement Head</span>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default HotelSignup;
