const fs = require('fs');
let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// The original desktop link:
// className="hover:opacity-50 transition-opacity cursor-interactive"
// We replace it with the boxing rainbow effect.
content = content.replace(
    /className="hover:opacity-50 transition-opacity cursor-interactive"/g,
    'className="px-5 py-2.5 rounded-xl border border-transparent hover:rainbow-border-wrap hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-interactive group relative overflow-hidden flex items-center justify-center"'
);

// Actually, `rainbow-border-wrap` requires a dark background on the inside if we just want a border.
// Let's just do a direct background rainbow effect on hover, which is much more vibrant and fits "rainbow color effect on hovering"
content = fs.readFileSync(file, 'utf8');
content = content.replace(
    /className="hover:opacity-50 transition-opacity cursor-interactive"/g,
    'className="px-6 py-3 rounded-[1rem] hover:bg-rainbow-hover hover:text-white transition-all duration-300 cursor-interactive"'
);

// We need to also fix it for Mobile Menu links
content = content.replace(
    /className="text-4xl font-light uppercase tracking-widest"/g,
    'className="text-3xl font-bold uppercase tracking-widest px-8 py-4 rounded-[1.5rem] hover:bg-rainbow-hover hover:text-white transition-all duration-300 block text-center"'
);

fs.writeFileSync(file, content);
