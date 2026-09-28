const fs = require('fs');

let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// The Projects Section
const newProjectsSection = `
            <section id="projects" className="py-32 bg-[#0A0A0A] relative border-t border-white/5" aria-label="Featured Projects">
                <div className="container mx-auto px-6 lg:px-12 max-w-[1600px]">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-8 h-px bg-primary"></div>
                                <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-sans">The Portfolio</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
                                Curated <span className="italic text-white/50">Residences.</span>
                            </h2>
                        </div>
                        <Link to="/projects" className="group flex items-center gap-4 text-white hover:text-primary transition-colors pb-4">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-sans">View Full Portfolio</span>
                            <div className="w-12 h-px bg-white/30 group-hover:bg-primary transition-colors"></div>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {featuredProjects.slice(0, 3).map((project, index) => (
                            <div key={project.id}>
                                <ProjectCard project={project} priority={index < 3} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
`;

content = content.replace(/<section id="projects" className="py-32 bg-black relative z-10" aria-label="Featured Projects">[\s\S]*?<\/section>/, newProjectsSection);

// The Location Section
const newLocationSection = `
            <section className="py-32 bg-[#141414] border-t border-white/5">
                <div className="container mx-auto px-6 lg:px-12 max-w-[1600px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-8 h-px bg-primary"></div>
                                <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-sans">Location Insight</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-8">
                                The Axis of <br/> <span className="italic text-white/50">Connectivity.</span>
                            </h2>
                            <p className="text-white/60 text-lg font-sans font-light leading-relaxed mb-12 max-w-lg">
                                Strategically positioned in the heart of Pune West. Life Republic offers unparalleled access to Hinjewadi IT Park while maintaining the serenity of a private enclave.
                            </p>
                            
                            <div className="space-y-6">
                                {[
                                    { title: 'Hinjewadi Phase 1', dist: '10 Mins', type: 'IT Hub' },
                                    { title: 'Mumbai Expressway', dist: '15 Mins', type: 'Transit' },
                                    { title: 'Anisha Global School', dist: '0 Mins', type: 'Education' }
                                ].map((loc, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-white/10 pb-6 group">
                                        <div>
                                            <p className="text-white font-serif text-xl mb-1 group-hover:text-primary transition-colors">{loc.title}</p>
                                            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-sans">{loc.type}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-primary font-serif text-2xl">{loc.dist}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-[4/5] w-full">
                            <img src="/images/home/overview-img.jpg" alt="Life Republic Location" className="w-full h-full object-cover grayscale opacity-80" />
                            <div className="absolute inset-0 border border-white/10 m-4"></div>
                        </div>
                    </div>
                </div>
            </section>
`;

content = content.replace(/<section className="py-32 bg-\[#050505\] relative overflow-hidden">[\s\S]*?<\/section>/, newLocationSection);

fs.writeFileSync(file, content);
