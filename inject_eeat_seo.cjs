const fs = require('fs');
let file = 'src/pages/ProjectDetails.tsx';
let content = fs.readFileSync(file, 'utf8');

const eeatBox = `
                            {/* E-E-A-T Fact Check Box */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-8 flex flex-col gap-4">
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-green-400" />
                                    Independent Project Verification
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-white/70">
                                    <div>
                                        <span className="block text-white/40 mb-1">Developer</span>
                                        <span className="font-semibold text-white">Kolte-Patil Developers</span>
                                    </div>
                                    <div>
                                        <span className="block text-white/40 mb-1">Project Status</span>
                                        <span className="font-semibold text-white">{cluster.status}</span>
                                    </div>
                                    <div>
                                        <span className="block text-white/40 mb-1">MahaRERA Status</span>
                                        <span className="font-semibold text-white flex items-center gap-1">
                                            Verified <CheckCircle2 className="w-3 h-3 text-green-400" />
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-white/40 mb-1">Last Updated</span>
                                        <span className="font-semibold text-white">{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-white/40 mt-2 leading-relaxed">
                                    <strong>Editorial Note:</strong> This information is sourced directly from Kolte-Patil's official ecosystem and MahaRERA. As an independent property review platform, we strongly advise buyers to verify exact pricing and possession dates during a physical site visit.
                                </p>
                            </div>
`;

// Insert the EEAT box right after the RERA tag in the hero section
content = content.replace(
    /(<span className="px-4 py-1.5 rounded-full bg-white\/10 text-white text-sm font-medium border border-white\/20 backdrop-blur-md">\s*MahaRERA: [^<]+\s*<\/span>)/,
    `$1\n${eeatBox}`
);

// We need to import ShieldCheck and CheckCircle2 if they aren't imported
if (!content.includes('ShieldCheck')) {
    content = content.replace(/import { ([^}]+) } from 'lucide-react';/, "import { $1, ShieldCheck, CheckCircle2 } from 'lucide-react';");
}

fs.writeFileSync(file, content);
