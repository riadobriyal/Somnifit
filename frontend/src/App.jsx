import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SleepTracker from './components/SleepTracker';
import FitnessTracker from './components/FitnessTracker';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sleep-tracker" element={<SleepTracker />} />
        <Route path="/fitness-tracker" element={<FitnessTracker />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
