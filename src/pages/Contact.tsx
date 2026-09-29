import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/seo/SEO';


export const Contact: React.FC = () => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Sunday

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Kolte Patil Life Republic Sales Office",
        "image": "/images/gallery/eros/master-layout.webp",
        "url": "https://life-republic.in/contact",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Life Republic Township, Marunji",
            "addressLocality": "Hinjawadi, Pune",
            "postalCode": "411057",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 18.5995,
            "longitude": 73.7153
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "09:00",
            "closes": "19:00"
        }
    };

    return (
        <div className="pt-4">
            <SEO
                title="Contact Kolte Patil Life Republic Sales Office | Hinjewadi"
                description="Get in touch with the sales team for Life Republic by Kolte Patil. Schedule a VIP site visit, request a brochure, or request a callback for best deals."
                keywords="Life Republic Contact No, Kolte Patil Sales Office Hinjewadi, Life Republic Address, Site Visit Life Republic, Booking Office Hinjewadi, Kolte Patil Customer Care"
                canonical="/contact"
                schema={localBusinessSchema}
            />
                        <section className="bg-white text-[#202124] pt-32 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-5xl font-sans font-bold mb-6"
                    >
                        Contact Kolte Patil Life Republic Sales
                    </motion.h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-300">
                        Get in touch with us to find your dream home at Life Republic.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-sans font-bold text-[#202124] mb-6">Get in Touch</h2>
                            <p className="text-gray-600 text-lg">
                                Have questions? Our experts are here to help you navigate your home buying journey.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center rainbow-text-clip font-bold flex-shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#202124] mb-2">Visit Us</h3>
                                    <p className="text-gray-600">Life Republic Township, Marunji, Hinjawadi, Pune, Maharashtra 411057</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center rainbow-text-clip font-bold flex-shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#202124] mb-2">Digital Sales Desk</h3>
                                    <p className="text-gray-600">Submit an enquiry to request an instant callback from our advisors.</p>
                                    <p className="text-[#5F6368] text-sm mt-2">Mon - Sun: 9:00 AM - 7:00 PM</p>
                                </div>
                            </div>


                            <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-white/20 h-[300px]">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.996160105342!2d73.71261537446698!3d18.57416346752763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc6e326466f%3A0xc07c3905cf6ce12a!2sKolte%20Patil%20Life%20Republic!5e0!3m2!1sen!2sin!4v1704100000000!5m2!1sen!2sin" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen={true} 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Location of Kolte Patil Life Republic"
                                ></iframe>
                            </div>
                            <div className="mt-4">
                                <a 
                                    href="https://www.google.com/maps/dir//Life+Republic+Sales+Office+Or+Main+Office,+Survey+No.+74+Hinjawadi+-+Marunji,+Hinjawadi+-+Kasarsai+Rd,+Taluka,+Mulshi,+Maharashtra+411033/@18.6459725,73.7360171,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bc2ba5053b55b4b:0x14d3205e23f3f5f7!2m2!1d73.7093735!2d18.6182576?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white py-4 rounded-xl font-bold transition-colors shadow-lg"
                                >
                                    <span className="material-symbol">directions</span>
                                    Get Directions to Sales Office
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-0">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    );
};

const ContactForm: React.FC = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        email: '',
        cluster: '',
        configuration: '',
        message: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formPayload = new FormData();
            formPayload.append("name", formData.name);
            formPayload.append("phone", formData.phone);
            formPayload.append("email", formData.email);
            formPayload.append("project", formData.cluster || "Not Specified");
            formPayload.append("configuration", formData.configuration || "Not Specified");
            formPayload.append("message", formData.message);
            formPayload.append("_subject", "New Enquiry from Contact Page | Life Republic");

            const response = await fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
                method: "POST",
                body: formPayload
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    const message = encodeURIComponent(`Hi, I'm ${formData.name}. I'm interested in ${formData.cluster || formData.project || 'your project'} ${formData.configuration}. Please share the E-Brochure.`);
                    window.open(`https://wa.me/917744009295?text=${message}`, '_blank');
                    setFormData({ name: '', phone: '', email: '', cluster: '', configuration: '', message: '' });
                    setSuccess(false);
                }, 2000);
            } else {
                throw new Error("Form submission failed");
            }
        } catch (e) {
            console.error(e);
            alert('Unable to submit right now. Redirecting to WhatsApp desk for immediate assistance...');
            const message = encodeURIComponent(`Hi, I'm ${formData.name}. I'm interested in ${formData.cluster} ${formData.configuration}. ${formData.message}`);
            window.open(`https://wa.me/917744009295?text=${message}`, '_blank');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center bg-[#0F1115] rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbol text-4xl">check_circle</span>
                </div>
                <h3 className="text-3xl font-sans font-bold text-white mb-2">Request Verified</h3>
                <p className="text-white/50 text-sm">Transferring you to our secure WhatsApp concierge...</p>
            </div>
        );
    }

    return (
        <form className="space-y-8 bg-[#0F1115] p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden" onSubmit={handleSubmit}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] pointer-events-none rounded-full"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                    <input
                        id="contact-name" required type="text" placeholder=" "
                        className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent transition-colors placeholder-transparent"
                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    <label htmlFor="contact-name" className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-white/40 peer-valid:uppercase peer-valid:tracking-widest cursor-text">
                        Full Name *
                    </label>
                </div>
                <div className="relative group">
                    <input
                        id="contact-phone" required type="tel" pattern="[0-9]{10}" placeholder=" "
                        className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent transition-colors placeholder-transparent"
                        value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <label htmlFor="contact-phone" className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-white/40 peer-valid:uppercase peer-valid:tracking-widest cursor-text">
                        Phone Number *
                    </label>
                </div>
            </div>

            <div className="relative z-10 group">
                <input
                    id="contact-email" required type="email" placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent transition-colors placeholder-transparent"
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
                <label htmlFor="contact-email" className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-white/40 peer-valid:uppercase peer-valid:tracking-widest cursor-text">
                    Email Address *
                </label>
            </div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div className="relative">
                    <select
                        required
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                        value={formData.cluster}
                        onChange={e => setFormData({ ...formData, cluster: e.target.value })}
                    >
                        <option value="" disabled className="bg-[#0F1115]">Select Cluster</option>
                        <option value="Qrious" className="bg-[#0F1115]">Qrious</option>
                        <option value="Canvas" className="bg-[#0F1115]">Canvas</option>
                        <option value="Atmos" className="bg-[#0F1115]">Atmos</option>
                        <option value="Aros" className="bg-[#0F1115]">Aros</option>
                        <option value="Echoes" className="bg-[#0F1115]">Echoes</option>
                        <option value="Espada" className="bg-[#0F1115]">Espada</option>
                        <option value="Duet" className="bg-[#0F1115]">Duet</option>
                    </select>
                    <label className="absolute left-0 -top-4 text-[10px] text-white/40 uppercase tracking-widest">Cluster *</label>
                </div>
                <div className="relative">
                    <select
                        required
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                        value={formData.configuration}
                        onChange={e => setFormData({ ...formData, configuration: e.target.value })}
                    >
                        <option value="" disabled className="bg-[#0F1115]">Select Config</option>
                        <option value="2 BHK" className="bg-[#0F1115]">2 BHK</option>
                        <option value="3 BHK" className="bg-[#0F1115]">3 BHK</option>
                        <option value="4 BHK" className="bg-[#0F1115]">4 BHK</option>
                        <option value="Row House / Villa" className="bg-[#0F1115]">Row House / Villa</option>
                        <option value="Plot" className="bg-[#0F1115]">Bungalow Plot</option>
                    </select>
                    <label className="absolute left-0 -top-4 text-[10px] text-white/40 uppercase tracking-widest">Configuration *</label>
                </div>
            </div>

            <div className="relative z-10 group pt-2">
                <textarea
                    id="contact-message" required placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent transition-colors placeholder-transparent resize-none h-24"
                    value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                <label htmlFor="contact-message" className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-white/40 peer-valid:uppercase peer-valid:tracking-widest cursor-text">
                    Your Requirements *
                </label>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="relative z-10 w-full py-4 rounded-xl text-xs font-bold tracking-widest uppercase shadow-2xl flex items-center justify-center gap-3 bg-white text-black hover:bg-accent hover:text-white transition-all duration-500 disabled:opacity-50 group"
            >
                {loading ? 'Authenticating...' : 'Send Secure Request'}
                {!loading && <span className="material-symbol group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>}
            </button>
        </form>
    );
};