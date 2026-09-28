const fs = require('fs');
let file = 'src/pages/ProjectDetails.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace Gallery Alts
content = content.replace(
    /alt=\{\`Gallery \$\{i\+1\}\`\}/g,
    `alt={\`\${project.name} Premium \${project.category} Gallery Image \${i+1} at Life Republic Hinjewadi Pune\`}`
);

// Replace Floor Plan Alts
content = content.replace(
    /alt=\{\`Floor Plan \$\{i\+1\}\`\}/g,
    `alt={\`\${project.name} Master and Floor Plan \${i+1} Kolte Patil Life Republic Hinjewadi\`}`
);

// Replace Amenity Alts
content = content.replace(
    /alt=\{amenity\.name\}/g,
    `alt={\`\${amenity.name} Luxury Amenity at \${project.name} Life Republic Hinjewadi\`}`
);

// Replace Hero Image Alt
content = content.replace(
    /alt=\{project\.name\}/g,
    `alt={\`\${project.name} by Kolte-Patil Developers - Premium Township in Hinjewadi, Pune\`}`
);

fs.writeFileSync(file, content);
