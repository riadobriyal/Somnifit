import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FitnessTracker() {
  const [showTip, setShowTip] = useState(false);
  const [fitnessScore, setFitnessScore] = useState(0);
  const [activityLevel, setActivityLevel] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    weight: '',
    height: '',
    activityLevel: 'Sedentary',
    workoutDuration: '',
    caloriesBurned: '',
    steps: '',
    heartRate: '',
    workoutIntensity: 'Moderate'
  });
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivityLevel((prev) => (prev < 85 ? prev + 0.1 : 0));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const fetchFitness = async () => {
    try {
      setFitnessScore(0);
      
      // Call your fitness prediction API here
      const res = await fetch('http://localhost:5000/fitness_predictor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          age: formData.age,
          gender: formData.gender,
          weight: formData.weight,
          height: formData.height,
          activity_level: formData.activityLevel,
          workout_duration: formData.workoutDuration,
          calories_burned: formData.caloriesBurned,
          steps: formData.steps,
          heart_rate: formData.heartRate,
          workout_intensity: formData.workoutIntensity
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setFitnessScore(data.fitness_score);
      setShowDashboard(true);
      
      setTimeout(() => {
        const formElement = document.getElementById('dashboard');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
      console.log('Fitness score:', data.fitness_score);
    } catch (error) {
      console.error('Error fetching fitness data:', error);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('fitness-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  function handleBmiCalculate() {
    if (!bmiWeight || !bmiHeight) return;
    const h = parseFloat(bmiHeight) / 100;
    const w = parseFloat(bmiWeight);
    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      let category = '';
      if (bmiValue < 18.5) category = 'Underweight';
      else if (bmiValue < 25) category = 'Normal';
      else if (bmiValue < 30) category = 'Overweight';
      else category = 'Obese';
      setBmiResult({ value: bmiValue.toFixed(1), category });
    }
  }

  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-orange-400 to-yellow-300">
        <div className="p-6">
          <Link
            to="/"
            className="text-3xl font-bold text-white tracking-wide hover:text-purple-200 transition-colors"
          >
            SomniFit
          </Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* StarField removed */}
          <h1 className="text-6xl md:text-8xl font-extrabold text-white text-center mb-8 tracking-tight">
            Enhance your fitness
          </h1>
          <p className="text-xl md:text-2xl text-white/80 text-center max-w-2xl">
            Track, analyze, and improve your fitness with our AI-powered insights and personalized recommendations.
          </p>
          <button 
            onClick={scrollToForm}
            className="mt-12 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-lg text-lg transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full bg-gradient-to-b from-yellow-300 to-orange-400 px-6 md:px-20 py-16">
        {/* Card 1 */}
        <div className="group relative transform hover:-translate-y-2 transition-all duration-300 h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
          <div className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-yellow-300/10 rounded-2xl"></div>
            <div className="relative h-full flex flex-col">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://cdn.dribbble.com/users/1162077/screenshots/4382010/media/b24709557db701ebffa4bd90d26c30c4.gif" 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                  alt="Fitness Tracking Animation"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 mt-6">Activity Tracking</h3>
              <p className="text-black text-lg flex-1">
                Track your daily activities, workouts, and progress. Our AI-powered system monitors your fitness metrics and provides real-time insights to help you achieve your goals.
              </p>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="group relative transform hover:-translate-y-2 transition-all duration-300 h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
          <div className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 to-orange-400/10 rounded-2xl"></div>
            <div className="relative h-full flex flex-col">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://cdn.dribbble.com/users/846207/screenshots/5127755/media/0bffc974ad0745bbc4e88f6214e69b30.gif" 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                  alt="Fitness Analytics Animation"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 mt-6">Smart Analytics</h3>
              <p className="text-black text-lg flex-1">
                Get detailed insights into your workout performance, calorie burn, and progress over time. Our machine learning algorithms help you understand your fitness patterns and optimize your routine.
              </p>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="group relative transform hover:-translate-y-2 transition-all duration-300 h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
          <div className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-yellow-300/10 rounded-2xl"></div>
            <div className="relative h-full flex flex-col">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://cdn.dribbble.com/users/1787323/screenshots/6604852/dribbbe_1.gif" 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                  alt="Workout Tips Animation"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 mt-6">Personalized Tips</h3>
              <p className="text-black text-lg flex-1">
                Receive customized workout recommendations and tips based on your performance and goals. Our AI learns from your fitness data to provide the most effective guidance for you.
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto py-16 w-full bg-gradient-to-b from-orange-400 to-yellow-300">
        <div id="fitness-form" className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-[#C6E0FF]">
              Track Your Fitness
            </h2>
            <p className="text-lg text-[#C6E0FF]/80">
              Monitor your workout and activity metrics for better health
            </p>
          </div>
          <div className="max-w-4xl mx-auto mb-12">
            <form className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-[#FFD580]/20 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white">BMI Calculator</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={bmiWeight}
                        onChange={e => setBmiWeight(e.target.value)}
                        className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Height (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={bmiHeight}
                        onChange={e => setBmiHeight(e.target.value)}
                        className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <button
                    type="button"
                    onClick={handleBmiCalculate}
                    className="w-full bg-orange-500 text-white font-semibold py-4 px-8 rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-lg mt-2"
                  >
                    Calculate BMI
                  </button>
                  {bmiResult && (
                    <div className="mt-6 text-center w-full">
                      <div className="text-2xl font-bold text-orange-700">Your BMI: {bmiResult.value}</div>
                      <div className="text-lg text-white mt-2">Category: <span className="font-semibold text-orange-500">{bmiResult.category}</span></div>
                      {/* BMI Meter */}
                      <div className="mt-6 w-full flex flex-col items-center">
                        <div className="relative w-full max-w-md h-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 shadow-inner">
                          {/* Segments for reference */}
                          <div className="absolute left-0 top-0 h-full" style={{width: '18.5%', background: 'rgba(59,130,246,0.2)'}}></div>
                          <div className="absolute left-[18.5%] top-0 h-full" style={{width: '24%', background: 'rgba(34,197,94,0.2)'}}></div>
                          <div className="absolute left-[42.5%] top-0 h-full" style={{width: '17.5%', background: 'rgba(251,191,36,0.2)'}}></div>
                          <div className="absolute left-[60%] top-0 h-full" style={{width: '40%', background: 'rgba(239,68,68,0.2)'}}></div>
                          {/* Pointer */}
                          {(() => {
                            const bmi = parseFloat(bmiResult.value);
                            let left = 0;
                            if (bmi < 18.5) left = (bmi / 40) * 100;
                            else if (bmi < 25) left = ((bmi - 18.5) / (25 - 18.5) * 24 + 18.5) / 40 * 100;
                            else if (bmi < 30) left = ((bmi - 25) / (30 - 25) * 17.5 + 42.5) / 100 * 100;
                            else left = ((bmi - 30) / (40 - 30) * 40 + 60) / 100 * 100;
                            if (left > 100) left = 100;
                            return (
                              <div className="absolute top-0" style={{ left: `calc(${left}% - 10px)` }}>
                                <div className="w-5 h-5 bg-orange-500 rounded-full border-4 border-white shadow-lg -mt-2"></div>
                                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-orange-500 mx-auto -mt-1"></div>
                              </div>
                            );
                          })()}
                        </div>
                        <div className="flex justify-between w-full max-w-md text-xs text-white mt-2">
                          <span className="text-blue-200">Underweight</span>
                          <span className="text-green-200">Normal</span>
                          <span className="text-yellow-200">Overweight</span>
                          <span className="text-red-200">Obese</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
          <form className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-[#FFD580]/20 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">Personal Details</h3>
                <div className="space-y-4">
                  {/* Age Input */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                  {/* Gender Buttons */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">Gender</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, gender: 'Male'})}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                          formData.gender === 'Male'
                            ? 'bg-orange-500 text-white border-orange-500 shadow-lg'
                            : 'bg-white text-orange-500 border-orange-400 hover:bg-orange-100'
                        }`}
                      >
                        Male
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, gender: 'Female'})}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                          formData.gender === 'Female'
                            ? 'bg-orange-500 text-white border-orange-500 shadow-lg'
                            : 'bg-white text-orange-500 border-orange-400 hover:bg-orange-100'
                        }`}
                      >
                        Female
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Body Metrics Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">Body Metrics</h3>
                <div className="space-y-4">
                  {/* Weight */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                  {/* Height */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({...formData, height: e.target.value})}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
              {/* Activity Metrics Section */}
              <div className="space-y-6 md:col-span-2">
                <h3 className="text-2xl font-semibold text-center text-white">Weight Class</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Weight Class */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Weight Class</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['mild thinness', 'overweight', 'normal', 'obese', 'severe obese', 'severe thinness', 'moderate thinness'].map((weightClass) => (
                          <button
                            key={weightClass}
                            type="button"
                            onClick={() => setFormData({...formData, activityLevel: weightClass})}
                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                              formData.activityLevel === weightClass
                                ? 'bg-orange-500 text-white border-orange-500 shadow-lg'
                                : 'bg-white text-orange-500 border-orange-400 hover:bg-orange-100'
                            }`}
                          >
                            {weightClass}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Workout Duration */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Workout Duration (minutes)</label>
                      <input
                        type="number"
                        value={formData.workoutDuration}
                        onChange={(e) => setFormData({...formData, workoutDuration: e.target.value})}
                        className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {/* Calories Burned */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Calories Burned</label>
                      <input
                        type="number"
                        value={formData.caloriesBurned}
                        onChange={(e) => setFormData({...formData, caloriesBurned: e.target.value})}
                        className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                    {/* Steps */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Steps</label>
                      <input
                        type="number"
                        value={formData.steps}
                        onChange={(e) => setFormData({...formData, steps: e.target.value})}
                        className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                    {/* Heart Rate */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Average Heart Rate (bpm)</label>
                      <input
                        type="number"
                        value={formData.heartRate}
                        onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
                        className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                fetchFitness();
              }}
              className="w-full mt-10 bg-orange-500 hover:bg-orange-400 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 shadow-lg"
            >
              Track My Fitness
            </button>
          </form>
        </div>
      </main>
      {/* Fitness Dashboard */}
      {showDashboard && (
        <div className="py-16 w-full bg-gradient-to-b from-yellow-300 to-orange-400">
          <div id="dashboard" className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Your Fitness Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Left Column - Main Stats */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Activity Score */}
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Activity Score</h3>
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-[#86C1FF]/20">
                          {fitnessScore}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#86C1FF]/20 mt-3">
                      <div
                        style={{ width: `${fitnessScore}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#86C1FF]"
                      ></div>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm">
                    Your fitness score indicates {fitnessScore < 50 ? 'room for improvement' : 'good progress'}
                  </p>
                </div>

                {/* Workout Stats */}
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Today's Activity</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white/80 text-sm">Steps</span>
                        <span className="text-white text-sm font-medium">{formData.steps || '0'}</span>
                      </div>
                      <div className="overflow-hidden h-1.5 rounded bg-[#86C1FF]/20">
                        <div className="bg-[#86C1FF] h-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white/80 text-sm">Calories</span>
                        <span className="text-white text-sm font-medium">{formData.caloriesBurned || '0'} kcal</span>
                      </div>
                      <div className="overflow-hidden h-1.5 rounded bg-[#86C1FF]/20">
                        <div className="bg-[#86C1FF] h-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white/80 text-sm">Heart Rate</span>
                        <span className="text-white text-sm font-medium">{formData.heartRate || '0'} bpm</span>
                      </div>
                      <div className="overflow-hidden h-1.5 rounded bg-[#F59E0B]/20">
                        <div className="bg-[#F59E0B] h-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Level */}
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Activity Level</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-[#86C1FF]">{Math.round(activityLevel)}%</span>
                    <span className="text-white/60">of daily goal</span>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#86C1FF]/20">
                    <div
                      style={{ width: `${activityLevel}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#86C1FF] transition-all duration-500"
                    ></div>
                  </div>
                </div>

                {/* Workout Intensity */}
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Workout Intensity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">{formData.workoutIntensity}</span>
                      <span className="text-[#86C1FF] font-medium">{formData.workoutDuration} min</span>
                    </div>
                    <p className="text-white/60 text-sm">
                      {formData.workoutIntensity === 'Moderate' 
                        ? 'Good pace! Consider increasing intensity for better results.' 
                        : 'Keep up the great work!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Tips and Insights */}
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Fitness Insights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center mr-3">
                        <span className="text-green-400">↑</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Progress Update</h4>
                        <p className="text-white/60 text-sm">Activity level increased by 15% this week</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#86C1FF]/20 flex items-center justify-center mr-3">
                        <span className="text-[#86C1FF]">i</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Personalized Tip</h4>
                        <p className="text-white/60 text-sm">
                          Based on your heart rate data, consider adding more cardio exercises
                        </p>
                      </div>
                    </div>
                    {showTip && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center mr-3">
                          <span className="text-purple-400">★</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Weekly Goal</h4>
                          <p className="text-white/60 text-sm">
                            You're on track to reach your weekly activity target
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FitnessTracker;