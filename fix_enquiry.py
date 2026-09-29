with open('src/components/ui/EnquiryModal.tsx', 'r') as f:
    content = f.read()

content = content.replace("await api.forms.submitEnquiry(formData);", "await api.leads.create({ name: formData.get('name'), phone: formData.get('mobile'), email: formData.get('email'), project_id: projectName });")

with open('src/components/ui/EnquiryModal.tsx', 'w') as f:
    f.write(content)
