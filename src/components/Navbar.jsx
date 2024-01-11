import React from 'react';

// Use template literals to include the CSS
const styles = `
  .navbar {
    background-color: #423f40;
    padding: 10px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-container img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  h1 {
    margin-right: auto;
  }
`;

const Navbar = () => {
  return (
    <>
      <style>{styles}</style>
      <nav className="navbar">
        
        <h1>DailyBurn</h1>
      </nav>
    </>
  );
};

export default Navbar;
