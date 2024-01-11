// WorkoutTimer.js

import React, { useState, useEffect } from 'react';
import './Timer.css'; // Import the CSS file

const WorkoutTimerPage = ({ match }) => {
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (isTimerRunning) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isTimerRunning]);

  const handleStartClick = () => {
    setIsTimerRunning(true);
  };

  const handleEndClick = () => {
    setIsTimerRunning(false);
    // You may add additional logic here when the workout ends
  };

  return (
    <div className="WorkoutTimerPage"> {/* Apply the className to the root div */}
      <h1>Workout Timer</h1>
      <p className="timer-display">Elapsed Time: {timer} seconds</p>
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleEndClick}>End</button>
    </div>
  );
};

export default WorkoutTimerPage;
