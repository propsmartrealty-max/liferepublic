const fs = require('fs');
let file = 'src/components/ui/EnquiryModal.tsx';
let content = fs.readFileSync(file, 'utf8');

const correctSubmit = `
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (honeyRef.current?.value) {
            setIsSubmitted(true);
            return;
        }
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            const response = await fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    configuration: formData.get('configuration'),
                    cluster: formData.get('cluster') || formData.get('project'),
                    visit_date: formData.get('date'),
                    timing: formData.get('timing'),
                    _subject: "New Website Enquiry - Kolte Patil Life Republic"
                })
            });
            
            if (!response.ok) throw new Error('Submission failed');
            setIsSubmitted(true);
        } catch (err) {
            console.error(err);
            setError("Unable to submit. Please try again or call us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };
`;

content = content.replace(
    /const handleSubmit = async \(e: React\.FormEvent<HTMLFormElement>\) => \{[\s\S]*?finally \{\s*setIsSubmitting\(false\);\s*\}\s*\};/,
    correctSubmit
);

fs.writeFileSync(file, content);
