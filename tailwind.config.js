/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#36A849', // Brand Green
        secondary: '#1A1A1A', // Deep Charcoal (from logo text)
        accent: '#F07C27', // Brand Orange (from bird)
        background: '#FFFFFF', // Clean White
        surface: '#F8F9FA', // Off-white for cards
        'text-main': '#1A1A1A',
        'text-muted': '#666666',
        'border-strong': '#E5E7EB', // Light border
      },
      fontFamily: {
        sans: ['"Outfit"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-up': 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glass-hover': '0 12px 48px 0 rgba(54, 168, 73, 0.15)', // Light green shadow
      }
    },
  },
  plugins: [],
};
