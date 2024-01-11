import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    username: '',
    password: '',
    phno: '',
    gender: '',
    city: '',
    dob: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [registrationError, setRegistrationError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: null });
    setRegistrationError(null);
  };

  const validateForm = () => {
    const errors = {};

    // Validation logic for each field
    // You can customize these validation rules based on your requirements

    if (!/^[A-Z][a-z]*$/.test(formData.fname)) {
      errors.fname = 'First name should start with a capital letter.';
    }

    if (!/^[A-Z][a-z]*$/.test(formData.lname)) {
      errors.lname = 'Last name should start with a capital letter.';
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email address.';
    }

    if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      errors.username = 'Username should contain only letters and numbers.';
    }

    if (formData.password.length < 6) {
      errors.password = 'Password should contain at least 6 characters including letters, numbers and special characters.';
    }

    if (!/^\d{10}$/.test(formData.phno)) {
      errors.phno = 'Phone number should contain 10 digits.';
    }

    if (!/^[A-Z][a-z]*$/.test(formData.city)) {
      errors.city = 'City should start with a capital letter.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      try {
        // Make a POST request to the backend
        const response = await axios.post('http://localhost:3000/add', formData);
        

        // Check if registration was successful based on backend response
        if (response.data.error) {
          window.alert(response.data.error); // Set registration error
        } else {
          window.alert('Registration successful!');
        }
      } catch (error) {
        console.error('Registration failed:', error);
        window.alert('Registration failed. already existing email or phone number');
      }
    } else {
      // Display a generic error message when there are validation errors
      window.alert('Please fix the validation errors before submitting the form.');
    }
    
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <form onSubmit={handleSubmit}>
          <><h3>Are you a new user register to continue!</h3></>

          {/* Display validation errors */}
          {validationErrors.fname && <p>{validationErrors.fname}</p>}
          <label>First Name:</label>
          <input type="text" name="fname" onChange={handleChange} required />

          {validationErrors.lname && <p>{validationErrors.lname}</p>}
          <label>Last Name:</label>
          <input type="text" name="lname" onChange={handleChange} required />

          {validationErrors.email && <p>{validationErrors.email}</p>}
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />

          {validationErrors.username && <p>{validationErrors.username}</p>}
          <label>Username</label>
          <input type="text" name="username" onChange={handleChange} required />

          {validationErrors.password && <p>{validationErrors.password}</p>}
          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} required />

          {validationErrors.phno && <p>{validationErrors.phno}</p>}
          <label>Phone Number:</label>
          <input type="tel" name="phno" onChange={handleChange} required />

          {validationErrors.gender && <p>{validationErrors.gender}</p>}
          <label>Gender:</label>
          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {validationErrors.dob && <p>{validationErrors.dob}</p>}
          <label>Date of Birth:</label>
          <input type="date" name="dob" onChange={handleChange} required />

          {validationErrors.city && <p>{validationErrors.city}</p>}
          <label>City:</label>
          <input type="text" name="city" onChange={handleChange} required />

          <button type="submit">Register</button>
        </form>

        <div className="login-link">
          <h5>If already registered login to continue</h5>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;