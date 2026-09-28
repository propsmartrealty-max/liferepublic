const fs = require('fs');

let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// The Projects Section
const newProjectsSection = `
            <section id="projects" className="py-40 bg-[#030508] relative" aria-label="Featured Projects">
                
                {/* Fluid background orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>

                <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
                    <div className="flex flex-col items-center text-center mb-24">
                        <div className="glass-pill px-6 py-2 mb-6">
                            <span className="slim-text text-[9px] uppercase">The Portfolio</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-sans font-thin text-white leading-tight">
                            Unbounded <span className="font-serif italic text-white/60">Environments.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {featuredProjects.slice(0, 3).map((project, index) => (
                            <motion.div 
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <ProjectCard project={project} priority={index < 3} />
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="mt-20 flex justify-center">
                        <Link to="/projects" className="glass-pill px-10 py-4 text-white hover:bg-white/10 transition-colors duration-500 flex items-center gap-4 group">
                            <span className="font-sans font-light tracking-[0.2em] text-[10px] uppercase">View All Projects</span>
                            <div className="w-8 h-[0.5px] bg-white/30 group-hover:bg-white transition-colors duration-500"></div>
                        </Link>
                    </div>
                </div>
            </section>
`;

content = content.replace(/<section id="projects" className="py-32 bg-\[#0A0A0A\] relative border-t border-white\/5" aria-label="Featured Projects">[\s\S]*?<\/section>/, newProjectsSection);

// The Location Section
const newLocationSection = `
            <section className="py-40 bg-[#030508] relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none animate-float"></div>

                <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
                    <div className="glass-panel rounded-[3rem] p-8 md:p-16 lg:p-24 overflow-hidden relative">
                        {/* Inner fluid effect */}
                        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                            <div>
                                <div className="glass-pill px-6 py-2 mb-8 inline-block">
                                    <span className="slim-text text-[9px] uppercase">Fluid Connectivity</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-thin text-white leading-tight mb-8">
                                    Flow into the <br/> <span className="font-serif italic text-white/60">City Center.</span>
                                </h2>
                                <p className="slim-text text-sm leading-relaxed mb-16 max-w-lg">
                                    A frictionless transit experience. Seamlessly glide from the serenity of your enclave to the heart of the Hinjewadi tech ecosystem.
                                </p>
                                
                                <div className="space-y-4">
                                    {[
                                        { title: 'Hinjewadi Phase 1', dist: '10 Mins' },
                                        { title: 'Mumbai Expressway', dist: '15 Mins' },
                                        { title: 'Metro Line 3', dist: 'Upcoming' }
                                    ].map((loc, i) => (
                                        <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 group">
                                            <p className="text-white/70 font-sans font-light text-sm group-hover:text-white transition-colors">{loc.title}</p>
                                            <p className="text-white/40 font-sans font-extralight text-xs tracking-widest">{loc.dist}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative aspect-square w-full max-w-md mx-auto">
                                <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_60s_linear_infinite]"></div>
                                <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse]"></div>
                                <div className="absolute inset-8 rounded-full overflow-hidden">
                                    <img src="/images/home/overview-img.jpg" alt="Life Republic Location" className="w-full h-full object-cover opacity-50 scale-110" />
                                </div>
                                {/* Floating marker */}
                                <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.5)] animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
`;

content = content.replace(/<section className="py-32 bg-\[#141414\] border-t border-white\/5">[\s\S]*?<\/section>/, newLocationSection);

fs.writeFileSync(file, content);
