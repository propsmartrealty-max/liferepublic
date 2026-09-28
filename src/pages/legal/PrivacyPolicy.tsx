import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="pt-32 pb-24 bg-[#1A1C23] min-h-[75vh]">
            <Helmet>
                <title>Privacy Policy | Kolte Patil Life Republic Hinjewadi</title>
                <meta name="description" content="Privacy Policy and Data Protection guidelines for Kolte Patil Life Republic. Read how we protect your information." />
            </Helmet>
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-[#151822] border border-white/10 rounded-3xl p-8 md:p-12 shadow-sm border border-white/5">
                    <div className="flex items-center gap-4 mb-8 text-accent">
                        <Shield size={32} />
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">Privacy Policy</h1>
                    </div>
                    
                    <div className="prose prose-lg prose-headings:font-serif prose-headings:text-white max-w-none text-gray-600">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>
                        
                        <h2>1. Information Collection</h2>
                        <p>When you use our website, we may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, such as:</p>
                        <ul>
                            <li>Name and Contact Data (Phone number, Email address)</li>
                            <li>IP address and browser characteristics</li>
                            <li>Interaction data via cookies (See our Cookie Policy)</li>
                        </ul>

                        <h2>2. How We Use Your Information</h2>
                        <p>We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. Specifically:</p>
                        <ul>
                            <li>To facilitate account creation and logon process.</li>
                            <li>To send you marketing and promotional communications regarding Kolte Patil Life Republic projects.</li>
                            <li>To respond to your inquiries and offer support.</li>
                        </ul>

                        <h2>3. Google Analytics & Advertising</h2>
                        <p>We use Google Analytics and Google Ads to understand our audience and deliver relevant advertisements. Google may use cookies to serve ads based on your prior visits to our website. You may opt out of personalized advertising by visiting Google's Ads Settings.</p>

                        <h2>4. Data Security</h2>
                        <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>

                        <h2>5. Contact Us</h2>
                        <p>If you have questions or comments about this policy, you may contact our Data Protection Officer at privacy@life-republic.in.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
