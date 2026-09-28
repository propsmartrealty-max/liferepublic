const fs = require('fs');

let file = 'src/pages/ProjectDetails.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace dark backgrounds
content = content.replace(/bg-\[#0B0D14\]/g, 'bg-white');
content = content.replace(/bg-\[#1A1C23\]/g, 'bg-[#F8F9FA]');
content = content.replace(/bg-\[#030508\]/g, 'bg-white');

// Replace text colors
content = content.replace(/text-white/g, 'text-[#202124]');
content = content.replace(/text-gray-400/g, 'text-[#5F6368]');
content = content.replace(/text-gray-500/g, 'text-[#5F6368]');
content = content.replace(/text-accent/g, 'text-[#1a73e8]');
content = content.replace(/text-secondary/g, 'text-[#1a73e8]');

// Replace borders
content = content.replace(/border-white\/5/g, 'border-[#DADCE0]');
content = content.replace(/border-white\/10/g, 'border-[#DADCE0]');
content = content.replace(/border-white\/20/g, 'border-[#DADCE0]');

// Replace brutalist corners with sleek Google corners
content = content.replace(/rounded-\[3rem\]/g, 'rounded-[24px]');
content = content.replace(/rounded-\[4rem\]/g, 'rounded-[24px]');
content = content.replace(/rounded-\[2\.5rem\]/g, 'rounded-[24px]');
content = content.replace(/rounded-3xl/g, 'rounded-[24px]');
content = content.replace(/rounded-2xl/g, 'rounded-xl');

// Remove serif fonts
content = content.replace(/font-serif/g, 'font-sans');

// Special fix for the floor plan active state mapping
// selectedFloorPlan === plan ? 'bg-[#0B0D14] border-secondary shadow-2xl scale-105' : 'bg-white border-white/5 hover:shadow-xl'
content = content.replace(/selectedFloorPlan === plan \? 'bg-white border-secondary shadow-2xl scale-105' : 'bg-white border-\[#DADCE0\] hover:shadow-xl'/g, "selectedFloorPlan === plan ? 'bg-white border-[#1a73e8] ring-1 ring-[#1a73e8] shadow-google' : 'bg-white border-[#DADCE0] hover:shadow-google'");

// Same for the specific block shown in the screenshot
// className={`p-8 rounded-[3rem] border transition-all duration-500 cursor-pointer ${selectedFloorPlan === plan ? 'bg-[#0B0D14] border-secondary shadow-2xl scale-105' : 'bg-white border-white/5 hover:shadow-xl'}`}
content = content.replace(/bg-white border-\[#1a73e8\] shadow-2xl scale-105/g, 'bg-white border-[#1a73e8] shadow-google ring-1 ring-[#1a73e8]');

// Also fix the text color in active state for floor plans (they used to turn white in dark mode)
content = content.replace(/selectedFloorPlan === plan \? 'text-\[#202124\]' : 'text-\[#202124\]'/g, "'text-[#202124]'");

fs.writeFileSync(file, content);
