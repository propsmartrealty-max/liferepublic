const fs = require('fs');

let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Change Enquire Now button to dark red to match screenshot
content = content.replace(/variant="primary"/g, "className=\"bg-[#7F1D1D] hover:bg-[#991B1B] text-white border border-red-900/50 rounded-full px-6 py-2 shadow-lg\" variant=\"primary\"");
content = content.replace(/<Button size="lg" className="hidden sm:flex.*?>\s*Enquire Now\s*<\/Button>/g, `<Button className="hidden sm:flex bg-[#7F1D1D] hover:bg-[#991B1B] text-white text-[10px] uppercase font-bold tracking-wider px-6 rounded-full shadow-[0_0_15px_rgba(153,27,27,0.4)] border border-red-900/50" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}>ENQUIRE</Button>`);

fs.writeFileSync(file, content);
