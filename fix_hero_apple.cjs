const fs = require('fs');
let file = 'src/components/sections/HeroSlider.tsx';
let content = fs.readFileSync(file, 'utf8');

// Change massive text block to Apple Vision Pro style text
content = content.replace(
  /className="max-w-5xl mx-auto bg-black\/30 backdrop-blur-md p-10 sm:p-16 rounded-3xl border border-white\/10 shadow-2xl"/g,
  'className="max-w-5xl mx-auto flex flex-col items-center justify-center"'
);

// We don't need a glass box behind text if we add a super smooth bottom/top gradient over the image itself!
content = content.replace(
  /<div className="absolute inset-0 bg-black\/60" \/>/,
  `<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#000000]" />`
);

// Update typography in hero
content = content.replace(
  /className="inline-block bg-accent px-4 py-1 text-sm font-semibold tracking-wider uppercase mb-4 rounded-sm"/g,
  'className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-3xl px-5 py-2 text-[13px] font-medium tracking-wide text-white mb-6 rounded-full border border-white/10"'
);

content = content.replace(
  /text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight/g,
  'heading-hero mb-6'
);

content = content.replace(
  /text-xl md:text-2xl mb-10 font-light max-w-2xl mx-auto/g,
  'text-[21px] md:text-[24px] mb-12 font-sans font-light tracking-tight text-white/80 max-w-3xl mx-auto'
);

content = content.replace(
  /<Button variant="primary" size="lg" className="gap-2 bg-accent hover:bg-white hover:text-accent border-2 border-transparent">/,
  `<Button variant="primary" size="lg" className="rounded-full bg-white text-black font-semibold text-[17px] tracking-tight hover:scale-105 border-none shadow-[0_4px_24px_rgba(255,255,255,0.3)] px-10 py-4 gap-3">`
);

content = content.replace(
  /<Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">/,
  `<Button variant="outline" size="lg" className="rounded-full bg-[#1C1C1E]/60 backdrop-blur-3xl border border-white/10 text-white font-medium text-[17px] tracking-tight hover:bg-[#2C2C2E] px-10 py-4">`
);

fs.writeFileSync(file, content);
