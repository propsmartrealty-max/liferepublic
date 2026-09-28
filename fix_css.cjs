const fs = require('fs');
let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

// Replace the static background with a highly animated color contrast background
const animatedBackground = `
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
`;

content = content.replace(/body\s*\{[^}]*\}\s*[^}]*\}/s, animatedBackground); // This might break if regex is wrong. Let's do it carefully.
fs.writeFileSync(file, content);
