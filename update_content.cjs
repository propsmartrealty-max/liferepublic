const fs = require('fs');

// Update Projects.tsx (Apartments / Clusters)
let projectsFile = 'src/pages/Projects.tsx';
let pContent = fs.readFileSync(projectsFile, 'utf8');

// The Sector Mesh is already pretty good, but let's make it explicitly about Clusters
pContent = pContent.replace(
    /The Life Republic Ecosystem/g,
    "The Life Republic Clusters"
);
pContent = pContent.replace(
    /Explore specialized residential sectors in Kolte Patil Life Republic/g,
    "Explore the distinct residential clusters across the 390-acre Life Republic ecosystem. From smart apartments to ultra-luxury villas."
);
fs.writeFileSync(projectsFile, pContent);

// Update TownshipGuide.tsx (Township Experience & Features)
let tFile = 'src/pages/TownshipGuide.tsx';
let tContent = fs.readFileSync(tFile, 'utf8');

const detailedFeatures = `
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div className="space-y-6">
                            <h3 className="text-3xl font-sans font-bold text-white tracking-tight">The 390-Acre Township Experience</h3>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Life Republic is not just a residential project; it is a self-sustaining ecosystem built on 390 acres of undulating greens. Designed for the global citizen, it integrates nature, infrastructure, and community living at a breathtaking scale.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-white/80"><span className="material-symbol text-[#1a73e8]">school</span> Anisha Global School (Operational)</li>
                                <li className="flex items-center gap-3 text-white/80"><span className="material-symbol text-[#1a73e8]">local_hospital</span> Proposed Multi-Specialty Hospital</li>
                                <li className="flex items-center gap-3 text-white/80"><span className="material-symbol text-[#1a73e8]">add_road</span> 150-ft Wide Internal Spine Road</li>
                                <li className="flex items-center gap-3 text-white/80"><span className="material-symbol text-[#1a73e8]">storefront</span> High-Street Retail & Commercial Zones</li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-3xl font-sans font-bold text-white tracking-tight">Entire Township Features</h3>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Every cluster within the township has access to centralized civic infrastructure, ensuring safety, convenience, and a premium lifestyle for over 10,000+ residing families.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-white/80"><span className="material-symbol text-[#1a73e8]">nature_people</span> 5-Acre Entrance Boulevard</li>
                                <li className="flex items-center gap-3 text-white/80"><span className="material-symbol text-[#1a73e8]">sports_tennis</span> 100+ Premium Sports & Leisure Amenities</li>
                                <li className="flex items-center gap-3 text-white/80"><span className="material-symbol text-[#1a73e8]">local_fire_department</span> Dedicated Fire & Police Stations</li>
                                <li className="flex items-center gap-3 text-white/80"><span className="material-symbol text-[#1a73e8]">water_drop</span> 24/7 Centralized Water & Power Grids</li>
                            </ul>
                        </div>
                    </div>
`;

tContent = tContent.replace(/<div className="prose prose-lg max-w-none text-white\/60 mb-16">[\s\S]*?<\/div>/, detailedFeatures);

fs.writeFileSync(tFile, tContent);
