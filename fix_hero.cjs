const fs = require('fs');

let file = 'src/components/sections/HeroSlider.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix subtitle
content = content.replace(/font-bold tracking-widest uppercase font-light/g, "text-white/90 font-medium tracking-tight");

// Fix Kolte Patil span
content = content.replace(/tracking-widest uppercase/g, "tracking-tight");

// Fix buttons (remove rounded-none, let them inherit Button.tsx rounded-2xl)
content = content.replace(/rounded-none/g, "");

fs.writeFileSync(file, content);
