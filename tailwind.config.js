/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF', // High contrast white text
        secondary: '#0F172A', // Deep slate background
        accent: '#36A849', // Brand Green
        'accent-orange': '#F07C27', // Kolte Patil Orange
        background: '#020617', // Very dark background
        surface: 'rgba(255, 255, 255, 0.05)', // Glass surface
        'text-main': '#F8FAFC',
        'text-muted': '#94A3B8',
        'border-strong': 'rgba(255, 255, 255, 0.15)', // Glass border
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-up': 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 48px 0 rgba(54, 168, 73, 0.2)', // Green glow on hover
      }
    },
  },
  plugins: [],
};
