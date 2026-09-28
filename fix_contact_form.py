with open('src/pages/Contact.tsx', 'r') as f:
    content = f.read()

import re

# We need to replace the entire ContactForm component with a sleek glassmorphic version.
new_contact_form = """const ContactForm: React.FC = () => {
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
};"""

content = re.sub(r'const ContactForm: React\.FC = \(\) => \{.*', new_contact_form, content, flags=re.DOTALL)

with open('src/pages/Contact.tsx', 'w') as f:
    f.write(content)

