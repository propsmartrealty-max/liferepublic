/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C5A059', // Champagne Gold
        'primary-dark': '#A38045',
        secondary: '#FFFFFF', // Pure White
        background: '#0A0A0A', // Obsidian Black
        surface: '#141414', // Charcoal
        'surface-light': '#1F1F1F',
        'text-main': '#E5E5E5',
        'text-muted': '#888888',
        'border-strong': '#ffffff1a',
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
