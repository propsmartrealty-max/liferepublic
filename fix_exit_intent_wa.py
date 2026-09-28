import re

with open('src/components/ui/ExitIntentOffer.tsx', 'r') as f:
    content = f.read()

new_submit = """
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const mobile = formData.get('mobile');
        
        const message = `Hello, I would like to access the Private Beta Price List for Life Republic.\\n\\nName: ${name}\\nMobile: ${mobile}`;
        window.open(`https://wa.me/917744009295?text=${encodeURIComponent(message)}`, '_blank');
        setIsVisible(false);
    };
"""

content = re.sub(r'const handleSubmit = \(e: React\.FormEvent\) => \{.*?setIsVisible\(false\);\n    \};', new_submit.strip(), content, flags=re.DOTALL)
content = content.replace('name="name"', '') # clear first
content = content.replace('name="mobile"', '') # clear first
content = content.replace('placeholder=" "\n                                    className="peer', 'name="name"\n                                    placeholder=" "\n                                    className="peer', 1)
content = content.replace('placeholder=" "\n                                    className="peer', 'name="mobile"\n                                    placeholder=" "\n                                    className="peer', 1)

with open('src/components/ui/ExitIntentOffer.tsx', 'w') as f:
    f.write(content)
