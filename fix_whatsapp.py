import re

def update_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # Find the success alert
    old_success = "alert('Thank you! We have received your enquiry and will contact you shortly.');"
    new_success = """alert('Thank you! We have received your enquiry. Redirecting you to our official WhatsApp desk for an instant E-Brochure...');
                const message = encodeURIComponent(`Hi, I'm ${formData.name}. I'm interested in ${formData.cluster || formData.project || 'your project'} ${formData.configuration}. Please share the E-Brochure.`);
                window.open(`https://wa.me/919876543210?text=${message}`, '_blank');"""
    
    # Also for EnquiryModal
    old_success_modal = "setSuccess(true);"
    new_success_modal = """setSuccess(true);
            setTimeout(() => {
                const message = encodeURIComponent(`Hi, I'm ${formData.name}. I'm interested in ${formData.project} ${formData.configuration}. Please share the E-Brochure and pricing details.`);
                window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
            }, 1500);"""
            
    content = content.replace(old_success, new_success)
    content = content.replace(old_success_modal, new_success_modal)
    
    with open(filename, 'w') as f:
        f.write(content)

update_file('src/pages/Contact.tsx')
update_file('src/components/ui/EnquiryModal.tsx')
