import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StarField } from "./Home";

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
          <StarField />
          <h1 className="text-6xl md:text-8xl font-extrabold text-white text-center mb-8 tracking-tight">
            Enhance your fitness
          </h1>
          <p className="text-xl md:text-2xl text-white/80 text-center max-w-2xl">
            Track, analyze, and improve your fitness with our AI-powered insights and personalized recommendations.
          </p>
          <button 
            onClick={scrollToForm}
            className="mt-12 px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-lg text-lg transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full bg-gradient-to-b from-yellow-300 to-orange-400 px-6 md:px-20 py-16">
        {/* Card 1 */}
        <div className="group relative transform hover:-translate-y-2 transition-all duration-300 h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300 "></div>
          <div className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl"></div>
            <div className="relative h-full flex flex-col">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://cdn.dribbble.com/users/1162077/screenshots/4382010/media/b24709557db701ebffa4bd90d26c30c4.gif" 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                  alt="Fitness Tracking Animation"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-6">Activity Tracking</h3>
              <p className="text-white/90 text-lg flex-1">
                Track your daily activities, workouts, and progress. Our AI-powered system monitors your fitness metrics and provides real-time insights to help you achieve your goals.
              </p>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="group relative transform hover:-translate-y-2 transition-all duration-300 h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
          <div className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-600/10 rounded-2xl"></div>
            <div className="relative h-full flex flex-col">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://cdn.dribbble.com/users/846207/screenshots/5127755/media/0bffc974ad0745bbc4e88f6214e69b30.gif" 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                  alt="Fitness Analytics Animation"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-6">Smart Analytics</h3>
              <p className="text-white/90 text-lg flex-1">
                Get detailed insights into your workout performance, calorie burn, and progress over time. Our machine learning algorithms help you understand your fitness patterns and optimize your routine.
              </p>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="group relative transform hover:-translate-y-2 transition-all duration-300 h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
          <div className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl"></div>
            <div className="relative h-full flex flex-col">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://cdn.dribbble.com/users/1787323/screenshots/6604852/dribbbe_1.gif" 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                  alt="Workout Tips Animation"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-6">Personalized Tips</h3>
              <p className="text-white/90 text-lg flex-1">
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
          <form className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-[#C6E0FF]/20 shadow-xl">
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
                      {['Male', 'Female'].map((gender) => (
                        <button
                          key={gender}
                          type="button"
                          onClick={() => setFormData({...formData, gender})}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            formData.gender === gender
                              ? 'bg-[#3A6EA5] text-white shadow-lg shadow-[#3A6EA5]/30'
                              : 'bg-[#000B18]/30 text-[#C6E0FF] hover:bg-[#004E98]/40'
                          }`}
                        >
                          {gender}
                        </button>
                      ))}
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
                <h3 className="text-2xl font-semibold text-center text-white">Activity Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Activity Level */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Activity Level</label>
                      <select
                        value={formData.activityLevel}
                        onChange={(e) => setFormData({...formData, activityLevel: e.target.value})}
                        className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      >
                        <option value="Sedentary">Sedentary</option>
                        <option value="Light">Lightly Active</option>
                        <option value="Moderate">Moderately Active</option>
                        <option value="Very">Very Active</option>
                        <option value="Extra">Extra Active</option>
                      </select>
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
              className="w-full mt-10 bg-gradient-to-r from-[#004E98] to-[#3A6EA5] text-white font-medium py-4 px-8 rounded-xl hover:from-[#003E78] hover:to-[#2A5E95] transition-all duration-200 shadow-lg"
            >
              Analyze Fitness Metrics
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