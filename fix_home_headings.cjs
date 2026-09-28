const fs = require('fs');

let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix Phase 3 Collection
content = content.replace(/<span className="text-accent text-xs font-bold tracking-tight font-semibold block mb-4">The Collection<\/span>/g, `<span className="text-[#E5C07B] text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 mb-4"><span className="text-xl">✦</span> SOVEREIGN PROJECT PORTFOLIO</span>`);
content = content.replace(/Life Republic <span className="text-golden-gradient">Properties<\/span>/g, `Explore Life Republic <span className="text-[#E5C07B]">Complete Enclaves</span>`);
content = content.replace(/<div className="w-16 h-1 bg-accent mx-auto mb-8 rounded-full"><\/div>/g, "");
content = content.replace(/Discover our diverse range of premium properties, from ultra-luxury villas and bespoke bungalow plots to state-of-the-art smart apartments./g, "390 Acres of master-planned luxury NA plots, private villas, hillside apartments, and senior retirement enclaves.");

// Add the pill menu exactly like the screenshot
const pillMenu = `
                    {/* Category Filter Pills (Static representation) */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-4xl mx-auto border border-white/10 p-2 rounded-full bg-[#151822]/50 backdrop-blur-md">
                        <button className="bg-[#7F1D1D] text-white px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase border border-red-900/50 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> All Enclaves <span className="bg-black/20 px-2 py-0.5 rounded-full ml-1">16</span></button>
                        <button className="text-gray-400 hover:text-white px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors">🏡 NA Plots <span className="bg-white/5 px-2 py-0.5 rounded-full ml-1">1</span></button>
                        <button className="text-gray-400 hover:text-white px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors">🏰 Luxury Villas <span className="bg-white/5 px-2 py-0.5 rounded-full ml-1">2</span></button>
                        <button className="text-gray-400 hover:text-white px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors">🏢 Apartments <span className="bg-white/5 px-2 py-0.5 rounded-full ml-1">12</span></button>
                    </div>
`;
content = content.replace(/<p className="text-text-muted max-w-2xl mx-auto text-lg mb-10 font-light">\s*390 Acres.*?\s*<\/p>/g, `<p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base mb-10 font-light">390 Acres of master-planned luxury NA plots, private villas, hillside apartments, and senior retirement enclaves.</p>${pillMenu}`);

fs.writeFileSync(file, content);
