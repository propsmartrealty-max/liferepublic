const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// We need to replace the bottom flex row with a richer set of links
const oldFooter = \`                    <div className="flex items-end justify-between border-t border-white/10 pt-5">
                        <div>
                            <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Starting at</p>
                            <p className="text-white text-lg font-medium">{displayPrice}</p>
                        </div>
                        <div className="flex items-center gap-2 text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 delay-150 group-hover:text-rainbow">
                            <span className="text-xs uppercase tracking-widest font-medium">Explore</span>
                            <span className="material-symbol text-sm">arrow_forward</span>
                        </div>
                    </div>\`;

const newFooter = \`                    <div className="border-t border-white/10 pt-5 mt-4">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">Pricing Structure</p>
                                <p className="text-white text-lg font-medium">{displayPrice}</p>
                            </div>
                            <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 delay-150 text-rainbow">
                                <span className="text-xs uppercase tracking-widest font-medium">Full Overview</span>
                                <span className="material-symbol text-sm">arrow_forward</span>
                            </div>
                        </div>
                        
                        {/* Quick Access Links (Reveals on Hover) */}
                        <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 -translate-y-2 group-hover:translate-y-0">
                            {['Master Plan', 'Floor Plans', 'Location', 'Sizes'].map(link => (
                                <button 
                                    key={link}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { project: displayName, type: link } }));
                                    }}
                                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-[10px] text-white/80 tracking-widest uppercase transition-colors"
                                >
                                    {link}
                                </button>
                            ))}
                        </div>
                    </div>\`;

content = content.replace(oldFooter, newFooter);

// Adjust height from 550px to 600px to fit the new buttons without squishing
content = content.replace(/h-\[550px\]/g, 'h-[600px]');

fs.writeFileSync(file, content);
