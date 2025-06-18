import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StarField } from "./Home";

function SleepTracker() {
  const [showTip, setShowTip] = useState(false);
  const [sleepHours, setSleepHours] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    bedTime: '',
    wakeupTime: '',
    sleepDuration: '',
    lightSleep: '',
    deepSleep: '',
    remSleep: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSleepHours((prev) => (prev < 8.5 ? prev + 0.1 : 0));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-purple-700 to-[#191970]">
        {/* Top left logo */}
        <div className="p-6">
          <Link
            to="/"
            className="text-3xl font-bold text-white tracking-wide hover:text-purple-200 transition-colors"
          >
            SomniFit
          </Link>
        </div>

        {/* Centered content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <StarField />
          <h1 className="text-6xl md:text-8xl font-extrabold text-white text-center mb-8 tracking-tight">
            Enhance your sleep
          </h1>
          <p className="text-xl md:text-2xl text-white/80 text-center max-w-2xl">
            Track, analyze, and improve your sleep patterns with our AI-powered
            insights and personalized recommendations.
          </p>

          {/* Optional CTA button */}
          <button className="mt-12 px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-lg text-lg transition-colors">
            Get Started
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full bg-gradient-to-b from-[#191970] to-purple-700 px-20">
        {/* Card 1 */}
        <div className="bg-blue-300 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-blue-400 transition-all">
          <img src="https://cdn.dribbble.com/userupload/23692188/file/original-1c34a9892c461bf6c0718f3a92254c71.gif" />
          <h3 className="text-2xl font-bold mb-4 p-4">Sleep Tracking</h3>
          <p className="text-black-100 px-4">
            Start understanding your sleep like never before. With our
            AI-powered sleep tracking, you don’t just see how long you slept —
            you learn how well you slept. Our system monitors your sleep cycles,
            patterns, and disturbances to give you a clear, personalized
            overview of your nightly rest. No more guessing whether you slept
            okay — you’ll know exactly what’s happening when you close your
            eyes.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-blue-300 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-blue-400 transition-all">
          <img src="https://i.pinimg.com/originals/15/f6/c7/15f6c787116f624ecc9684ca9fa24b9d.gif" />
          <h3 className="text-2xl font-bold text-black mb-4 p-4">
            Sleep Analytics
          </h3>
          <p className="text-black-100 px-4">
            What if your sleep could speak to you? With our machine
            learning-based analytics, it can. We dive deep into your sleep data
            to uncover trends, patterns, and habits that are silently affecting
            your rest. Whether it's that late-night screen time or irregular
            bedtime, our intelligent system connects the dots and helps you make
            sense of it all — so you can take back control of your sleep, one
            insight at a time.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-blue-300 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-blue-400 transition-all">
          <img src="https://cdn.dribbble.com/userupload/41738906/file/original-d614b031798e74ea55deb4ea492d1a05.gif" />
          <h3 className="text-2xl font-bold text-black mb-4 p-4">Smart Tips</h3>
          <p className="text-black-100 px-4">
            Not all sleep advice is created equal — and that’s why we don’t give
            generic tips. Our AI learns from your unique sleep behavior and
            gives you customized suggestions to help you sleep better every
            night. From bedtime routines to small lifestyle changes, our smart
            tips evolve with you. It’s like having your own personal sleep
            coach, always ready with guidance that actually works for you.
          </p>
        </div>
      </div>
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-[#C6E0FF]">
              Track Your Sleep
            </h2>
            <p className="text-lg text-[#C6E0FF]/80">
              Monitor your sleep patterns for better sleep quality
            </p>
          </div>

          <div className="relative">
            {/* Blue glow effect */}
            <div className="absolute inset-0 bg-[#4A90E2]/20 blur-xl rounded-3xl"></div>
            
            <form className="relative bg-[#4A90E2]/10 backdrop-blur-xl p-8 rounded-3xl border border-[#86C1FF]/30 shadow-lg shadow-[#4A90E2]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Info Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-black">Personal Details</h3>
                <div className="space-y-4">
                  {/* Age Input */}
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                  {/* Gender Buttons */}
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">Gender</label>
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
                <h3 className="text-2xl font-semibold text-black">Sleep Data</h3>
                <div className="space-y-4">
                  {/* Bed Time */}
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">Bed Time</label>
                    <input
                      type="time"
                      value={formData.bedTime}
                      onChange={(e) => setFormData({...formData, bedTime: e.target.value})}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                  {/* Wakeup Time */}
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">Wakeup Time</label>
                    <input
                      type="time"
                      value={formData.wakeupTime}
                      onChange={(e) => setFormData({...formData, wakeupTime: e.target.value})}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Sleep Duration Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-black">Sleep Duration</h3>
                <div className="space-y-4">
                  {/* Total Sleep */}
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">Total Sleep Duration (hours)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.sleepDuration}
                      onChange={(e) => setFormData({...formData, sleepDuration: e.target.value})}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                  {/* Light Sleep */}
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">Light Sleep (hours)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.lightSleep}
                      onChange={(e) => setFormData({...formData, lightSleep: e.target.value})}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Sleep Quality Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-black">Sleep Quality</h3>
                <div className="space-y-4">
                  {/* Deep Sleep */}
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">Deep Sleep (hours)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.deepSleep}
                      onChange={(e) => setFormData({...formData, deepSleep: e.target.value})}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                  {/* REM Sleep */}
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">REM Sleep (hours)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.remSleep}
                      onChange={(e) => setFormData({...formData, remSleep: e.target.value})}
                      className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-10 bg-gradient-to-r from-[#004E98] to-[#3A6EA5] text-white font-medium py-4 px-8 rounded-xl hover:from-[#003E78] hover:to-[#2A5E95] transition-all duration-200 shadow-lg"
            >
              Analyze Sleep Efficiency
            </button>
          </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default SleepTracker;
