const fs = require('fs');
let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace standard white hover with rainbow hover on buttons
content = content.replace(
    /hover:bg-white hover:text-black/g,
    'bg-rainbow-hover transition-all duration-500'
);

// Make "Life Republic." text a rainbow gradient
content = content.replace(
    /text="Life Republic\." \n                        className="text-6xl md:text-8xl font-sans font-medium text-white tracking-tight mb-6 justify-center"/,
    'text="Life Republic." \n                        className="text-6xl md:text-8xl font-sans font-bold text-transparent bg-clip-text bg-rainbow tracking-tight mb-6 justify-center"'
);

// Slide progress tracker - make the active line rainbow
content = content.replace(
    /className="w-full bg-white rounded-full transition-all duration-300"/g,
    'className="w-full bg-rainbow rounded-full transition-all duration-300"'
);

fs.writeFileSync(file, content);
