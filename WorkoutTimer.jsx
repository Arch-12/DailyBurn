// Import necessary React components and libraries
import React, { useState, useEffect } from 'react';
import Timer from './Timer'; // Create a Timer component separately
import './WorkoutTimer.css'

const WorkoutTimerPage = () => {
  const [timerActive, setTimerActive] = useState(false);

  const handleStart = () => {
    setTimerActive(true);
  };

  const handleEnd = () => {
    setTimerActive(false);
  };

  return (
    <div>
      <div className="workout-timer-container">
      <div className="workout-timer-content"></div>
      <h1>Workout Timer</h1>
      {timerActive ? (
        <Timer duration={30} onTimerComplete={handleEnd} />
      ) : (
        <>
          <p>Click Start to begin the workout timer.</p>
          <button onClick={handleStart}>Start</button>
        </>
      )}
      <button onClick={handleEnd}>End</button>
    </div>
    </div>
  );
};

export default WorkoutTimerPage;
