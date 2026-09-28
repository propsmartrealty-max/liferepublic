const fs = require('fs');
let file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the massive black glass with an ultra-refined Apple-style pill
content = content.replace(
  /bg-black\/40 backdrop-blur-3xl border border-white\/20 shadow-glass rounded-full/g,
  'bg-[#1C1C1E]/70 backdrop-blur-[40px] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-[3rem] px-10 py-4'
);

// Optimize links for "Google-like" clean typography
content = content.replace(
  /uppercase tracking-\[0\.3em\]/g,
  'capitalize tracking-normal' // Apple/Google use sentence/title case, not heavy uppercase tracking
);

content = content.replace(
  /text-sm font-bold text-white\/70/g,
  'text-[15px] font-medium text-white/80'
);

// Enquire Now Button -> iOS Style Apple Button
content = content.replace(
  /rounded-full bg-accent text-white px-8 py-3\.5 font-bold text-xs tracking-\[0\.25em\] uppercase gap-2\.5 shadow-glass hover:bg-white hover:text-accent hover:scale-105 transition-all border-none/g,
  'rounded-[2rem] bg-white text-black px-8 py-3 font-semibold text-[15px] tracking-tight gap-2 shadow-[0_4px_14px_rgba(255,255,255,0.25)] hover:scale-105 transition-all duration-300 border-none'
);

fs.writeFileSync(file, content);
