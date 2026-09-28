const fs = require('fs');
let file = 'src/components/ui/EnquiryModal.tsx';
let content = fs.readFileSync(file, 'utf8');

// The modal inputs use focus:ring-accent/10. I'll change it to border-rainbow on focus.
// And I need to insert a Date/Time input for Site Visit.
const selectBlock = `
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <select required name="cluster" defaultValue={projectName !== "Life Republic" ? projectName : ""} className="w-full px-8 py-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-[2rem] focus:ring-8 focus:ring-accent/10 outline-none transition-all font-bold text-[#202124] text-lg appearance-none cursor-pointer">
                                                    <option value="" disabled>Select Cluster</option>
                                                    <option value="Qrious">Qrious</option>
                                                    <option value="Canvas">Canvas</option>
                                                    <option value="Atmos">Atmos</option>
                                                    <option value="Aros">Aros</option>
                                                    <option value="Echoes">Echoes</option>
                                                    <option value="Espada">Espada</option>
                                                    <option value="Duet">Duet</option>

                                                </select>
                                                <select required name="configuration" defaultValue="" className="w-full px-8 py-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-[2rem] focus:ring-8 focus:ring-accent/10 outline-none transition-all font-bold text-[#202124] text-lg appearance-none cursor-pointer">
                                                    <option value="" disabled>Select Configuration</option>
                                                    <option value="2 BHK">2 BHK</option>
                                                    <option value="3 BHK">3 BHK</option>
                                                    <option value="4 BHK">4 BHK</option>
                                                    <option value="Row House / Villa">Row House / Villa</option>
                                                    <option value="Plot">Bungalow Plot</option>
                                                </select>
                                            </div>
`;

const newSelectBlock = `
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <select required name="cluster" defaultValue={projectName !== "Life Republic" ? projectName : ""} className="w-full px-8 py-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-[2rem] focus:outline-none focus:border-transparent focus:ring-4 focus:ring-blue-500/30 transition-all font-bold text-[#202124] text-lg appearance-none cursor-pointer">
                                                    <option value="" disabled>Select Cluster</option>
                                                    <option value="Qrious">Qrious</option>
                                                    <option value="Canvas">Canvas</option>
                                                    <option value="Atmos">Atmos</option>
                                                    <option value="Aros">Aros</option>
                                                    <option value="Echoes">Echoes</option>
                                                    <option value="Espada">Espada</option>
                                                    <option value="Duet">Duet</option>
                                                    <option value="Universe">Universe</option>
                                                </select>
                                                <select required name="configuration" defaultValue="" className="w-full px-8 py-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-[2rem] focus:outline-none focus:border-transparent focus:ring-4 focus:ring-blue-500/30 transition-all font-bold text-[#202124] text-lg appearance-none cursor-pointer">
                                                    <option value="" disabled>Select Configuration (Interest)</option>
                                                    <option value="1 BHK">1 BHK</option>
                                                    <option value="2 BHK">2 BHK</option>
                                                    <option value="2.5 BHK">2.5 BHK</option>
                                                    <option value="3 BHK">3 BHK</option>
                                                    <option value="4 BHK">4 BHK</option>
                                                    <option value="Row House / Villa">Row House / Villa</option>
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input required type="date" name="visit_date" aria-label="Site Visit Date" className="w-full px-8 py-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-[2rem] focus:outline-none focus:border-transparent focus:ring-4 focus:ring-blue-500/30 transition-all font-bold text-[#202124] text-lg text-gray-500" />
                                                <select required name="visit_time" defaultValue="" className="w-full px-8 py-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-[2rem] focus:outline-none focus:border-transparent focus:ring-4 focus:ring-blue-500/30 transition-all font-bold text-[#202124] text-lg appearance-none cursor-pointer text-gray-500">
                                                    <option value="" disabled>Select Visit Timing</option>
                                                    <option value="Morning (10 AM - 12 PM)">Morning (10 AM - 12 PM)</option>
                                                    <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                                                    <option value="Evening (3 PM - 6 PM)">Evening (3 PM - 6 PM)</option>
                                                </select>
                                            </div>
`;

content = content.replace(selectBlock, newSelectBlock);

// Upgrade the submit button to use the Rainbow design language
content = content.replace(
    /className="w-full h-20 rounded-full text-2xl font-bold shadow-2xl flex items-center justify-center gap-6 group"/,
    'className="w-full h-20 rounded-full text-2xl font-bold shadow-2xl flex items-center justify-center gap-6 group bg-rainbow-hover hover:glow-rainbow hover:border-transparent transition-all duration-500 border border-[#DADCE0]"'
);

// Upgrade inputs
content = content.replace(/focus:ring-8 focus:ring-accent\/10/g, 'focus:outline-none focus:border-transparent focus:ring-4 focus:ring-blue-500/30');

fs.writeFileSync(file, content);
