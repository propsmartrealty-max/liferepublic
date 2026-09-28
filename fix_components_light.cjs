const fs = require('fs');

let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// Switch ProjectCard to light mode
content = content.replace(/bg-\[#1C1C1E\]\/60 backdrop-blur-\[30px\]/g, 'bg-white/80 backdrop-blur-[30px]');
content = content.replace(/border border-white\/\[0\.08\]/g, 'border border-gray-200');
content = content.replace(/shadow-\[0_8px_32px_rgba\(0,0,0,0\.4\)\]/g, 'shadow-[0_8px_32px_rgba(0,0,0,0.06)]');
// The regex below might be too broad if text-white is used elsewhere in the card where it SHOULD be white, but let's assume it's main text.
content = content.replace(/text-white/g, 'text-secondary');
content = content.replace(/text-text-muted\/60/g, 'text-text-muted');
content = content.replace(/text-text-muted\/50/g, 'text-text-muted');
content = content.replace(/bg-white\/5/g, 'bg-gray-50');

fs.writeFileSync(file, content);

