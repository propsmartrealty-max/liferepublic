import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AlertTriangle } from 'lucide-react';

export const Disclaimer: React.FC = () => {
    return (
        <div className="pt-4 pb-24 bg-[#F8F9FA] min-h-[75vh]">
            <Helmet>
                <title>Legal Disclaimer & MahaRERA Compliance | Kolte Patil Life Republic</title>
                <meta name="description" content="Legal Disclaimer and MahaRERA details for Kolte Patil Life Republic Township projects in Hinjewadi, Pune." />
            </Helmet>
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-[#151822] border border-white/20 rounded-3xl p-8 md:p-12 shadow-sm border border-white/20">
                    <div className="flex items-center gap-4 mb-8 rainbow-text-clip font-bold">
                        <AlertTriangle size={32} />
                        <h1 className="text-3xl md:text-4xl font-sans font-bold text-[#202124]">Legal Disclaimer</h1>
                    </div>
                    
                    <div className="prose prose-lg prose-headings:font-sans prose-headings:text-[#202124] max-w-none text-gray-600">
                        <h2>1. General Information</h2>
                        <p>This website is in the process of being updated in accordance with the provisions of the Real Estate (Regulation and Development) Act, 2016 and the Rules made thereunder ("RERA"). By accessing this website, the viewer confirms that the information including brochures and marketing collaterals on this website are solely for informational purposes only and the viewer has not relied on this information for making any booking/purchase in any project of the Company.</p>

                        <h2>2. Representative Imagery</h2>
                        <p>The imagery used on the website, including elevation, interior and exterior views, and virtual tours, are indicative and representational in nature. They do not constitute an offer, an invitation to offer and/or commitment of any nature. The actual designs, finishes, and colors may vary.</p>

                        <h2>3. Pricing & Specifications</h2>
                        <p>Prices, availability, and specifications are subject to change without prior notice. The dimensions and carpet areas mentioned in floor plans are approximate and subject to final measurement.</p>

                        <h2>4. Authorized Channel Partner & Marketing Disclosure</h2>
                        <p>This website is managed and operated by an Authorized Channel Partner / Real Estate Agent promoting Kolte Patil Life Republic Township projects in Hinjewadi, Pune. It serves strictly for project information dissemination, customer advisory, and lead generation. This site is not the official corporate website of Kolte-Patil Developers Ltd. (the promoter/developer). The official developer website can be accessed at <a href="https://www.koltepatil.com" target="_blank" rel="noopener noreferrer">https://www.koltepatil.com</a>.</p>

                        <h2>5. MahaRERA Registration & Compliance</h2>
                        <p>Real Estate Agent MahaRERA Registration Number: <strong>A52100039548</strong>.</p>
                        <p>The projects within Life Republic Township are registered with the Maharashtra Real Estate Regulatory Authority (MahaRERA). Registration certificates and details are verifiable on the official MahaRERA website:</p>
                        <ul>
                            <li><strong>Atmos (Sector R22):</strong> P52100051765</li>
                            <li><strong>Aros (Sector R13):</strong> P52100047921</li>
                            <li><strong>Echoes (Sector R31):</strong> PM1261012502409</li>
                            <li><strong>Duet (Sector R34):</strong> P52100079424</li>
                            <li><strong>Qrious (Sector R14):</strong> P52100079623</li>
                            <li><strong>Canvas (Sector R5):</strong> P52100077008</li>
                            <li><strong>The Universe (Sector R10):</strong> P52100027629</li>
                            <li><strong>24K Espada (Sector R31):</strong> P52100002646</li>
                            <li><strong>Nora Bungalow Plots (Sector R17B):</strong> P52100022278</li>
                        </ul>
                        <p>For more details, visit the official MahaRERA website at <a href="https://maharera.maharashtra.gov.in" target="_blank" rel="noopener noreferrer">https://maharera.maharashtra.gov.in</a>.</p>

                        <h2>6. Lead Generation & DND/NDNC Consent</h2>
                        <p>By submitting your contact details (name, email address, and mobile number) on any enquiry form, callback request, brochure download, or interactive calculator across this website, you expressly authorize our sales relationship managers and authorized representatives to contact you via Phone Calls, WhatsApp messages, or SMS regarding project updates, pricing, floor plans, and site visits, overriding any National Do Not Call (NDNC) or Telecom Do Not Disturb (DND) registration.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
