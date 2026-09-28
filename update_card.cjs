const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// The card currently has: className="relative overflow-hidden rounded-[24px] bg-black border border-white/10 ... hover:border-white/30"
// I will wrap it in rainbow-border-wrap and remove the hardcoded border classes

content = content.replace(
    /border border-white\/10 h-\[600px\] w-full flex flex-col justify-end transition-shadow duration-700 hover:border-white\/30 hover:glow-rainbow group/,
    'rainbow-border-wrap h-[600px] w-full flex flex-col justify-end transition-shadow duration-700 hover:glow-rainbow group'
);

fs.writeFileSync(file, content);
