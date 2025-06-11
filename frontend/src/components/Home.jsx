import React from 'react';
import {useNavigate} from 'react-router-dom'

const Moon = () => {
  return (
    <div className="fixed top-8 right-12 pointer-events-none animate-moon-glow">
      {/* Main moon body */}
      <div 
        className="w-24 h-24 rounded-full opacity-90 relative"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #F5F5F5, #C0C0C0 40%, #808080 90%)',
          boxShadow: '0 0 60px rgba(192, 192, 192, 0.6), inset 0 0 40px rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Overlay circle to create crescent effect */}
        <div 
          className="absolute w-23 h-22 rounded-full"
          style={{
            background: '#393679',
            top: '0',
            left: '6px',
          }}
        />
      </div>
    </div>
  );
};

const StarField = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main stars */}
      {[...Array(80)].map((_, i) => {
        const size = Math.random() * 3 + 2;
        return (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              background: 'radial-gradient(circle at center, #fff 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              boxShadow: '0 0 8px #fff',
            }}
          />
        )
      })}
      {/* Bright golden stars */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`bright-${i}`}
          className="absolute animate-pulse-slow"
          style={{
            width: '4px',
            height: '4px',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            background: 'radial-gradient(circle at center, #ffd700 0%, rgba(255,215,0,0.3) 50%, transparent 100%)',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            boxShadow: '0 0 15px #ffd700',
          }}
        />
      ))}
    </div>
  );
};

const Clouds = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Large background clouds */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`bg-${i}`}
          className="absolute animate-float opacity-20"
          style={{
            width: `${Math.random() * 600 + 400}px`,
            height: `${Math.random() * 80 + 80}px`,
            top: `${Math.random() * 70}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 30}s`,
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(12px)',
          }}
        />
      ))}
      
      {/* Medium clouds with different speeds */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`med-${i}`}
          className="absolute animate-float-medium opacity-15"
          style={{
            width: `${Math.random() * 400 + 300}px`,
            height: `${Math.random() * 60 + 60}px`,
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(8px)',
          }}
        />
      ))}
      
      {/* Small foreground clouds */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`fg-${i}`}
          className="absolute animate-float-fast opacity-10"
          style={{
            width: `${Math.random() * 300 + 200}px`,
            height: `${Math.random() * 40 + 40}px`,
            top: `${Math.random() * 40}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(6px)',
          }}
        />
      ))}
    </div>
  );
};

const AuroraEffect = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-[70vh] animate-aurora"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(88, 28, 135, 0.2) 25%, rgba(37, 99, 235, 0.2) 50%, rgba(147, 51, 234, 0.1) 75%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        />
      </div>
    </div>
  );
};

const NightEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <AuroraEffect />
      {/* Shooting stars - raining from top right to bottom left */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`shooting-star-${i}`}
          className="absolute animate-shooting-star"
          style={{
            width: '3px',
            height: '120px',
            top: `${(Math.random() * 8) + (Math.random() * 6)}%`,
            right: `${(i * 12) + (Math.random() * 8)}%`,
            background: 'linear-gradient(135deg, transparent, #fff, #ffd700, transparent)',
            opacity: 0.8,
            animationDelay: `${i * 2 + (Math.random() * 3)}s`,
            filter: 'blur(0.5px)',
            boxShadow: '0 0 20px #ffd700',
            transform: 'rotate(45deg)',
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  );
};

const Home = () => {
  
  const nav = useNavigate()
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(/home-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'centre',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="fixed inset-0 z-10 bg-[#1a237e]/40"></div>

      {/* Content */}
      <div className="relative z-20">
        <StarField />
        <Moon />
        <Clouds />
        <NightEffects />

        <nav className="p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#ffd700]">SomniFit</h1>
        </nav>

        <main className="container mx-auto px-6 py-20">
          <div className="flex flex-col items-center text-center gap-8">
            <h2 className="text-5xl font-bold text-[#C0C0C0] leading-tight">
              Transform Your Sleep,<br />
              <span className="text-[#ffd700]">Enhance Your Life</span>
            </h2>
            
            <p className="text-[#C0C0C0] max-w-2xl text-lg">
              Track, analyze, and improve your sleep and fitness patterns with advanced AI-powered suggestions. 
              Wake up refreshed and ready to conquer your day.
            </p>

            <div className="flex gap-4 mt-8">
              <button className="bg-[#ffd700] text-[#1a237e] px-8 py-3 rounded-lg hover:bg-[#C0C0C0] transition-colors font-semibold" onClick={() => nav('sleep-tracker')}>
                Sleep Tracking
              </button>
              <button className="border border-[#C0C0C0] text-[#C0C0C0] px-8 py-3 rounded-lg hover:border-[#ffd700] hover:text-[#ffd700] transition-colors" onClick={() => nav('fitness-tracker')}>
                Fitness Tracker
              </button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0d1b3e]/50 p-6 rounded-xl border border-[#C0C0C0]/20">
              <div className="text-[#ffd700] text-xl mb-4">Sleep Analytics</div>
              <p className="text-[#C0C0C0]">Advanced sleep tracking and detailed insights into your sleep patterns</p>
            </div>
            <div className="bg-[#0d1b3e]/50 p-6 rounded-xl border border-[#C0C0C0]/20">
              <div className="text-[#ffd700] text-xl mb-4">Fitness Tracker</div>
              <p className="text-[#C0C0C0]">Get impactful AI specialized exercise plans with our BMI calculator</p>
            </div>
            <div className="bg-[#0d1b3e]/50 p-6 rounded-xl border border-[#C0C0C0]/20">
              <div className="text-[#ffd700] text-xl mb-4">Personalized Tips</div>
              <p className="text-[#C0C0C0]">Get customized recommendations to improve your sleep and fitness quality</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;