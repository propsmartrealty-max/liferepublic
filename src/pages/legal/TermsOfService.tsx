import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText } from 'lucide-react';

export const TermsOfService: React.FC = () => {
    return (
        <div className="pt-4 pb-24 bg-[#F8F9FA] min-h-[75vh]">
            <Helmet>
                <title>Terms of Service | Kolte Patil Life Republic Hinjewadi</title>
                <meta name="description" content="Terms of Service and Conditions of Use for the Kolte Patil Life Republic website." />
            </Helmet>
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-[#151822] border border-white/20 rounded-3xl p-8 md:p-12 shadow-sm border border-white/20">
                    <div className="flex items-center gap-4 mb-8 rainbow-text-clip font-bold">
                        <FileText size={32} />
                        <h1 className="text-3xl md:text-4xl font-sans font-bold text-[#202124]">Terms of Service</h1>
                    </div>
                    
                    <div className="prose prose-lg prose-headings:font-sans prose-headings:text-[#202124] max-w-none text-gray-600">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>
                        
                        <h2>1. Agreement to Terms</h2>
                        <p>By accessing this website, you agree to be bound by these Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>

                        <h2>2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>

                        <h2>3. Intellectual Property</h2>
                        <p>All content on this website, including but not limited to text, graphics, logos, images, floor plans, and digital downloads, is the property of Kolte Patil Developers Ltd or its content suppliers and is protected by Indian and international copyright laws.</p>

                        <h2>4. Limitations</h2>
                        <p>In no event shall Kolte Patil Developers Ltd or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.</p>

                        <h2>5. Lead Generation & Communication</h2>
                        <p>By submitting your contact information on this website, you expressly consent to receive communications from our sales team via phone calls, SMS, WhatsApp, and email regarding real estate projects, overriding any NDNC/DND registration.</p>

                        <h2>6. Governing Law</h2>
                        <p>Any claim relating to this website shall be governed by the laws of India without regard to its conflict of law provisions. The courts in Pune shall have exclusive jurisdiction.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
