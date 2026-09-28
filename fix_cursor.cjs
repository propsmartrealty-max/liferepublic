const fs = require('fs');
let file = 'src/components/ui/CustomCursor.tsx';
let content = fs.readFileSync(file, 'utf8');

// Remove the Explore text block
content = content.replace(/<span className="text-xs font-medium font-sans">Explore<\/span>\n\s*<span className="material-symbol text-base">arrow_forward<\/span>/, '');

// Also remove the containing motion div to keep it super clean
content = content.replace(/<motion\.div[\s\S]*?animate={{ opacity: 1, scale: 1 }}[\s\S]*?className="flex items-center gap-2 whitespace-nowrap"[\s\S]*?>[\s\S]*?<\/motion\.div>/, '');

fs.writeFileSync(file, content);
