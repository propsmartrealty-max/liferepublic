const fs = require('fs');

let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Strip out the old Phase 3 (The Collection) and replace with a sleek modern Projects grid
const newProjectsSection = `
            <section id="projects" className="py-32 bg-black relative z-10" aria-label="Featured Projects">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tighter">
                                Architectural <br/> <span className="text-gray-500">Masterpieces.</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-light leading-relaxed">
                                Discover a curated portfolio of spatial environments engineered for modern sovereignty.
                            </p>
                        </div>
                        <Link to="/projects" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all flex items-center gap-2">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProjects.slice(0, 6).map((project, index) => (
                            <div key={project.id} className={\`\${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}\`}>
                                <ProjectCard project={project} priority={index < 2} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
`;

content = content.replace(/<section className="py-16 md:py-32 bg-transparent" aria-label="Featured Township Projects">[\s\S]*?<\/section>/, newProjectsSection);

// Replace Location section with ultra-modern connectivity bento
const newLocationSection = `
            <section className="py-32 bg-[#050505] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none blur-3xl"></div>
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tighter">
                            Hyperconnected <span className="text-primary">Ecosystem.</span>
                        </h2>
                        <p className="text-gray-400 text-lg font-light">
                            Seamless velocity. Strategically positioned 10 minutes from Hinjewadi Phase 1 via the multi-level transit corridor.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bento-card p-8 md:col-span-2 min-h-[300px] flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white mb-6">📍</div>
                                <h3 className="text-3xl font-display font-bold text-white mb-2">Hinjewadi IT Park</h3>
                                <p className="text-gray-400">Direct access to Pune's largest tech cluster.</p>
                            </div>
                            <div className="text-6xl font-display font-bold text-white/20 mt-8">10 MINS</div>
                        </div>
                        <div className="bento-card p-8 min-h-[300px] flex flex-col justify-between bg-gradient-to-br from-surface to-primary/10">
                            <div>
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">🚇</div>
                                <h3 className="text-2xl font-display font-bold text-white mb-2">Metro Line 3</h3>
                                <p className="text-gray-400">Upcoming massive connectivity upgrade.</p>
                            </div>
                            <div className="text-5xl font-display font-bold text-primary/30 mt-8">5 KM</div>
                        </div>
                    </div>
                </div>
            </section>
`;

content = content.replace(/<section className="py-24 bg-\[#0B0D14\].*?Location Advantage">[\s\S]*?<\/section>/, newLocationSection);

fs.writeFileSync(file, content);
