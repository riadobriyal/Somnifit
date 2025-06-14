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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full bg-gradient-to-b from-[#191970] to-purple-700 px-20">
        {/* Card 1 */}
        <div className="bg-blue-300 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-blue-400 transition-all">
            <img src='https://cdn.dribbble.com/userupload/23692188/file/original-1c34a9892c461bf6c0718f3a92254c71.gif'/>
            <h3 className="text-2xl font-bold mb-4 p-4">Sleep Tracking</h3>
            <p className="text-black-100 px-4">
              Start understanding your sleep like never before. With our AI-powered sleep tracking, you don’t just see how long you slept — you learn how well you slept. Our system monitors your sleep cycles, patterns, and disturbances to give you a clear, personalized overview of your nightly rest. No more guessing whether you slept okay — you’ll know exactly what’s happening when you close your eyes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-blue-300 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-blue-400 transition-all">
            <img src='https://i.pinimg.com/originals/15/f6/c7/15f6c787116f624ecc9684ca9fa24b9d.gif'/>
            <h3 className="text-2xl font-bold text-black mb-4 p-4">Sleep Analytics</h3>
            <p className="text-black-100 px-4">
              What if your sleep could speak to you? With our machine learning-based analytics, it can. We dive deep into your sleep data to uncover trends, patterns, and habits that are silently affecting your rest. Whether it's that late-night screen time or irregular bedtime, our intelligent system connects the dots and helps you make sense of it all — so you can take back control of your sleep, one insight at a time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-blue-300 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-blue-400 transition-all">
            <img src='https://cdn.dribbble.com/userupload/41738906/file/original-d614b031798e74ea55deb4ea492d1a05.gif'/>
            <h3 className="text-2xl font-bold text-black mb-4 p-4">Smart Tips</h3>
            <p className="text-black-100 px-4">
              Not all sleep advice is created equal — and that’s why we don’t give generic tips. Our AI learns from your unique sleep behavior and gives you customized suggestions to help you sleep better every night. From bedtime routines to small lifestyle changes, our smart tips evolve with you. It’s like having your own personal sleep coach, always ready with guidance that actually works for you.
            </p>
          </div>
        </div>
    </>
  )
}

export default SleepTracker;
