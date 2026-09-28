const fs = require('fs');

let file = 'src/pages/TownshipGuide.tsx';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Make Cinematic
    content = content.replace(/bg-white/g, 'bg-black');
    content = content.replace(/bg-\[#F8F9FA\]/g, 'bg-black');
    content = content.replace(/bg-\[#1A1C23\]/g, 'bg-[#0A0A0A]');
    content = content.replace(/text-\[#202124\]/g, 'text-white');
    content = content.replace(/text-gray-600/g, 'text-white/60');
    content = content.replace(/border-\[#DADCE0\]/g, 'border-white/10');
    content = content.replace(/bg-\[#151822\]/g, 'bg-[#0A0A0A]');

    fs.writeFileSync(file, content);
    console.log("Township Guide updated to Cinematic Dark");
} else {
    console.log("TownshipGuide.tsx not found");
}
