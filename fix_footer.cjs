const fs = require('fs');
let file = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

const townshipFaqs = `
                {/* Township FAQs */}
                <div className="border-t border-strong py-12 mt-12">
                    <h5 className="text-xl font-bold text-[#202124] tracking-tight mb-8">Frequently Asked Questions: Kolte Patil Life Republic Pune</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div className="space-y-6">
                            <div>
                                <h6 className="font-bold text-[#202124] mb-2">What is Kolte Patil Life Republic?</h6>
                                <p className="text-text-muted">Life Republic by Kolte-Patil is a ~390-acre integrated township in Hinjewadi, Pune. It features premium residential clusters (like Canvas, Qrious, Duet, and Echoes), high-street retail, schools, and 50+ world-class amenities designed for a holistic community lifestyle.</p>
                            </div>
                            <div>
                                <h6 className="font-bold text-[#202124] mb-2">Where is Life Republic located?</h6>
                                <p className="text-text-muted">The township is strategically located at Survey No. 74, Marunji, Hinjawadi-Marunji-Kasarsai Road, Taluka Mulshi, Pune 411057, just ~4.5 km from the Hinjewadi IT Park Phase 1, offering excellent connectivity to Mumbai-Bengaluru Highway.</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h6 className="font-bold text-[#202124] mb-2">What are the configurations and price range?</h6>
                                <p className="text-text-muted">Life Republic offers smart 2 & 3 BHKs (Qrious, Echoes) starting from ₹75 Lakhs, to Ultra-Luxury 3 & 4 BHKs (Canvas) starting at ₹1.45 Cr, catering to IT professionals and luxury home buyers.</p>
                            </div>
                            <div>
                                <h6 className="font-bold text-[#202124] mb-2">Are the projects MahaRERA registered?</h6>
                                <p className="text-text-muted">Yes, all active clusters within the Life Republic township are fully registered under MahaRERA. Specific numbers (e.g., P52100077008 for Canvas) are listed below for verification.</p>
                            </div>
                        </div>
                    </div>
                </div>
`;

// Insert it right before RERA Numbers Section
content = content.replace(
    /\{\/\* RERA Numbers Section \*\/\}/,
    townshipFaqs + '\n                {/* RERA Numbers Section */}'
);

fs.writeFileSync(file, content);
