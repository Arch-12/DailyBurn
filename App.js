import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FirstPage from './components/FirstPage';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import WorkoutTimerPage from './components/WorkoutTimer';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';



function App() {
  return (
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<FirstPage />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/page" component={AdminPage} />
          <Route path='/home' element={<Home />} />
          <Route path='/workout-timer/:index' element={<WorkoutTimerPage />} />
        </Routes>
      </>
  );
}

export default App;
