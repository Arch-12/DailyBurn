// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend for login
      const response = await axios.post('http://localhost:3000/login', loginData);
  
      // Check the response
      console.log('Login Response:', response.data);
  
      // Handle successful login
      if (response.data.message) {
        console.log('Login successful!');
        
        // You can perform a redirect here, for example using react-router-dom
        // Replace '/home' with the path you want to redirect the user to
        window.location.href = '/home';
  
      } else {
        console.error('Login failed:', response.data.error);
        window.alert('Login failed. Please check your username and password.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      window.alert('Login failed. Please check the console for details.');
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleLogin} autoComplete="off">
          <h3>Login using registered username or password</h3>
          <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} required />

          <div className="login-link">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
