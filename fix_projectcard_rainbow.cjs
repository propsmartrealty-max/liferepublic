const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace standard white hover shadow with glow-rainbow
content = content.replace(
    /hover:shadow-\[0_0_40px_rgba\(255,255,255,0\.05\)\]/g,
    'hover:glow-rainbow hover:border-transparent'
);

// Replace "Explore ->" text with rainbow text
content = content.replace(
    /group-hover:translate-x-0 transition-all duration-700 delay-150"/g,
    'group-hover:translate-x-0 transition-all duration-700 delay-150 group-hover:text-rainbow"'
);

fs.writeFileSync(file, content);
