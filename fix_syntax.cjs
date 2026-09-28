const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// I'll just restore the img block manually and correctly
content = content.replace(/<img[\s\S]*?alt=\{project\.name \|\| project\.title\}[\s\S]*?\/>/g, 
\`<img
    loading="lazy"
    decoding="async"
    src={project.image || project.configurations?.[0]?.image}
    alt={project.name || project.title}
    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
/>\`);

// Also fix the weird duplicate that might have occurred:
content = content.replace(/i<img[\s\S]*?alt=\{project\.name \|\| project\.title\}/g, "");

fs.writeFileSync(file, content);
