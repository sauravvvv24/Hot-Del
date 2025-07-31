// client/src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log('Error fetching products:', err));
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
