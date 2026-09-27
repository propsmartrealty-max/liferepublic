const fs = require('fs');
const file = 'src/components/sections/HeroSlider.tsx';
let content = fs.readFileSync(file, 'utf8');

// Give it the stark architectural border look
content = content.replace(/rounded-full/g, 'rounded-none');
content = content.replace(/rounded-3xl/g, 'rounded-none');
content = content.replace(/rounded-2xl/g, 'rounded-none');
content = content.replace(/bg-black\/50/g, 'bg-black/60 border-4 border-white'); 
content = content.replace(/text-white\/90/g, 'text-white font-bold tracking-widest uppercase');

fs.writeFileSync(file, content);
