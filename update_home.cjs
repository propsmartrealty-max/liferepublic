const fs = require('fs');
let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add rainbow-aura to the main KineticText
content = content.replace(
    /className="text-6xl md:text-8xl font-sans font-bold text-white tracking-tight mb-6 justify-center"/,
    'className="text-6xl md:text-8xl font-sans font-bold text-white tracking-tight mb-6 justify-center rainbow-aura"'
);

// Make "The Residences" rainbow text
content = content.replace(
    /<span className="text-white\/50 uppercase tracking-\[0\.3em\] text-sm">The Residences<\/span>/,
    '<span className="rainbow-text-clip font-bold uppercase tracking-[0.3em] text-sm">The Residences</span>'
);

fs.writeFileSync(file, content);
