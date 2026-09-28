const fs = require('fs');

let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace standard Apple pill style with dark mode elegant top bar style
content = content.replace(/bg-white\/80/g, "bg-[#0B0D14]/90");
content = content.replace(/border-gray-200\/50/g, "border-white/10 border-b");
content = content.replace(/rounded-full/g, "rounded-none");
content = content.replace(/text-secondary/g, "text-white");
content = content.replace(/text-gray-900/g, "text-white");
content = content.replace(/text-gray-800/g, "text-white");
content = content.replace(/bg-gray-50/g, "bg-[#151822]");
content = content.replace(/border-gray-100/g, "border-white/10");
content = content.replace(/bg-white/g, "bg-[#0B0D14]");

fs.writeFileSync(file, content);
