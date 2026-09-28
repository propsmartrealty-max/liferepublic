const fs = require('fs');
let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Convert dark mode glass pill to light mode glass pill
content = content.replace(/bg-\[#1C1C1E\]\/70 backdrop-blur-\[40px\] border border-white\/\[0\.08\] shadow-\[0_8px_32px_rgba\(0,0,0,0\.5\)\]/g, 'bg-white/90 backdrop-blur-[40px] border border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.06)]');

// Navbar Links Text
content = content.replace(/text-white\/80/g, 'text-secondary/80');
content = content.replace(/text-white/g, 'text-secondary');
content = content.replace(/hover:text-white/g, 'hover:text-primary');

// Enquire Now Button
content = content.replace(/bg-white text-black px-8 py-3 font-semibold text-\[15px\] tracking-tight gap-2 shadow-\[0_4px_14px_rgba\(255,255,255,0\.25\)\]/g, 'bg-primary text-white px-8 py-3 font-semibold text-[15px] tracking-tight gap-2 shadow-[0_4px_14px_rgba(54,168,73,0.3)]');

fs.writeFileSync(file, content);
