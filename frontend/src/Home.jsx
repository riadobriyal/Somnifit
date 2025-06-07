import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a237e] to-[#0d1b3e]">
      <nav className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#ffd700]">SomniFit</h1>
        <div className="flex gap-6">
          <button className="text-[#C0C0C0] hover:text-[#ffd700] transition-colors">Sign In</button>
          <button className="bg-[#ffd700] text-[#1a237e] px-4 py-2 rounded-lg hover:bg-[#C0C0C0] transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center gap-8">
          <h2 className="text-5xl font-bold text-[#C0C0C0] leading-tight">
            Transform Your Sleep,<br />
            <span className="text-[#ffd700]">Enhance Your Life</span>
          </h2>
          
          <p className="text-[#C0C0C0] max-w-2xl text-lg">
            Track, analyze, and improve your sleep patterns with advanced AI-powered insights. 
            Wake up refreshed and ready to conquer your day.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-[#ffd700] text-[#1a237e] px-8 py-3 rounded-lg hover:bg-[#C0C0C0] transition-colors font-semibold">
              Start Free Trial
            </button>
            <button className="border border-[#C0C0C0] text-[#C0C0C0] px-8 py-3 rounded-lg hover:border-[#ffd700] hover:text-[#ffd700] transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0d1b3e]/50 p-6 rounded-xl border border-[#C0C0C0]/20">
            <div className="text-[#ffd700] text-xl mb-4">Sleep Analytics</div>
            <p className="text-[#C0C0C0]">Advanced sleep tracking and detailed insights into your sleep patterns</p>
          </div>
          <div className="bg-[#0d1b3e]/50 p-6 rounded-xl border border-[#C0C0C0]/20">
            <div className="text-[#ffd700] text-xl mb-4">Smart Alarm</div>
            <p className="text-[#C0C0C0]">Wake up naturally during your lightest sleep phase</p>
          </div>
          <div className="bg-[#0d1b3e]/50 p-6 rounded-xl border border-[#C0C0C0]/20">
            <div className="text-[#ffd700] text-xl mb-4">Personalized Tips</div>
            <p className="text-[#C0C0C0]">Get customized recommendations to improve your sleep quality</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;