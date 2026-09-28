const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update logic to cover all statuses perfectly
content = content.replace(
    /project.status === 'Ready to Move' \? 'bg-green-500\/20 text-green-300 border-green-500\/30' :/,
    `(project.status === 'Ready to Move' || project.status === 'Completed' || project.status === 'Ready Possession') ? 'bg-green-500/20 text-green-300 border-green-500/30' :`
);

fs.writeFileSync(file, content);
