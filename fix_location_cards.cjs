const fs = require('fs');

let file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the entire location section
const oldLocationStart = content.indexOf('{/* Phase 5: Location Authority */}');
const oldLocationEnd = content.indexOf('{/* Phase 6: Interactive Depth */}');

if (oldLocationStart !== -1 && oldLocationEnd !== -1) {
    const newLocationHTML = `
            {/* Phase 5: Location Authority */}
            <section className="py-24 bg-[#0B0D14] text-white border-y border-white/5 relative overflow-hidden" aria-label="Hinjewadi Investment Location Advantage">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block py-1 px-4 rounded-full border border-[#E5C07B]/30 text-[#E5C07B] text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                            📍 STRATEGIC CONNECTIVITY & PROXIMITY
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-white">
                            Minutes From Everywhere, <span className="text-[#E5C07B]">Miles From Chaos</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
                            Seamless access to Hinjewadi IT Park, Wakad, and Pune-Mumbai Expressway via the multi-level Wakad junction.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                        {[
                            { time: '5 Mins', title: 'Hinjewadi IT Park', desc: 'Phase 1 • Direct IT Hub Access' },
                            { time: '10 Mins', title: 'Wakad Junction', desc: '4.5 km • Mumbai-Bengaluru Hwy' },
                            { time: '15 Mins', title: 'Ruby Hall Clinic', desc: '7 km • Multi-Specialty Healthcare' },
                            { time: 'On-Campus', title: 'Anisha Global', desc: '0 km • Inside 390-Acre Township' },
                            { time: 'Walking Dist', title: 'High Street', desc: '100 m • Premium Retail Hub' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-xl border border-white/10 bg-[#151822]/50 hover:bg-[#151822] hover:border-[#E5C07B]/30 transition-all duration-300 text-center flex flex-col justify-center min-h-[140px]"
                            >
                                <h3 className="text-[#E5C07B] text-xl font-serif font-bold mb-2">{item.time}</h3>
                                <h4 className="text-white text-sm font-bold mb-1">{item.title}</h4>
                                <p className="text-gray-500 text-[10px] uppercase tracking-wider">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
`;
    content = content.substring(0, oldLocationStart) + newLocationHTML + content.substring(oldLocationEnd);
    fs.writeFileSync(file, content);
}
