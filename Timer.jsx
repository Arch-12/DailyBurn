import React, { useState, useEffect } from 'react';
import './Timer.css'

const Timer = ({ duration, onTimerComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
        onTimerComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimerComplete]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <h2>"The pain you feel today will be the strength you feel tomorrow."</h2>
      <p>Time Left: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
