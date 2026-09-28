const fs = require('fs');

let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix location section pills (bg-black/30 is bad for light mode)
content = content.replace(/bg-black\/30 border border-white\/10 text-blue-400/g, "bg-blue-50 text-blue-700 border border-blue-100");
content = content.replace(/bg-black\/30 border border-white\/10 text-orange-400/g, "bg-orange-50 text-orange-700 border border-orange-100");
content = content.replace(/bg-black\/30 border border-white\/10 text-green-400/g, "bg-green-50 text-green-700 border border-green-100");
content = content.replace(/bg-black\/30 border border-white\/10 text-rose-400/g, "bg-rose-50 text-rose-700 border border-rose-100");

// Fix generic pill styling
content = content.replace(/bg-black\/30 border border-white\/10 \$\{item\.text\}/g, "bg-white border border-gray-200 text-gray-700 shadow-sm");

// Fix the 'text-blue-400' in the array since it dictates the color in the map
content = content.replace(/text: 'text-blue-400'/g, "text: 'text-blue-700 bg-blue-50 border-blue-100'");
content = content.replace(/text: 'text-orange-400'/g, "text: 'text-orange-700 bg-orange-50 border-orange-100'");
content = content.replace(/text: 'text-green-400'/g, "text: 'text-green-700 bg-green-50 border-green-100'");
content = content.replace(/text: 'text-rose-400'/g, "text: 'text-rose-700 bg-rose-50 border-rose-100'");

fs.writeFileSync(file, content);
