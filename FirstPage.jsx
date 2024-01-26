import React from 'react';
import { Link } from 'react-router-dom';
import './FirstPage.css';

const FirstPage = () => {
  const motivationalQuote = "Reach your goals with ";

  return (
    <div className="front-page">
      <div className="background-image"></div>
      <div className="center-container">
        <h1>
          {motivationalQuote}
          <span className="dailyburn-text">DailyBurn</span>
        </h1>
        <h3>Build healthy habits with the all-in-one food, exercise, and calorie tracker.</h3>
        <div className="login-link">
          <Link to="/register">
            <button>Start Today!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;