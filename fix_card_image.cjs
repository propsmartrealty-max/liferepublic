const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// The image tag currently has mix-blend-overlay which causes extreme distortion.
// Let's remove it and make it a clean image with a simple dark gradient overlay.
content = content.replace(
    /className="w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"/,
    'className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"'
);

// Remove the weird background color burn layer that messes up the image
content = content.replace(
    /<div className="absolute inset-0 bg-rainbow opacity-20 mix-blend-color-burn group-hover:opacity-40 transition-opacity duration-700"><\/div>/,
    '<div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>'
);

fs.writeFileSync(file, content);
