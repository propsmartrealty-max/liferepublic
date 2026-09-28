const fs = require('fs');
let file = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

// We will inject an SEO Silo footer block right before the final copyright text.
const seoBlock = `
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/10 text-white/50 text-xs">
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Top Projects</h4>
                        <ul className="space-y-2">
                            <li><Link to="/projects/qrious" className="hover:text-white transition-colors">Life Republic Qrious</Link></li>
                            <li><Link to="/projects/duet" className="hover:text-white transition-colors">Life Republic Duet</Link></li>
                            <li><Link to="/projects/canvas" className="hover:text-white transition-colors">Life Republic Canvas</Link></li>
                            <li><Link to="/projects/aros" className="hover:text-white transition-colors">Life Republic Aros</Link></li>
                            <li><Link to="/projects/atmos" className="hover:text-white transition-colors">Life Republic Atmos</Link></li>
                            <li><Link to="/projects/echoes" className="hover:text-white transition-colors">Life Republic Echoes</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Configurations</h4>
                        <ul className="space-y-2">
                            <li><Link to="/projects?bhk=1" className="hover:text-white transition-colors">1 BHK Flats in Life Republic</Link></li>
                            <li><Link to="/projects?bhk=2" className="hover:text-white transition-colors">2 BHK Flats in Life Republic</Link></li>
                            <li><Link to="/projects?bhk=2.5" className="hover:text-white transition-colors">2.5 BHK Flats near Hinjewadi</Link></li>
                            <li><Link to="/projects?bhk=3" className="hover:text-white transition-colors">3 BHK Flats in Life Republic</Link></li>
                            <li><Link to="/projects?bhk=4" className="hover:text-white transition-colors">4 BHK Luxury Homes Pune</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Research</h4>
                        <ul className="space-y-2">
                            <li><Link to="/price" className="hover:text-white transition-colors">Life Republic Pune Price</Link></li>
                            <li><Link to="/location" className="hover:text-white transition-colors">Life Republic Hinjewadi Location</Link></li>
                            <li><Link to="/floor-plans" className="hover:text-white transition-colors">Life Republic Floor Plans</Link></li>
                            <li><Link to="/rera" className="hover:text-white transition-colors">Life Republic MahaRERA</Link></li>
                            <li><Link to="/resale" className="hover:text-white transition-colors">Life Republic Resale</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Location Connectivity</h4>
                        <ul className="space-y-2">
                            <li><Link to="/location/hinjewadi" className="hover:text-white transition-colors">Flats near Hinjewadi IT Park</Link></li>
                            <li><Link to="/location/marunji" className="hover:text-white transition-colors">Marunji Real Estate</Link></li>
                            <li><Link to="/location/wakad" className="hover:text-white transition-colors">Distance to Wakad</Link></li>
                            <li><Link to="/location/baner" className="hover:text-white transition-colors">Distance to Baner</Link></li>
                            <li><Link to="/schools" className="hover:text-white transition-colors">Schools near Life Republic</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="py-6 border-t border-white/10 text-[10px] text-white/30 text-center max-w-4xl mx-auto leading-relaxed">
                    Disclaimer: This is an independent property information platform intended for research, reviews, and comparison of Kolte-Patil Life Republic Pune. Project data, RERA numbers, pricing, and exact acreage (~390 acres / 400+ acres) are sourced from official developer materials and MahaRERA. Always verify exact figures, project RERA (e.g., Qrious P52100079623, Echoes PM1261012502409), and possession dates before making a transaction.
                </div>
`;

content = content.replace(
    /<div className="mt-20 pt-8 border-t border-white\/10 text-center text-sm opacity-50 flex flex-col md:flex-row items-center justify-between">/,
    seoBlock + '\n<div className="pt-8 border-t border-white/10 text-center text-sm opacity-50 flex flex-col md:flex-row items-center justify-between">'
);

fs.writeFileSync(file, content);
