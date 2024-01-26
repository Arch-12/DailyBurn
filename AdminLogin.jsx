// AdminLogin.js

import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', adminData);

      if (response.data.isAdmin) {
        // Admin login successful, redirect to admin page
        window.location.href = '/admin/page';
      } else {
        window.alert('Invalid admin credentials.');
      }
    } catch (error) {
      console.error('Admin login failed:', error);
      window.alert('Admin login failed. Please check the console for details.');
    }
  };

  return (
    <div>
      <h3>Admin Login</h3>
      <form onSubmit={handleAdminLogin}>
        <label>Username:</label>
        <input type="text" name="username" onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
