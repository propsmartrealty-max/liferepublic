const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Enhance the Configuration Badge (Make it pop with a rainbow border)
content = content.replace(
    /className="px-4 py-1\.5 bg-black\/40 backdrop-blur-md border border-white\/10 rounded-full text-\[10px\] font-bold text-white uppercase tracking-widest shadow-xl"/,
    'className="px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 hover:border-transparent hover:bg-rainbow-hover rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-xl transition-all duration-300"'
);

// 2. Enhance MahaRERA Tag (Make the RERA number Rainbow colored)
content = content.replace(
    /className="text-\[10px\] text-white font-mono"/,
    'className="text-[10px] rainbow-text-clip font-mono font-bold"'
);

// 3. Make the USP pop more with a pure white color and larger font
content = content.replace(
    /className="text-xs font-bold text-white\/90 leading-tight"/,
    'className="text-sm font-bold text-white leading-tight"'
);

// 4. Improve the bottom Pricing Structure layout (add a subtle glowing background to price)
content = content.replace(
    /<div className="text-xl md:text-2xl font-bold text-white tracking-tight">/,
    '<div className="text-xl md:text-2xl font-bold rainbow-text-clip tracking-tight">'
);

// 5. Enhance the background gradient for better text readability
content = content.replace(
    /className="absolute inset-0 bg-gradient-to-t from-black\/95 via-black\/60 to-black\/10 transition-colors duration-700 group-hover:from-black"/,
    'className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent transition-colors duration-700 group-hover:from-[#050505]"'
);

// 6. Make the Quick Access Links more vibrant
content = content.replace(
    /className="px-3 py-1\.5 bg-white\/5 hover:bg-rainbow-hover border border-white\/10 rounded-md text-\[10px\] text-white\/80 tracking-widest uppercase transition-colors"/g,
    'className="px-3 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded-md text-[10px] font-bold tracking-widest uppercase transition-all shadow-lg"'
);

fs.writeFileSync(file, content);
