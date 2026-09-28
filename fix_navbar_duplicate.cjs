const fs = require('fs');

let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// The replacement was: className="bg-[#7F1D1D] hover:bg-[#991B1B] text-white border border-red-900/50 rounded-full px-6 py-2 shadow-lg" variant="primary"
// We need to merge it or remove the duplicate.

// Let's just find the offending lines and fix them manually
content = content.replace(/className="bg-\[#7F1D1D\] hover:bg-\[#991B1B\] text-white border border-red-900\/50 rounded-full px-6 py-2 shadow-lg" variant="primary" size="lg" className="hidden sm:flex rounded-none bg-\[#0B0D14\] text-white px-8 py-3 font-bold text-\[13px\] tracking-tight gap-2 shadow-\[0_4px_14px_rgba\(54,168,73,0\.3\)\] hover:scale-105 transition-all duration-300 border-none"/g, 'variant="primary" size="lg" className="hidden sm:flex bg-[#7F1D1D] hover:bg-[#991B1B] text-white px-8 py-3 font-bold text-[13px] tracking-tight gap-2 rounded-full shadow-lg transition-all duration-300"');

content = content.replace(/className="bg-\[#7F1D1D\] hover:bg-\[#991B1B\] text-white border border-red-900\/50 rounded-full px-6 py-2 shadow-lg" variant="primary" size="lg" className="w-full rounded-2xl py-4 font-bold text-lg shadow-hard"/g, 'variant="primary" size="lg" className="w-full bg-[#7F1D1D] hover:bg-[#991B1B] text-white border border-red-900/50 rounded-2xl py-4 font-bold text-lg shadow-lg"');

fs.writeFileSync(file, content);
