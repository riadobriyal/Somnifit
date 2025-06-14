import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FitnessTracker() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    exerciseMinutes: '',
    heartRate: '',
    stressLevel: '',
    caloriesBurned: ''
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#D44C2E] via-[#FF9F45] to-[#F7E987]">
      {/* Ambient glow effect - butter yellow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(247,233,135,0.2),transparent_80%)]" />

      <div className="relative z-20">
        <nav className="p-6 flex justify-between items-center backdrop-blur-sm border-b border-[#F7E987]/10">
          <h1 
            onClick={() => navigate('/')} 
            className="text-3xl font-bold bg-gradient-to-r from-[#F7E987] to-white bg-clip-text text-transparent cursor-pointer"
          >
            SomniFit
          </h1>
        </nav>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-[#F7E987]">
                Track Your Fitness
              </h2>
              <p className="text-lg text-white/90">
                Monitor your exercise patterns for better sleep quality
              </p>
            </div>

            <form className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-[#F7E987]/20 shadow-xl">
              {/* Update form elements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-[#FFE4B5]">Personal Details</h3>
                  <div className="space-y-4">
                    {/* Age Input */}
                    <div>
                      <label className="block text-[#F5DEB3] text-sm font-medium mb-2">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                    {/* Gender Buttons */}
                    <div>
                      <label className="block text-[#F5DEB3] text-sm font-medium mb-3">Gender</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Male', 'Female'].map((gender) => (
                          <button
                            key={gender}
                            type="button"
                            onClick={() => setFormData({...formData, gender})}
                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                              formData.gender === gender
                                ? 'bg-[#FF9F45] text-white shadow-lg shadow-[#FF9F45]/30'
                                : 'bg-[#D44C2E]/10 text-[#F7E987] hover:bg-[#D44C2E]/20'
                            }`}
                          >
                            {gender}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exercise Metrics */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-[#FFE4B5]">Exercise Data</h3>
                  <div className="space-y-4">
                    {/* Exercise Duration */}
                    <div>
                      <label className="block text-[#F5DEB3] text-sm font-medium mb-2">Exercise Duration (minutes)</label>
                      <input
                        type="number"
                        value={formData.exerciseMinutes}
                        onChange={(e) => setFormData({...formData, exerciseMinutes: e.target.value})}
                        className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                    {/* Heart Rate */}
                    <div>
                      <label className="block text-[#F5DEB3] text-sm font-medium mb-2">Average Heart Rate (BPM)</label>
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

              <button
                type="submit"
                className="w-full mt-10 bg-gradient-to-r from-[#FF9F45] to-[#D44C2E] text-white font-medium py-4 px-8 rounded-xl hover:from-[#FF9838] hover:to-[#C73F20] transition-all duration-200 shadow-lg"
              >
                Analyze Exercise Impact
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FitnessTracker;