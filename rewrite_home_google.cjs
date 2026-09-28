const fs = require('fs');

let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// The Projects Section
const newProjectsSection = `
            <section id="projects" className="py-20 bg-white" aria-label="Featured Projects">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-medium text-[#202124] tracking-tight mb-4">
                            Explore the residences
                        </h2>
                        <p className="text-[#5F6368] text-lg">
                            Find the perfect configuration for your next chapter.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProjects.slice(0, 3).map((project, index) => (
                            <motion.div 
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                <ProjectCard project={project} priority={index < 3} />
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="mt-12 flex justify-center">
                        <Link to="/projects" className="google-btn-secondary">
                            View all projects
                            <span className="material-symbol">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>
`;

content = content.replace(/<section id="projects" className="py-24 bg-\[#FFFFFF\]" aria-label="Featured Projects">[\s\S]*?<\/section>/, newProjectsSection);

// The Location Section
const newLocationSection = `
            <section className="py-20 bg-[#F8F9FA] border-y border-[#DADCE0]">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F0FE] text-[#1a73e8] text-sm font-medium">
                                <span className="material-symbol text-lg">location_on</span>
                                Location
                            </div>
                            <h2 className="text-4xl md:text-5xl font-medium text-[#202124] tracking-tight mb-6">
                                Connected to everything that matters.
                            </h2>
                            <p className="text-[#5F6368] text-lg mb-8 max-w-md">
                                Situated in the heart of Hinjewadi Phase 1, Life Republic gives you unparalleled access to Pune's largest IT hub and the upcoming Metro Line 3.
                            </p>
                            
                            <div className="space-y-3">
                                {[
                                    { title: 'Hinjewadi Phase 1', dist: '10 Mins', icon: 'business_center' },
                                    { title: 'Mumbai Expressway', dist: '15 Mins', icon: 'directions_car' },
                                    { title: 'Metro Line 3', dist: 'Upcoming', icon: 'train' }
                                ].map((loc, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#DADCE0] hover:shadow-google transition-shadow">
                                        <div className="w-10 h-10 rounded-full bg-[#E8F0FE] text-[#1a73e8] flex items-center justify-center shrink-0">
                                            <span className="material-symbol">{loc.icon}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[#202124] font-medium">{loc.title}</p>
                                        </div>
                                        <div className="text-[#5F6368] font-medium text-sm bg-[#F1F3F4] px-3 py-1 rounded-full">
                                            {loc.dist}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-[32px] overflow-hidden shadow-google border border-[#DADCE0]">
                            <img src="/images/home/overview-img.jpg" alt="Life Republic Location" className="w-full aspect-square object-cover" />
                        </div>
                    </div>
                </div>
            </section>
`;

content = content.replace(/<section className="py-24 bg-\[#F5F5F7\]">[\s\S]*?<\/section>/, newLocationSection);

fs.writeFileSync(file, content);
