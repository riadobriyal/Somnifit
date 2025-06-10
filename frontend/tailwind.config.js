/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'night-primary': '#0A1128',
        'night-secondary': '#1a237e',
        'night-accent': '#283593',
      },
      animation: {
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'float': 'float 45s linear infinite',
        'float-medium': 'float 35s linear infinite',
        'float-fast': 'float 25s linear infinite',
        'pulse-slow': 'pulse 8s ease-in-out infinite',
        'shooting-star': 'shooting-star 4s linear infinite',
        'moon-glow': 'moon-glow 10s ease-in-out infinite',
        'aurora': 'aurora 20s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { 
            opacity: 0.2,
            transform: 'scale(0.2)',
            filter: 'blur(1px)'
          },
          '50%': { 
            opacity: 0.8,
            transform: 'scale(1)',
            filter: 'blur(0px)'
          },
        },
        float: {
          '0%': { transform: 'translateX(100%) translateY(0px)' },
          '50%': { transform: 'translateX(-50%) translateY(30px)' },
          '100%': { transform: 'translateX(-200%) translateY(0px)' },
        },
        'shooting-star': {
          '0%': { 
            transform: 'translateX(0) translateY(0) rotate(-45deg)',
            opacity: 0.8
          },
          '100%': { 
            transform: 'translateX(-1000px) translateY(1000px) rotate(-45deg)',
            opacity: 0
          },
        },
        'moon-glow': {
          '0%, 100%': { 
            filter: 'drop-shadow(0 0 60px rgba(192, 192, 192, 0.4)) brightness(1)'
          },
          '50%': { 
            filter: 'drop-shadow(0 0 80px rgba(192, 192, 192, 0.6)) brightness(1.1)'
          },
        },
        'aurora': {
          '0%, 100%': { 
            opacity: 0.3,
            transform: 'translateY(0) skewY(0deg)'
          },
          '50%': { 
            opacity: 0.5,
            transform: 'translateY(-30px) skewY(-3deg)'
          },
        }
      },
      backdropFilter: {
        'glass': 'blur(20px) saturate(160%)',
        'night': 'brightness(0.8) contrast(1.2)',
      },
    },
  },
  plugins: [],
}