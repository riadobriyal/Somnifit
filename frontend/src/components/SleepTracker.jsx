import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StarField } from "./Home";

function SleepTracker() {
  const [showTip, setShowTip] = useState(false);
  const [sleepEfficiency, setSleepEfficiency] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    bedTime: '',
    wakeupTime: '',
    sleepDuration: '',
    lightSleep: '',
    deepSleep: '',
    remSleep: '',
    unableToSleep: ''
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSleepHours((prev) => (prev < 8.5 ? prev + 0.1 : 0));
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, []);

  const fetchSleep = async () => {
    try {
      setSleepEfficiency(0)
      const bedTimeHours = formData.bedTime ? parseInt(formData.bedTime.split(':')[0]) : 0;
      const wakeupTimeHours = formData.wakeupTime ? parseInt(formData.wakeupTime.split(':')[0]) : 0;
      
      const res = await fetch('http://localhost:5000/sleep_predictor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          age: formData.age,
          gender: formData.gender,
          'sleep_duration': formData.sleepDuration,
          'bed_time_hours': bedTimeHours,
          'wakeup_time_hours': wakeupTimeHours,
          'deep_sleep': formData.deepSleep,
          'awake_others_duration': formData.unableToSleep
        })
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json()
      data.sleep_efficiency = Math.max(data.sleep_efficiency,0)
      data.sleep_efficiency = Math.min(data.sleep_efficiency,100)
      setSleepEfficiency(data.sleep_efficiency)
      setShowDashboard(true)
      
      setTimeout(() => {
        const formElement = document.getElementById('dashboard');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
      console.log('Sleep efficiency:', data.sleep_efficiency)
    } catch (error) {
      console.error('Error fetching sleep data:', error);
    }
  }

  const scrollToForm = () => {
    const formElement = document.getElementById('sleep-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-purple-700 to-[#191970]">
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
            Enhance your sleep
          </h1>
          <p className="text-xl md:text-2xl text-white/80 text-center max-w-2xl">
            Track, analyze, and improve your sleep patterns with our AI-powered
            insights and personalized recommendations.
          </p>

          <button 
            onClick={scrollToForm}
            className="mt-12 px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-lg text-lg transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full bg-gradient-to-b from-[#191970] to-purple-700 px-6 md:px-20 py-16">
        {/* Card 1 */}
        <div className="group relative transform hover:-translate-y-2 transition-all duration-300 h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300 "></div>
          <div className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl"></div>
            <div className="relative h-full flex flex-col">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://cdn.dribbble.com/userupload/23692188/file/original-1c34a9892c461bf6c0718f3a92254c71.gif" 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                  alt="Sleep Tracking Animation"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-6">Sleep Tracking</h3>
              <p className="text-white/90 text-lg flex-1">
                Start understanding your sleep like never before. With our
                AI-powered sleep tracking, you don't just see how long you slept —
                you learn how well you slept. Our system monitors your sleep cycles,
                patterns, and disturbances to give you a clear, personalized
                overview of your nightly rest.
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
                  src="https://i.pinimg.com/originals/15/f6/c7/15f6c787116f624ecc9684ca9fa24b9d.gif" 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                  alt="Sleep Analytics Animation"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-6">Sleep Analytics</h3>
              <p className="text-white/90 text-lg flex-1">
                What if your sleep could speak to you? Our machine learning-based
                analytics dive deep into your sleep data to uncover trends and patterns.
                Whether it's late-night screen time or irregular bedtime, our intelligent
                system helps you make sense of it all.
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
                  src="https://cdn.dribbble.com/userupload/41738906/file/original-d614b031798e74ea55deb4ea492d1a05.gif" 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                  alt="Smart Tips Animation"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-6">Smart Tips</h3>
              <p className="text-white/90 text-lg flex-1">
                Not all sleep advice is created equal. Our AI learns from your unique
                sleep behavior and gives you customized suggestions. From bedtime routines
                to lifestyle changes, it's like having your own personal sleep coach,
                always ready with guidance that works for you.
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto py-16 w-full bg-gradient-to-b from-purple-700 to-[#191970]">
        <div id="sleep-form" className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-[#C6E0FF]">
              Track Your Sleep
            </h2>
            <p className="text-lg text-[#C6E0FF]/80">
              Monitor your sleep patterns for better sleep quality
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

              {/* Sleep Metrics Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">Sleep Data</h3>
                <div className="space-y-4">
                  {/* Bed Time */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Bed Time</label>
                    <input
                      type="time"
                      value={formData.bedTime}
                      onChange={(e) => {
                        const newBedTime = e.target.value;
                        setFormData((prev) => {
                          const updated = { ...prev, bedTime: newBedTime };
                          // Auto-calculate sleep duration if both times are present
                          if (updated.bedTime && updated.wakeupTime) {
                            const [bedH, bedM] = updated.bedTime.split(":").map(Number);
                            const [wakeH, wakeM] = updated.wakeupTime.split(":").map(Number);
                            let diff = (wakeH * 60 + wakeM) - (bedH * 60 + bedM);
                            if (diff <= 0) diff += 24 * 60;
                            updated.sleepDuration = (diff / 60).toFixed(2);
                          }
                          return updated;
                        });
                      }}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                  {/* Wakeup Time */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Wakeup Time</label>
                    <input
                      type="time"
                      value={formData.wakeupTime}
                      onChange={(e) => {
                        const newWakeupTime = e.target.value;
                        setFormData((prev) => {
                          const updated = { ...prev, wakeupTime: newWakeupTime };
                          // Auto-calculate sleep duration if both times are present
                          if (updated.bedTime && updated.wakeupTime) {
                            const [bedH, bedM] = updated.bedTime.split(":").map(Number);
                            const [wakeH, wakeM] = updated.wakeupTime.split(":").map(Number);
                            let diff = (wakeH * 60 + wakeM) - (bedH * 60 + bedM);
                            if (diff <= 0) diff += 24 * 60;
                            updated.sleepDuration = (diff / 60).toFixed(2);
                          }
                          return updated;
                        });
                      }}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
              {/* Sleep Quality Section */}
              <div className="space-y-6 md:col-span-2">
                <h3 className="text-2xl font-semibold text-center text-white">Sleep Quality</h3>
                <div className="space-y-4">
                  <div className="max-w-md mx-auto">
                    <label className="block text-white text-sm font-medium mb-2">Total Sleep Duration (hours)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.sleepDuration}
                      onChange={(e) => setFormData({...formData, sleepDuration: e.target.value})}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      readOnly={formData.bedTime && formData.wakeupTime}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {/* Deep Sleep */}
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Deep Sleep (hours)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.deepSleep}
                          onChange={(e) => setFormData({...formData, deepSleep: e.target.value})}
                          className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                        />
                      </div>
                      {/* Light Sleep */}
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Light Sleep (hours)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.lightSleep}
                          onChange={(e) => setFormData({...formData, lightSleep: e.target.value})}
                          className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {/* REM Sleep */}
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">REM Sleep (hours)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.remSleep}
                          onChange={(e) => setFormData({...formData, remSleep: e.target.value})}
                          className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                        />
                      </div>
                      {/* Time Unable to Sleep/Others */}
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Time Unable to Sleep/Others (hours)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.unableToSleep}
                          onChange={(e) => setFormData({...formData, unableToSleep: e.target.value})}
                          className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                fetchSleep();
              }}
              className="w-full mt-10 bg-gradient-to-r from-[#004E98] to-[#3A6EA5] text-white font-medium py-4 px-8 rounded-xl hover:from-[#003E78] hover:to-[#2A5E95] transition-all duration-200 shadow-lg"
            >
              Analyze Sleep Efficiency
            </button>
          </form>
        </div>
      </main>

      {/* Sleep Dashboard */}
      {showDashboard && (
        <div className="py-16 w-full bg-gradient-to-b from-[#191970] to-purple-700">
          <div id="dashboard" className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Sleep Dashboard</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Sleep Efficiency Meter */}
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30 flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Sleep Efficiency</h3>
                <div className="flex-1 flex flex-col justify-center items-center">
                  <div className="relative w-32 h-16 mx-auto mb-4">
                    <svg className="w-32 h-16" viewBox="0 0 120 60">
                      <path
                        d="M 10 50 A 50 50 0 0 1 110 50"
                        stroke="#374151"
                        strokeWidth="8"
                        fill="none"
                      />
                      <path
                        d="M 10 50 A 50 50 0 0 1 110 50"
                        stroke="#86C1FF"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(sleepEfficiency / 100) * 157} 157`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-end justify-center pb-2">
                      <span className="text-2xl font-bold text-[#86C1FF]">{Math.round(sleepEfficiency)}%</span>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm text-center">AI-calculated efficiency</p>
                </div>
              </div>

              {/* Bed Time Clock */}
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30 flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Bed Time</h3>
                <div className="flex-1 flex flex-col justify-center items-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="35" stroke="#374151" strokeWidth="2" fill="none"/>
                      {/* Hour markers */}
                      {[...Array(12)].map((_, i) => (
                        <line
                          key={i}
                          x1="40"
                          y1="8"
                          x2="40"
                          y2="12"
                          stroke="#86C1FF"
                          strokeWidth="1"
                          transform={`rotate(${i * 30 + 90} 40 40)`}
                        />
                      ))}
                      {/* Hour hand */}
                      <line
                        x1="40"
                        y1="40"
                        x2="40"
                        y2="25"
                        stroke="#86C1FF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        transform={`rotate(${((parseInt(formData.bedTime?.split(':')[0] || 0) % 12) * 30)} 40 40)`}
                      />
                      {/* Minute hand */}
                      <line
                        x1="40"
                        y1="40"
                        x2="40"
                        y2="15"
                        stroke="#86C1FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        transform={`rotate(${(parseInt(formData.bedTime?.split(':')[1] || 0) * 6)} 40 40)`}
                      />
                      <circle cx="40" cy="40" r="2" fill="#86C1FF"/>
                    </svg>
                  </div>
                  <p className="text-white text-center font-medium">{formData.bedTime || '--:--'}</p>
                </div>
              </div>

              {/* Wake Time Clock */}
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30 flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Wake Time</h3>
                <div className="flex-1 flex flex-col justify-center items-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="35" stroke="#374151" strokeWidth="2" fill="none"/>
                      {/* Hour markers */}
                      {[...Array(12)].map((_, i) => (
                        <line
                          key={i}
                          x1="40"
                          y1="8"
                          x2="40"
                          y2="12"
                          stroke="#F59E0B"
                          strokeWidth="1"
                          transform={`rotate(${i * 30 + 90} 40 40)`}
                        />
                      ))}
                      {/* Hour hand */}
                      <line
                        x1="40"
                        y1="40"
                        x2="40"
                        y2="25"
                        stroke="#F59E0B"
                        strokeWidth="3"
                        strokeLinecap="round"
                        transform={`rotate(${((parseInt(formData.wakeupTime?.split(':')[0] || 0) % 12) * 30)} 40 40)`}
                      />
                      {/* Minute hand */}
                      <line
                        x1="40"
                        y1="40"
                        x2="40"
                        y2="15"
                        stroke="#F59E0B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        transform={`rotate(${(parseInt(formData.wakeupTime?.split(':')[1] || 0) * 6)} 40 40)`}
                      />
                      <circle cx="40" cy="40" r="2" fill="#F59E0B"/>
                    </svg>
                  </div>
                  <p className="text-white text-center font-medium">{formData.wakeupTime || '--:--'}</p>
                </div>
              </div>

              {/* Sleep Breakdown Meter */}
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30 flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Sleep Breakdown</h3>
                <div className="flex-1 flex flex-col justify-center items-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      {/* Background circle */}
                      <circle cx="60" cy="60" r="50" stroke="#374151" strokeWidth="12" fill="none"/>
                      
                      {(() => {
                        const total = parseFloat(formData.sleepDuration || 0);
                        const deep = parseFloat(formData.deepSleep || 0);
                        const light = parseFloat(formData.lightSleep || 0);
                        const rem = parseFloat(formData.remSleep || 0);
                        const awake = parseFloat(formData.unableToSleep || 0);
                        
                        const circumference = 2 * Math.PI * 50;
                        let currentOffset = 0;
                        
                        return (
                          <>
                            {/* Deep Sleep */}
                            {deep > 0 && (
                              <circle
                                cx="60"
                                cy="60"
                                r="50"
                                stroke="#1E40AF"
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray={`${(deep / total) * circumference} ${circumference}`}
                                strokeDashoffset={-currentOffset}
                                strokeLinecap="round"
                              />
                            )}
                            
                            {/* Light Sleep */}
                            {light > 0 && (() => {
                              currentOffset += (deep / total) * circumference;
                              return (
                                <circle
                                  cx="60"
                                  cy="60"
                                  r="50"
                                  stroke="#60A5FA"
                                  strokeWidth="12"
                                  fill="none"
                                  strokeDasharray={`${(light / total) * circumference} ${circumference}`}
                                  strokeDashoffset={-currentOffset}
                                  strokeLinecap="round"
                                />
                              );
                            })()}
                            
                            {/* REM Sleep */}
                            {rem > 0 && (() => {
                              currentOffset += (light / total) * circumference;
                              return (
                                <circle
                                  cx="60"
                                  cy="60"
                                  r="50"
                                  stroke="#A855F7"
                                  strokeWidth="12"
                                  fill="none"
                                  strokeDasharray={`${(rem / total) * circumference} ${circumference}`}
                                  strokeDashoffset={-currentOffset}
                                  strokeLinecap="round"
                                />
                              );
                            })()}
                            
                            {/* Awake Time */}
                            {awake > 0 && (() => {
                              currentOffset += (rem / total) * circumference;
                              return (
                                <circle
                                  cx="60"
                                  cy="60"
                                  r="50"
                                  stroke="#EF4444"
                                  strokeWidth="12"
                                  fill="none"
                                  strokeDasharray={`${(awake / total) * circumference} ${circumference}`}
                                  strokeDashoffset={-currentOffset}
                                  strokeLinecap="round"
                                />
                              );
                            })()}
                          </>
                        );
                      })()}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-[#86C1FF]">{formData.sleepDuration || '0'}h</span>
                      <span className="text-xs text-white/60">Total</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-xs">
                      <div className="w-2 h-2 bg-blue-800 rounded-full mr-2"></div>
                      <span className="text-white/80">Deep: {formData.deepSleep || '0'}h</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span className="text-white/80">Light: {formData.lightSleep || '0'}h</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                      <span className="text-white/80">REM: {formData.remSleep || '0'}h</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                      <span className="text-white/80">Awake: {formData.unableToSleep || '0'}h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sleep Phases Chart */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30">
                <h3 className="text-xl font-semibold text-white mb-4">Weekly Sleep Pattern</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-[#4A90E2] to-[#86C1FF] rounded-t-lg"
                        style={{ 
                          height: `${Math.random() * 40 + 40}%`,
                          opacity: i === 6 ? '1' : '0.7'
                        }}
                      ></div>
                      <span className="text-white/60 text-sm mt-2">{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30">
                <h3 className="text-xl font-semibold text-white mb-4">Sleep Phases Distribution</h3>
                <div className="relative h-64">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border-8 border-[#4A90E2] relative">
                      <div className="absolute inset-0 border-8 border-[#86C1FF] rounded-full" 
                           style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 0, 50% 0)' }}></div>
                      <div className="absolute inset-0 border-8 border-purple-400 rounded-full" 
                           style={{ clipPath: 'polygon(50% 50%, 50% 0, 0 0, 0 50%)' }}></div>
                    </div>
                    <div className="absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2 space-y-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#4A90E2] rounded-full mr-2"></div>
                        <span className="text-white text-sm">Deep Sleep (30%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#86C1FF] rounded-full mr-2"></div>
                        <span className="text-white text-sm">Light Sleep (45%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
                        <span className="text-white text-sm">REM Sleep (25%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Sleep Insights */}
            <div className="mt-12 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30">
              <h3 className="text-xl font-semibold text-white mb-4">Sleep Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center mr-3">
                    <span className="text-green-400">↑</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Improved Deep Sleep</h4>
                    <p className="text-white/60 text-sm">Your deep sleep has increased by 12% this week</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3">
                    <span className="text-yellow-400">!</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Bedtime Suggestion</h4>
                    <p className="text-white/60 text-sm">Try going to bed 30 minutes earlier for optimal rest</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SleepTracker;
