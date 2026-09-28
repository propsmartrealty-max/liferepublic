/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC', // Apple Blue
        background: '#F5F5F7', // Apple Light Gray background
        surface: '#FFFFFF', // Pure White for cards
        'text-main': '#1D1D1F', // Apple Dark Text
        'text-muted': '#86868B', // Apple Gray Text
        'border-strong': '#D2D2D7', // Apple Border
      },
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04)',
        'apple-hover': '0 10px 40px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
      }
    },
  },
  plugins: [],
};
