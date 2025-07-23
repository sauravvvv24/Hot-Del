import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { HotelContext } from '../context/HotelContext';

const SellerDashboard = () => {
  const { user } = useContext(HotelContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch(`http://localhost:5000/api/products/seller/${user._id}`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    if (user?.role === 'seller') {
      fetchProducts();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    });
    fetchProducts();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Seller Dashboard</h2>
        <Link
          to="/seller/add-product"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
              <p className="text-green-600 font-medium mb-3">₹{product.price}</p>
              <div className="flex justify-between">
                <Link
                  to={`/seller/edit-product/${product._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
