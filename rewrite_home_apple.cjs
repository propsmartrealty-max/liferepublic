const fs = require('fs');

let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// The Projects Section
const newProjectsSection = `
            <section id="projects" className="py-24 bg-[#FFFFFF]" aria-label="Featured Projects">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold text-[#1D1D1F] tracking-tight mb-4">
                            Which residence is right for you?
                        </h2>
                        <p className="text-[#86868B] text-xl font-medium">
                            Explore our latest collections.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {featuredProjects.slice(0, 3).map((project, index) => (
                            <motion.div 
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                <ProjectCard project={project} priority={index < 3} />
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="mt-16 flex justify-center">
                        <Link to="/projects" className="text-[#0066CC] font-medium text-lg hover:underline flex items-center gap-2">
                            Compare all models <span className="text-2xl leading-none">›</span>
                        </Link>
                    </div>
                </div>
            </section>
`;

content = content.replace(/<section id="projects" className="py-8 bg-\[#030508\] relative" aria-label="Featured Projects">[\s\S]*?<\/section>/, newProjectsSection);

// The Location Section
const newLocationSection = `
            <section className="py-24 bg-[#F5F5F7]">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="bg-[#FFFFFF] rounded-[2rem] p-8 md:p-16 shadow-apple overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight mb-6">
                                    Connectivity. <br className="hidden md:block"/> Built right in.
                                </h2>
                                <p className="text-[#86868B] text-lg font-medium mb-10 max-w-md">
                                    Situated in the heart of Hinjewadi Phase 1, Life Republic gives you unparalleled access to Pune's largest IT hub and the upcoming Metro Line 3.
                                </p>
                                
                                <div className="space-y-4">
                                    {[
                                        { title: 'Hinjewadi Phase 1', dist: '10 Mins' },
                                        { title: 'Mumbai Expressway', dist: '15 Mins' },
                                        { title: 'Metro Line 3', dist: 'Upcoming' }
                                    ].map((loc, i) => (
                                        <div key={i} className="flex items-center justify-between border-b border-[#D2D2D7]/50 pb-4">
                                            <p className="text-[#1D1D1F] font-semibold">{loc.title}</p>
                                            <p className="text-[#86868B] font-medium">{loc.dist}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-apple">
                                <img src="/images/home/overview-img.jpg" alt="Life Republic Location" className="w-full aspect-square object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
`;

content = content.replace(/<section className="py-10 bg-\[#030508\] relative overflow-hidden">[\s\S]*?<\/section>/, newLocationSection);

fs.writeFileSync(file, content);
