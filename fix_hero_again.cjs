const fs = require('fs');

let file = 'src/components/sections/HeroSlider.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<span className="inline-block py-1\.5 px-4.*?Kolte Patil Developers\n\s*<\/span>/g, `<span className="inline-block py-2 px-6 rounded-full bg-black/40 backdrop-blur-md border border-[#E5C07B]/30 text-[#E5C07B] text-[10px] font-bold tracking-[0.2em] uppercase mb-8"><span className="text-xl leading-none align-middle mr-2">✦</span> 390-ACRE INTEGRATED TOWNSHIP ECOSYSTEM • HINJEWADI, PUNE</span>`);
content = content.replace(/<h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tighter text-white leading-\[1\.05\] mb-6 drop-shadow-lg">/g, `<h1 className="text-4xl md:text-6xl lg:text-[5rem] font-serif font-bold text-white leading-[1.1] mb-6 drop-shadow-2xl">`);
content = content.replace(/<p className="text-xl md:text-2xl text-white\/90 font-medium tracking-tight mb-10 max-w-2xl drop-shadow-md">/g, `<p className="text-lg md:text-xl text-gray-300 font-light mb-10 max-w-3xl drop-shadow-md leading-relaxed">`);

// Replace the two hero buttons to match screenshot (Enquire Now red button, Explore Township ghost button)
content = content.replace(/<div className="flex flex-col sm:flex-row gap-4">\s*<Button size="lg" className="px-8 bg-white text-primary hover:bg-white\/90 glow-effect".*?Schedule a Visit\n\s*<\/Button>\s*<Button size="lg" variant="outline" className="px-8 border-white\/30 text-white hover:bg-white\/10 glass-panel".*?Explore Clusters\n\s*<\/Button>\s*<\/div>/s, `<div className="flex flex-col sm:flex-row gap-6 mt-12 justify-center md:justify-start items-center">
            <Button size="lg" className="rounded-full px-10 bg-[#7F1D1D] text-white hover:bg-[#991B1B] shadow-[0_0_30px_rgba(153,27,27,0.4)] border border-red-900/50 flex gap-2" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry'))}>
              <span className="text-lg leading-none">✦</span> ENQUIRE NOW
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 border-white/20 text-white hover:bg-white/10 flex gap-2" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              EXPLORE TOWNSHIP <span className="rotate-90">➔</span>
            </Button>
          </div>`);

// Add the hero stats bar (190 Acres | Plots & Villas | The Cliff Club | Equestrian)
const statsBar = `
          {/* Hero Stats Bar */}
          <div className="flex flex-wrap gap-8 md:gap-16 border border-white/10 rounded-2xl p-6 bg-[#0B0D14]/60 backdrop-blur-xl mt-12 mb-8 max-w-4xl mx-auto md:mx-0">
            <div>
                <p className="text-white font-serif text-xl md:text-2xl font-bold mb-1">390 Acres</p>
                <p className="text-[#E5C07B] text-[9px] uppercase tracking-widest font-bold">SMART TOWNSHIP</p>
            </div>
            <div className="w-px bg-white/10 hidden md:block"></div>
            <div>
                <p className="text-white font-serif text-xl md:text-2xl font-bold mb-1">Plots & Villas</p>
                <p className="text-[#E5C07B] text-[9px] uppercase tracking-widest font-bold">FROM ₹1.23 CR*</p>
            </div>
            <div className="w-px bg-white/10 hidden md:block"></div>
            <div>
                <p className="text-white font-serif text-xl md:text-2xl font-bold mb-1">High Street</p>
                <p className="text-[#E5C07B] text-[9px] uppercase tracking-widest font-bold">RETAIL HUB</p>
            </div>
            <div className="w-px bg-white/10 hidden lg:block"></div>
            <div>
                <p className="text-white font-serif text-xl md:text-2xl font-bold mb-1">Anisha Global</p>
                <p className="text-[#E5C07B] text-[9px] uppercase tracking-widest font-bold">INTERNATIONAL SCHOOL</p>
            </div>
          </div>
`;

content = content.replace(/<div className="flex flex-col sm:flex-row gap-6 mt-12 justify-center md:justify-start items-center">/, statsBar + '\n<div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center">');


// Also center align text for mobile, left align for desktop, just like the screenshot (actually screenshot seems center aligned)
content = content.replace(/className="max-w-4xl"/g, `className="max-w-5xl mx-auto md:mx-0 text-center md:text-left flex flex-col items-center md:items-start"`);

fs.writeFileSync(file, content);
