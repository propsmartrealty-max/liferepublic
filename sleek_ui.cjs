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
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Typography scaling
    content = content.replace(/text-8xl/g, 'text-7xl');
    content = content.replace(/text-7xl/g, 'text-6xl');
    content = content.replace(/text-6xl/g, 'text-5xl');
    
    // Padding scaling
    content = content.replace(/py-32/g, 'py-20');
    content = content.replace(/py-24/g, 'py-16');
    content = content.replace(/gap-16/g, 'gap-8');
    content = content.replace(/gap-12/g, 'gap-6');

    if (content !== original) {
        fs.writeFileSync(file, content);
    }
});
