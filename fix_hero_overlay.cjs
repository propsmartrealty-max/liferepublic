const fs = require('fs');
let file = 'src/components/sections/HeroSlider.tsx';
let content = fs.readFileSync(file, 'utf8');

// Darker overlay for better contrast
content = content.replace(/bg-black\/40/g, 'bg-black/60');
// Add glassmorphic backdrop to the content box for even better contrast
content = content.replace(/className="max-w-4xl mx-auto"/g, 'className="max-w-5xl mx-auto bg-black/30 backdrop-blur-md p-10 sm:p-16 rounded-3xl border border-white/10 shadow-2xl"');

fs.writeFileSync(file, content);
