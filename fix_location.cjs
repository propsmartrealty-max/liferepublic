const fs = require('fs');

let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update Location section to match the "Minutes From Everywhere, Miles From Chaos" design
content = content.replace(/Hinjewadi: A Real Estate Investment Hotspot/g, `Minutes From Everywhere, <span className="text-[#E5C07B]">Miles From Chaos</span>`);
content = content.replace(/<div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"><\/div>/g, `<span className="text-[#E5C07B] text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 mb-4 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 border border-[#E5C07B]/30 px-4 py-1.5 rounded-full bg-[#151822]/80 backdrop-blur-md"><span className="text-red-500">📍</span> STRATEGIC CONNECTIVITY & PROXIMITY</span>`);
content = content.replace(/Connected to the world, yet a world of its own.*?appreciation\./g, `Seamless access to Hinjewadi IT Park, Wakad, and Pune-Mumbai Expressway via the multi-level Wakad junction.`);

// Modify the location cards to match the dark screenshot (dark cards, gold title, thin border)
content = content.replace(/bg-gradient-to-br \$\{item\.gradient\} \$\{item\.border\} hover:shadow-\[0_0_30px_-5px_rgba\(0,0,0,0\.3\)\]/g, `bg-transparent border border-white/10 hover:border-[#E5C07B]/30 hover:bg-white/[0.02]`);

fs.writeFileSync(file, content);
