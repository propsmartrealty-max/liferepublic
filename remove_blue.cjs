const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Backgrounds
    content = content.replace(/bg-blue-50(0)?(\/[0-9]+)?/g, 'bg-white/5');
    content = content.replace(/bg-\[\#1a73e8\]/g, 'bg-rainbow');

    // Borders
    content = content.replace(/border-blue-[0-9]+(\/[0-9]+)?/g, 'border-white/20');
    content = content.replace(/border-\[\#1a73e8\]/g, 'border-white/20');
    content = content.replace(/border-\[\#DADCE0\]/g, 'border-white/20'); // also fix this old light theme border

    // Rings
    content = content.replace(/ring-blue-[0-9]+(\/[0-9]+)?/g, 'ring-white/20');

    // Text colors (if I missed any)
    content = content.replace(/text-blue-[0-9]+(\/[0-9]+)?/g, 'rainbow-text-clip font-bold');
    content = content.replace(/text-\[\#1a73e8\]/g, 'rainbow-text-clip font-bold');

    // Gradient stops
    content = content.replace(/from-blue-[0-9]+/g, 'from-black');
    content = content.replace(/via-blue-[0-9]+(\/[0-9]+)?/g, 'via-black/50');
    
    // Explicit mentions of "bg-blue-50 rainbow-text-clip font-bold"
    content = content.replace(/bg-blue-50 rainbow-text-clip/g, 'bg-white/5 border border-white/20 rainbow-text-clip');

    if (content !== original) {
        fs.writeFileSync(file, content);
    }
});
