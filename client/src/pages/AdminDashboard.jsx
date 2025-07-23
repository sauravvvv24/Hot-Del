import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const u = await axios.get('/api/admin/users');
      const p = await axios.get('/api/products');
      setUsers(u.data);
      setProducts(p.data);
    };  
    if (user?.role === 'admin') fetchData();
  }, [user]);

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Users:</h3>
      {users.map(u => <div key={u._id}>{u.email} ({u.role})</div>)}
      <h3>Products:</h3>
      {products.map(p => <div key={p._id}>{p.name}</div>)}
    </div>
  );
};

export default AdminDashboard;
 