const fs = require('fs');
let file = 'src/pages/ProjectDetails.tsx';
let content = fs.readFileSync(file, 'utf8');

const richContentBlock = `
                        {/* Dynamic Floor Plans Gallery */}
                        {project.floorPlans && project.floorPlans.length > 0 && (
                            <section id="floor-plans" className="mt-16">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-[1px] bg-rainbow"></div>
                                    <h2 className="text-4xl font-sans font-bold">Master & Floor Plans</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {project.floorPlans.map((plan, i) => (
                                        <div key={i} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-4 cursor-interactive">
                                            <img src={plan} alt={\`Floor Plan \${i+1}\`} className="w-full h-auto object-contain mix-blend-screen opacity-70 group-hover:opacity-100 transition-opacity duration-500" loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Dynamic Project Gallery */}
                        {project.gallery && project.gallery.length > 0 && (
                            <section id="gallery" className="mt-24">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-[1px] bg-rainbow"></div>
                                    <h2 className="text-4xl font-sans font-bold">Project Gallery</h2>
                                </div>
                                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                                    {project.gallery.map((img, i) => (
                                        <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 relative group">
                                            <img src={img} alt={\`Gallery \${i+1}\`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Dynamic Amenities */}
                        <section id="amenities" className="mt-24">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-[1px] bg-rainbow"></div>
                                <h2 className="text-4xl font-sans font-bold">World-Class Amenities</h2>
                            </div>
                            
                            {project.amenitiesList && project.amenitiesList.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                    {project.amenitiesList.map((amenity, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors">
                                            <img src={amenity.icon} alt={amenity.name} className="w-20 h-20 object-cover rounded-xl mix-blend-lighten opacity-90" loading="lazy" />
                                            <span className="text-xs font-bold text-white/80 text-center uppercase tracking-widest">{amenity.name}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {commonAmenities.map((amenity, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                                            <CheckCircle size={20} className="text-white/50" />
                                            <span className="text-sm font-bold text-white/80">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
`;

// Insert it right after the existing Configurations Grid (which is wrapped in section#pricing)
// We need to replace the section#amenities which is currently hardcoded in ProjectDetails.tsx.

content = content.replace(
    /\{\/\* Amenities \*\/\}\s*<section id="amenities"[\s\S]*?<\/section>/,
    richContentBlock
);

fs.writeFileSync(file, content);
