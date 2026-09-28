const fs = require('fs');
let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Increase logo size
content = content.replace(/className="h-10 object-contain mix-blend-lighten"/g, 'className="h-16 object-contain mix-blend-lighten"');

// Make links larger and bold
content = content.replace(/className="hidden md:flex items-center space-x-12 text-sm uppercase tracking-widest font-medium"/g, 'className="hidden md:flex items-center space-x-12 text-base uppercase tracking-widest font-bold"');
content = content.replace(/className="relative group transition-opacity hover:opacity-100"/g, 'className="relative group transition-opacity hover:opacity-100 text-white/90 font-bold"');

// Make Enquire button larger and bold
content = content.replace(/className="border border-white rounded-full px-6 py-2 uppercase tracking-widest text-xs bg-rainbow-hover transition-all duration-500 border-white\/50 hover:border-transparent transition-colors cursor-interactive"/g, 'className="border border-white rounded-full px-8 py-3 uppercase tracking-widest text-sm font-bold bg-rainbow-hover transition-all duration-500 border-white/50 hover:border-transparent cursor-interactive"');

fs.writeFileSync(file, content);
