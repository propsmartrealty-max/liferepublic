const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update ProjectData interface
content = content.replace(
    /configurations\?: Configuration\[\];/,
    `configurations?: Configuration[];\n    gallery?: string[];\n    amenitiesList?: {name: string, icon: string}[];\n    floorPlans?: string[];`
);

// 2. Inject Gallery, Amenities, Floor Plans into the Expanded Modal UI
const richContent = `
                                    {/* Gallery & Rich Media Section */}
                                    {(project.gallery?.length || project.floorPlans?.length || project.amenitiesList?.length) ? (
                                        <div className="mt-12 space-y-12">
                                            
                                            {/* Amenities */}
                                            {project.amenitiesList && project.amenitiesList.length > 0 && (
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-6">Exclusive Amenities</h3>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        {project.amenitiesList.map((amenity, i) => (
                                                            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-colors">
                                                                <img src={amenity.icon} alt={amenity.name} className="w-16 h-16 object-cover rounded-lg mix-blend-lighten opacity-80" />
                                                                <span className="text-xs font-bold text-white/70 text-center uppercase tracking-wider">{amenity.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Floor Plans */}
                                            {project.floorPlans && project.floorPlans.length > 0 && (
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-6">Master & Floor Plans</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {project.floorPlans.map((plan, i) => (
                                                            <div key={i} className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-interactive">
                                                                <img src={plan} alt="Floor Plan" className="w-full h-auto object-contain mix-blend-screen opacity-70 group-hover:opacity-100 transition-opacity" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Gallery */}
                                            {project.gallery && project.gallery.length > 0 && (
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-6">Project Gallery</h3>
                                                    <div className="columns-2 md:columns-3 gap-4 space-y-4">
                                                        {project.gallery.map((img, i) => (
                                                            <div key={i} className="break-inside-avoid rounded-xl overflow-hidden border border-white/10 relative group">
                                                                <img src={img} alt="Gallery" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                    <Maximize2 size={24} className="text-white" />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : null}
`;

content = content.replace(
    /\{\/\* Configurations Grid \*\/\}/,
    richContent + '\n\n                                    {/* Configurations Grid */}'
);

fs.writeFileSync(file, content);
