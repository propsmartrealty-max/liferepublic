const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace group-hover:text-rainbow with just standard white/accent hover for text to prevent invisibility
content = content.replace(/group-hover:text-rainbow/g, 'group-hover:text-white');

fs.writeFileSync(file, content);
