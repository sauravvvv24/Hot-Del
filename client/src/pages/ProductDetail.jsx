// pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <img src={product.image} alt={product.name} className="w-64" />
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-lg mt-2">₹{product.price}</p>
      <p className="text-gray-600 mt-2">{product.description}</p>
    </div>
  );
};

export default ProductDetail;
