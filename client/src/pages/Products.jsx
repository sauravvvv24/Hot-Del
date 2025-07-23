import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        console.log('Fetched products:', res.data); // See actual response
        // ✅ Updated line to handle if response is an array or an object
        const data = res.data;
        const productArray = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
          ? data.products
          : []; // fallback to empty array
        setProducts(productArray);
      } catch (err) {
        console.error('Failed to fetch products:', err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(products) &&
        products.map((p) => (
          <ProductCard key={p._id || p.id} product={p} />
        ))}
    </div>
  );
};

export default Products;
