import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import YouTube from 'react-youtube';
import axios from 'axios'; 


const HomePage = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [healthData, setHealthData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: '',
  });
 

  const [bmiResult, setBmiResult] = useState(null);
  const [displayOrder, setDisplayOrder] = useState(['food', 'exercise']); // Default order

  

  const handleHealthDataChange = (e) => {
    setHealthData({ ...healthData, [e.target.name]: e.target.value });
  };

  const calculateBMI = () => {
    const heightInMeters = healthData.height / 100;
    const bmi = healthData.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(2);
  };

  const suggestExercises = (bmi) => {
    if (bmi < 18.5) {
      return {
        message: 'Underweight: Consider exercises to build muscle mass and improve overall strength.',
        exercises: [
          { title: 'Push-ups', description: 'Upper body exercise', videoLink: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
          { title: 'Squats', description: 'Lower body exercise', videoLink: 'https://www.youtube.com/watch?v=QKKZ9AGYTi4' },
          { title: 'Bench Press', description: 'Strengthens chest and arms', videoLink: 'https://www.youtube.com/watch?v=4Y2ZdHCOXok' },
          { title: 'Deadlifts', description: 'Full-body exercise', videoLink: 'https://www.youtube.com/watch?v=ytGaGIn3SjE' },
          { title: 'Bicep Curls', description: 'Isolation exercise for biceps', videoLink: 'https://www.youtube.com/watch?v=kwG2ipFRgfo' },
        ],
        foods: [
          'Include protein-rich foods like chicken, fish, and beans.',
          'Ensure a balanced diet with fruits and vegetables.',
          'Incorporate healthy fats from sources like avocados and nuts.',
          'Consume complex carbohydrates for sustained energy.',
          'Stay hydrated with an adequate intake of water.',
        ],
      };
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return {
        message: 'Normal Weight: Focus on maintaining a balanced exercise routine.',
        exercises: [
          { title: 'Walking', description: 'Low-impact cardio', videoLink: 'https://www.youtube.com/watch?v=ow3hpYJqYEI' },
          { title: 'Yoga', description: 'Improves flexibility and strength', videoLink: ' https://www.youtube.com/watch?v=brjAjq4zEIE' },
          { title: 'Cycling', description: 'Cardiovascular exercise', videoLink: 'https://www.youtube.com/watch?v=4Hl1WAGKjMc' },
          { title: 'Bodyweight Squats', description: 'Leg strengthening exercise', videoLink: 'https://www.youtube.com/watch?v=aclHkVaku9U' },
          { title: 'Plank', description: 'Core stabilization', videoLink: 'https://www.youtube.com/watch?v=pSHjTRCQxIw' },
        ],
        foods: [
          'Ensure a mix of protein, carbohydrates, and healthy fats in your diet.',
          'Include leafy greens for vitamins and minerals.',
          'Incorporate whole grains for fiber and sustained energy.',
          'Consume lean protein sources like poultry and fish.',
          'Stay hydrated with water and limit sugary beverages.',
        ],
      };
    } else {
      return {
        message: 'Overweight: Include cardiovascular exercises and strength training to support weight loss.',
        exercises: [
          { title: 'Running', description: 'Cardiovascular exercise', videoLink: ' https://www.youtube.com/watch?v=c1mBu4tK90k' },
          { title: 'Plank', description: 'Core strength exercise', videoLink: 'https://www.youtube.com/watch?v=pSHjTRCQxIw' },
          { title: 'Burpees', description: 'Full-body exercise', videoLink: 'https://www.youtube.com/watch?v=TU8QYVW0gDU' },
          { title: 'Jump Rope', description: 'Cardio workout', videoLink: 'https://www.youtube.com/watch?v=1BZM2Vre5oc' },
          { title: 'Mountain Climbers', description: 'High-intensity exercise', videoLink: 'https://www.youtube.com/watch?v=nmwgirgXLYM' },
        ],
        foods: [
          'Emphasize a calorie deficit through a balanced diet and regular exercise.',
          'Incorporate high-fiber foods for satiety.',
          'Choose lean protein sources for muscle maintenance.',
          'Limit processed foods and added sugars.',
          'Stay hydrated with water and limit sugary beverages.',
        ],
      };
    }
  };
  
  const storeHealthData = async () => {
    try {
      // Make a POST request to store health data in the database
      await axios.post('http://localhost:3000/addHealthData', healthData);
      console.log('Health data stored successfully!');
      alert('Health data stored successfully!');
    } catch (error) {
      console.error('Failed to store health data:', error);
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const bmi = calculateBMI();
    const exerciseSuggestions = suggestExercises(bmi);
  
    setBmiResult(`BMI: ${bmi}\n${exerciseSuggestions.message}`);
    setUserLoggedIn(true);
  
    // Store health data in the database
    await storeHealthData();
  };
  

  const handleDisplayOrderChange = () => {
    // Toggle the display order between food and exercise
    const newOrder = displayOrder[0] === 'food' ? ['exercise', 'food'] : ['food', 'exercise'];
    setDisplayOrder(newOrder);
  };

  useEffect(() => {
    // Mocking the username, you should set it after successful login
    setUserName(userName);  // Replace 'John' with the actual user's name after successful login

    // Mocking the user as logged in, you should set it after successful login
    setUserLoggedIn(true);
  }, []);

  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal Weight';
    } else {
      return 'Overweight';
    }
  };


  return (
    <div className='home-container'>
      {userLoggedIn ? (
        <>
          <div className="intro-container">
          <h1>Hi {userName}, welcome to DailyBurn! </h1>
            <p>Fill in the form below to calculate your calories and get personalized exercise recommendations.</p>
          </div>
          <form className="health-data-form" onSubmit={handleFormSubmit}>
            <label>Age:</label>
            <input type="number" name="age" value={healthData.age} onChange={handleHealthDataChange} required />

            <label>Height (cm):</label>
            <input type="number" name="height" value={healthData.height} onChange={handleHealthDataChange} required />

            <label>Weight (kg):</label>
            <input type="number" name="weight" value={healthData.weight} onChange={handleHealthDataChange} required />

            <label>Gender:</label>
            <select name="gender" value={healthData.gender} onChange={handleHealthDataChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button type="submit">Calculate BMI and Suggest Exercises</button>
          </form>

          {bmiResult && (
            <div className="result-container">
              <h2 className="result-heading">BMI Result</h2>
              <div className="result-box">{bmiResult}</div>
              <h2 className="status-heading">BMI Status</h2>
              <div className="status-box">{getBMIStatus(parseFloat(bmiResult.split(':')[1]))}</div>

              {displayOrder.map((section, index) => (
                <div key={index} className={section === 'food' ? 'food-suggestions' : 'exercise-list'}>
                  {section === 'food' && (
                    <>
                      <h2 className="suggestions-heading">Food Suggestions</h2>
                      {suggestExercises(parseFloat(bmiResult.split(':')[1]))?.foods.map((food, foodIndex) => (
                        <p key={foodIndex} className="food-item">{food}</p>
                      ))}
                    </>
                  )}

                  {section === 'exercise' && (
                    <>
                      <h2 className="exercises-heading">Recommended Exercises</h2>
                      {suggestExercises(parseFloat(bmiResult.split(':')[1]))?.exercises.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex} className="exercise-box">
                          <h3>{exercise.title}</h3>
                          <p>{exercise.description}</p>
                          <YouTube videoId={exercise.videoLink.split('v=')[1]} opts={{ width: '300', height: '200' }} />
                          <Link to={`/workout-timer/${exerciseIndex}`}>
                            <button className="begin-button">Begin</button>
                          </Link>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
              <button onClick={handleDisplayOrderChange}>Toggle Display Order</button>
            </div>
          )}
        </>
      ) : (
        <h1 className="form-heading">Health Data Input</h1>
      )}
    </div>
  );
};

export default HomePage;  