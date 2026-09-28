import re

with open('src/pages/Contact.tsx', 'r') as f:
    content = f.read()

old_handle_submit = """
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await import('../services/api').then(m => m.api.leads.create({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                project_id: formData.cluster,
                message: `Cluster: ${formData.cluster || 'Not Specified'} | Configuration: ${formData.configuration || 'Not Specified'} | Msg: ${formData.message}`
            }));
            alert('Thank you! We will contact you shortly.');
            setFormData({ name: '', phone: '', email: '', cluster: '', configuration: '', message: '' });
        } catch (e) {
            console.error(e);
            alert('System busy. Redirecting to WhatsApp desk for immediate assistance...');
            const message = encodeURIComponent(`Hi, I'm ${formData.name}. I'm interested in ${formData.cluster} ${formData.configuration}. ${formData.message}`);
            window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
        } finally {
            setLoading(false);
        }
    };
"""

new_handle_submit = """
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
                alert('Thank you! We have received your enquiry and will contact you shortly.');
                setFormData({ name: '', phone: '', email: '', cluster: '', configuration: '', message: '' });
            } else {
                throw new Error("Form submission failed");
            }
        } catch (e) {
            console.error(e);
            alert('Unable to submit right now. Redirecting to WhatsApp desk for immediate assistance...');
            const message = encodeURIComponent(`Hi, I'm ${formData.name}. I'm interested in ${formData.cluster} ${formData.configuration}. ${formData.message}`);
            window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
        } finally {
            setLoading(false);
        }
    };
"""

content = content.replace(old_handle_submit.strip(), new_handle_submit.strip())

with open('src/pages/Contact.tsx', 'w') as f:
    f.write(content)
