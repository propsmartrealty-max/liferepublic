const fs = require('fs');
let file = 'src/pages/Lifestyle.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix massive overlapping text sizes
content = content.replace(/text-7xl md:text-\[15rem\]/g, 'text-6xl md:text-[8rem]');
content = content.replace(/text-9xl md:text-\[10rem\]/g, 'text-5xl md:text-7xl lg:text-[5rem]');

// Also fix dark mode backgrounds. Lifestyle has `bg-[#020617]` and `text-white`
content = content.replace(/bg-\[#020617\]/g, 'bg-background');
content = content.replace(/text-white mb-48/g, 'text-secondary mb-24');
content = content.replace(/text-white\/30/g, 'text-text-muted');
content = content.replace(/text-white\/40/g, 'text-text-muted');
content = content.replace(/bg-white\/5/g, 'bg-surface');
content = content.replace(/border-white\/10/g, 'border-border-strong');

fs.writeFileSync(file, content);
