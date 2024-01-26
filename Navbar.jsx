import React from 'react';

const styles = `
  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* Transparent black background */
    padding: 15px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .logo-container {
    display: flex;
    align-items: center;
  }

  .logo-container img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #ecf0f1;
  }

  .nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links li {
    margin-right: 20px;
  }

  .nav-links a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    transition: color 0.3s ease;
  }

  .nav-links a:hover {
    color: #e74c3c;
  }
`;

const Navbar = () => {
  return (
    <>
      <style>{styles}</style>
      <nav className="navbar">
        <div className="logo-container">
          {/* You can add an image logo here if needed */}
          <h1>DailyBurn</h1>
        </div>
        {/* Add your navigation links here if applicable */}
      </nav>
    </>
  );
};

export default Navbar;
