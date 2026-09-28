const fs = require('fs');

let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace sharp/hard brutalist classes with Apple glass
content = content.replace(/border-2 border-border-strong/g, 'border border-white/[0.08]');
content = content.replace(/shadow-hard/g, 'shadow-[0_8px_32px_rgba(0,0,0,0.4)]');
content = content.replace(/rounded-none/g, 'rounded-[2rem]');
content = content.replace(/bg-surface/g, 'bg-[#1C1C1E]/60 backdrop-blur-[30px]');
content = content.replace(/text-primary/g, 'text-white');
content = content.replace(/text-secondary/g, 'text-white');
content = content.replace(/text-gray-600/g, 'text-white/60');
content = content.replace(/text-gray-500/g, 'text-white/50');
content = content.replace(/bg-gray-50/g, 'bg-white/5');

fs.writeFileSync(file, content);

let amenFile = 'src/components/sections/AmenitiesCarousel.tsx';
let amenContent = fs.readFileSync(amenFile, 'utf8');
amenContent = amenContent.replace(/bg-background/g, 'bg-transparent');
amenContent = amenContent.replace(/text-primary/g, 'text-white');
amenContent = amenContent.replace(/bg-surface/g, 'glass-card');
amenContent = amenContent.replace(/border-2 border-border-strong shadow-hard/g, 'glass-card');
amenContent = amenContent.replace(/rounded-none/g, 'rounded-[2rem]');
fs.writeFileSync(amenFile, amenContent);

