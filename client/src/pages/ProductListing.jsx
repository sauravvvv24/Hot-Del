import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data || []); // Fallback to empty array
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Fallback if error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <div className="text-center py-10">No products available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.slice(0, 9).map((product) => (
        <div
          key={product._id}
          className="border rounded-lg shadow hover:shadow-lg transition p-4"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
          <p className="text-gray-700">₹{product.price}</p>
          <p className="text-sm text-gray-500 mt-1">{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
