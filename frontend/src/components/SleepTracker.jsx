import React from 'react'
import { Link } from 'react-router-dom'
import {StarField} from './Home'

function SleepTracker() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-purple-700 to-[#191970]">
      {/* Top left logo */}
      <div className="p-6">
        <Link to="/" className="text-3xl font-bold text-white tracking-wide hover:text-purple-200 transition-colors">
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
          Track, analyze, and improve your sleep patterns with our AI-powered insights and personalized recommendations.
        </p>
        
        {/* Optional CTA button */}
        <button className="mt-12 px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-lg text-lg transition-colors">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default SleepTracker