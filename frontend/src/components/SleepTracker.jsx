import React from "react";
import { Link } from "react-router-dom";
import { StarField } from "./Home";
import { useState, useEffect } from "react";

function SleepTracker() {
  const [showTip, setShowTip] = useState(false);
  const [sleepHours, setSleepHours] = useState(0);
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full bg-gradient-to-b from-[#191970] to-[#191970]">
        {/* Card 1 */}
        <div className="bg-white backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all">
          {/* <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-6xl">🌙</span>
            </div> */}
          <img src="https://cdn.dribbble.com/userupload/23692188/file/original-1c34a9892c461bf6c0718f3a92254c71.gif" />
          <h3 className="text-2xl font-bold text-black mb-4">Sleep Tracking</h3>
          <p className="text-black-100">
            Monitor your sleep patterns, duration, and quality with advanced
            analytics to understand your rest better.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all">
          <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-6 flex items-center justify-center">
            <span className="text-6xl">📊</span>
          </div>
          <h3 className="text-2xl font-bold text-black mb-4">
            Sleep Analytics
          </h3>
          <p className="text-black-100">
            Get detailed insights and trends about your sleep habits with
            AI-powered analysis and recommendations.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all">
          <div className="w-full h-48 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg mb-6 flex items-center justify-center">
            <span className="text-6xl">💡</span>
          </div>
          <h3 className="text-2xl font-bold text-black mb-4">Smart Tips</h3>
          <p className="text-black-100">
            Receive personalized recommendations and tips to improve your sleep
            quality based on your unique patterns.Receive personalized
            recommendations and tips to improve your sleep quality based on your
            unique patterns.Receive personalized recommendations and tips to
            improve your sleep quality based on your unique patterns.Receive
            personalized recommendations and tips to improve your sleep quality
            based on your unique patterns.Receive personalized recommendations
            and tips to improve your sleep quality based on your unique
            patterns.Receive personalized recommendations and tips to improve
            your sleep quality based on your unique patterns.Receive
            personalized recommendations and tips to improve your sleep quality
            based on your unique patterns.
          </p>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
      >
        <span className="text-2xl cursor-pointer">💡</span>
        {showTip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-black/80 text-white text-sm rounded whitespace-nowrap">
            Tip: Keep your room at 65-68°F for optimal sleep!
          </div>
        )}
      </div>
    </>
  );
}

export default SleepTracker;
