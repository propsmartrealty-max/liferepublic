import re

with open('src/pages/Home.tsx', 'r') as f:
    content = f.read()

# Add import
import_stmt = "import { InteractiveMap } from '../components/ui/InteractiveMap';"
content = content.replace("import { ProjectComparison } from '../components/sections/ProjectComparison';", "import { ProjectComparison } from '../components/sections/ProjectComparison';\n" + import_stmt)

# Add component to the render
component_injection = """
            {/* Interactive Master Plan Section */}
            <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#050505] border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-3xl mb-16">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#E5C07B] text-sm font-bold uppercase tracking-widest mb-4 block"
                        >
                            Explore The Ecosystem
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6"
                        >
                            Interactive Master Plan
                        </motion.h2>
                        <p className="text-white/60 text-lg">
                            Hover over the sectors to explore real-time availability, pricing, and configurations across the ~390-acre Life Republic township.
                        </p>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <InteractiveMap />
                    </motion.div>
                </div>
            </section>
"""
content = content.replace("<ProjectComparison />", "<ProjectComparison />\n" + component_injection)

with open('src/pages/Home.tsx', 'w') as f:
    f.write(content)
