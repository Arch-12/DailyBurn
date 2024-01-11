import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import WorkoutTimerPage from './components/WorkoutTimer';




function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Registration/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/workout-timer/:index' element={<WorkoutTimerPage/>} />
    </Routes>
    
    </>
      
   
  );
}

export default App;
