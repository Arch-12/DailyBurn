import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import YouTube from 'react-youtube';


const HomePage = () => {
  const [healthData, setHealthData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: '',
  });

  const [bmiResult, setBmiResult] = useState(null);

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
  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const bmi = calculateBMI();
    const exerciseSuggestions = suggestExercises(bmi);

    setBmiResult(`BMI: ${bmi}\n${exerciseSuggestions.message}`);
  };

  return (
    <div className='home-container'>
      <h1>Health Data Input</h1>
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
  <div>
    <div className="result-message">{bmiResult}</div>
    <div className="exercise-list">
      <h2>Recommended Exercises</h2>
      {suggestExercises(parseFloat(bmiResult.split(':')[1]))?.exercises.map((exercise, index) => (
        <div key={index} className="exercise-box">
          <h3>{exercise.title}</h3>
          <p>{exercise.description}</p>
          <YouTube videoId={exercise.videoLink.split('v=')[1]} opts={{ width: '300', height: '200' }} />
          <Link to={`/workout-timer/${index}`}>
                  <button className="begin-button">Begin</button>
                </Link>
        </div>
      ))}
    </div>
    <div className="food-suggestions">
      <h2>Food Suggestions</h2>
      {suggestExercises(parseFloat(bmiResult.split(':')[1]))?.foods.map((food, index) => (
        <p key={index}>{food}</p>
      ))}
    </div>
  </div>
      )}
    </div>
  );
}
export default HomePage;