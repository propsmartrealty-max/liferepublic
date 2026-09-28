/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8', // Google Blue
        'primary-hover': '#1557b0',
        background: '#FFFFFF', // Pure White
        surface: '#F8F9FA', // Google Light Gray
        'surface-variant': '#F1F3F4',
        'text-main': '#202124', // Google Dark Text
        'text-muted': '#5F6368', // Google Gray Text
        border: '#DADCE0', // Google Border
      },
      fontFamily: {
        sans: ['"Google Sans Flex"', '"Google Sans"', 'sans-serif'],
        symbols: ['"Google Symbols"', 'sans-serif'],
      },
      boxShadow: {
        'google': '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
        'google-hover': '0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15)',
      }
    },
  },
  plugins: [],
};
