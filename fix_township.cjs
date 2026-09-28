const fs = require('fs');
let file = 'src/pages/TownshipIntelligence.tsx';
let content = fs.readFileSync(file, 'utf8');

const echoesData = JSON.parse(fs.readFileSync('echoes_data.json', 'utf8'));
const townshipImages = echoesData.township;

// Filter and create a rich gallery block
const galleryImages = townshipImages.filter(img => !img.includes('whatsapp') && !img.includes('logo') && !img.includes('captcha'));

const galleryBlock = `
            {/* Dynamic Better Living Expansion Gallery */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">A Global Lifestyle Masterpiece</h2>
                    <p className="text-white/60 max-w-2xl mx-auto">Discover the essence of Life Republic—an integrated ecosystem designed with precision, blending extensive green open spaces with high-street retail, premier education, and thriving community spaces.</p>
                </div>
                
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    ${galleryImages.map(img => `
                    <div className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 group cursor-interactive relative">
                        <img src="${img}" alt="Township Living" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white/90 text-sm font-bold tracking-widest uppercase">Explore</span>
                        </div>
                    </div>`).join('')}
                </div>
            </div>
`;

// Insert the gallery block right before the closing </main>
content = content.replace(
    /<\/main>/,
    galleryBlock + '\n        </main>'
);

fs.writeFileSync(file, content);
