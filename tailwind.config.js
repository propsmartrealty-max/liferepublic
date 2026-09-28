/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E5C07B', // Muted Gold
        'primary-light': '#FCEBB6',
        background: '#030508', // Deep space blue/black
        surface: 'rgba(255, 255, 255, 0.02)', // Ultra sheer glass
        'border-glass': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'], // Very round, fluid, thin
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'blob': 'blob 15s infinite alternate',
        'float': 'float 8s ease-in-out infinite',
        'flow': 'flow 20s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        flow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
};
