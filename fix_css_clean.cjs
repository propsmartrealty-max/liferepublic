const fs = require('fs');
let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

const newTop = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
  }
  
  body {
    @apply text-text-main font-sans overflow-x-hidden;
    background: linear-gradient(-45deg, #020617, #0f172a, #062615, #1a0f05);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
    background-attachment: fixed;
  }

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif tracking-tight text-white;
  }
}

@layer components {`;

content = content.replace(/@import.*?@layer components \{/s, newTop);

fs.writeFileSync(file, content);
