const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add loading="lazy" decoding="async" to the img tag
content = content.replace(
    /<img\n                        src={project\.image || project\.configurations\?\.\[0\]\?\.image}\n                        alt={project\.name || project\.title}/g,
    '<img\n                        loading="lazy"\n                        decoding="async"\n                        src={project.image || project.configurations?.[0]?.image}\n                        alt={project.name || project.title}'
);

fs.writeFileSync(file, content);
