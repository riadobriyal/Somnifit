
import React from 'react';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a237e] via-[#152054] to-[#0d1b3e]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0d1b3e]/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#ffd700]">SomniFit</h1>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-[#C0C0C0] hover:text-[#ffd700] transition-all">Features</a>
            <a href="#stats" className="text-[#C0C0C0] hover:text-[#ffd700] transition-all">Stats</a>
            <button className="bg-[#ffd700] text-[#1a237e] px-6 py-2 rounded-full hover:bg-white transition-all">
              View Sleep Report
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Good Evening, <span className="text-[#ffd700]">Alex</span> 👋
            </h2>
            <div className="bg-[#ffffff0d] backdrop-blur-lg rounded-2xl p-6 mb-8">
              <p className="text-[#C0C0C0] text-lg">Your sleep score last night</p>
              <div className="flex items-end gap-4">
                <span className="text-6xl font-bold text-[#ffd700]">85</span>
                <span className="text-green-400 mb-2">+5 from average</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-[#ffd700]/20 to-transparent rounded-full animate-pulse-slow"></div>
            <div className="bg-[#ffffff0d] backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-[#ffd700] mb-4">Tonight's Sleep Forecast</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#ffd700]/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌙</span>
                </div>
                <div>
                  <p className="text-white font-medium">Optimal Bedtime</p>
                  <p className="text-[#C0C0C0]">10:30 PM</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {['Temperature', 'Humidity', 'Noise'].map((item, i) => (
                  <div key={i} className="bg-[#ffffff0d] rounded-xl p-4">
                    <p className="text-[#C0C0C0] text-sm mb-2">{item}</p>
                    <p className="text-white font-medium">Optimal</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sleep Insights */}
      <section className="py-20 px-6 bg-[#0d1b3e]/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Your Sleep Journey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Deep Sleep', value: '2h 15m', icon: '😴' },
              { title: 'Sleep Efficiency', value: '92%', icon: '📈' },
              { title: 'Sleep Debt', value: '-30m', icon: '⚖️' }
            ].map((stat, i) => (
              <div key={i} className="bg-[#ffffff0d] backdrop-blur-lg rounded-2xl p-6 hover:transform hover:scale-105 transition-all">
                <div className="text-3xl mb-4">{stat.icon}</div>
                <h3 className="text-[#ffd700] text-xl mb-2">{stat.title}</h3>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;