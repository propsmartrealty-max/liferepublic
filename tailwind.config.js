/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E5C07B', // Golden Accent
        secondary: '#FFFFFF', // White text
        accent: '#991B1B', // Dark Red for buttons
        background: '#0B0D14', // Deep dark blue/black
        surface: '#151822', // Slightly lighter dark for cards
        'text-main': '#F3F4F6',
        'text-muted': '#9CA3AF',
        'border-strong': 'rgba(255, 255, 255, 0.1)', // Subtle white borders
      },
      fontFamily: {
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'], // Elegant serif for headings
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
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'glass-hover': '0 12px 48px 0 rgba(229, 192, 123, 0.15)', // Golden glow
        'red-glow': '0 0 20px rgba(153, 27, 27, 0.5)',
      }
    },
  },
  plugins: [],
};
