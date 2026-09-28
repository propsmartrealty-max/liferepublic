const fs = require('fs');
let file = 'src/pages/Projects.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace light backgrounds with transparent or dark ones
content = content.replace(/bg-\[#F8F9FA\]/g, 'bg-black');
content = content.replace(/bg-white/g, 'bg-black');

// Replace text colors
content = content.replace(/text-\[#202124\]/g, 'text-white');
content = content.replace(/text-gray-600/g, 'text-white/60');
content = content.replace(/text-\[#1a73e8\]/g, 'text-white/80');

// Replace borders
content = content.replace(/border-\[#DADCE0\]/g, 'border-white/10');

fs.writeFileSync(file, content);
