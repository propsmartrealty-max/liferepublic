const fs = require('fs');
const file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /<header className=\{.*?\}\>/,
  `<header className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl z-[100] transition-all duration-700">`
);

content = content.replace(
  /<nav className="w-full" aria-label="Main Navigation">/,
  `<nav className="w-full" aria-label="Main Navigation">`
);

content = content.replace(
  /<div className="relative flex items-center justify-between px-6 lg:px-12 w-full">/,
  `<div className="relative flex items-center justify-between px-8 py-4 bg-black/40 backdrop-blur-3xl border border-white/20 shadow-glass rounded-full transition-all">`
);

// Optimize "Enquire Now" button inside Navbar to be a solid bright pill with high contrast
content = content.replace(
  /className="hidden sm:flex rounded-2xl px-8 py-3\.5 font-bold text-xs tracking-\[0\.25em\] uppercase gap-2\.5 shadow-hard hover:scale-105 transition-all"/,
  `className="hidden sm:flex rounded-full bg-accent text-white px-8 py-3.5 font-bold text-xs tracking-[0.25em] uppercase gap-2.5 shadow-glass hover:bg-white hover:text-accent hover:scale-105 transition-all border-none"`
);

// Mobile button
content = content.replace(
  /rounded-2xl text-white hover:text-accent transition-all border border-white\/10/g,
  'rounded-full text-white hover:text-accent transition-all border border-white/20'
);

fs.writeFileSync(file, content);
