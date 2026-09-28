const fs = require('fs');
let file = 'src/components/ui/ProjectCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the status badge logic
const oldBadge = `(project.status === 'Ready to Move' || project.status === 'Completed' || project.status === 'Ready Possession') ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                                    project.status === 'New Launch' ? 'bg-rainbow border-transparent text-white' : 
                                    'bg-white/10 text-white/90 border-white/20'`;

const newBadge = `project.status === 'Sold Out' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                    (project.status === 'Ready to Move' || project.status === 'Completed' || project.status === 'Ready Possession') ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                                    project.status === 'New Launch' ? 'bg-rainbow border-transparent text-white' : 
                                    'bg-white/10 text-white/90 border-white/20'`;

content = content.replace(oldBadge, newBadge);
fs.writeFileSync(file, content);
