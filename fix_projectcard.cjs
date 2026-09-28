const fs = require('fs');

let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix slug vs id
content = content.replace(/project\.slug/g, "project.slug || project.id");
// Fix name vs title
content = content.replace(/project\.name/g, "project.name || project.title");

fs.writeFileSync(file, content);
