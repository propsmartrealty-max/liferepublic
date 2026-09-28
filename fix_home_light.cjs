const fs = require('fs');
let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Switch Home.tsx fluid container to Light Mode
content = content.replace(/bg-\[#0A0A0A\]\/80 backdrop-blur-\[50px\] border-t border-white\/\[0\.05\] shadow-\[0_-20px_60px_rgba\(0,0,0,0\.6\)\]/g, 'bg-white/95 backdrop-blur-[50px] border-t border-gray-200 shadow-[0_-20px_60px_rgba(0,0,0,0.05)]');

// Reset the explicit dark mode texts I injected earlier
content = content.replace(/text-white\/60/g, 'text-text-muted');
content = content.replace(/text-white\/80/g, 'text-text-muted');
content = content.replace(/text-white\/50/g, 'text-text-muted');
content = content.replace(/text-white/g, 'text-secondary');

// But HeroSlider still needs white text over the images! Wait, Home.tsx doesn't contain HeroSlider's inner code, so it's fine.
fs.writeFileSync(file, content);

let heroFile = 'src/components/sections/HeroSlider.tsx';
let heroContent = fs.readFileSync(heroFile, 'utf8');
// In Hero, Explore Projects button should be primary green
heroContent = heroContent.replace(/bg-white text-black font-semibold text-\[17px\] tracking-tight hover:scale-105 border-none shadow-\[0_4px_24px_rgba\(255,255,255,0\.3\)\]/g, 'bg-primary text-white font-semibold text-[17px] tracking-tight hover:scale-105 border-none shadow-[0_4px_24px_rgba(54,168,73,0.4)]');
// Outline button should be orange or white
heroContent = heroContent.replace(/bg-\[#1C1C1E\]\/60 backdrop-blur-3xl border border-white\/10 text-white font-medium text-\[17px\] tracking-tight hover:bg-\[#2C2C2E\]/g, 'bg-white/20 backdrop-blur-3xl border border-white text-white font-medium text-[17px] tracking-tight hover:bg-white hover:text-primary');

fs.writeFileSync(heroFile, heroContent);
