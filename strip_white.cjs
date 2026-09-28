const fs = require('fs');
const path = require('path');

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Strip blinding white backgrounds
            content = content.replace(/className="([^"]*)bg-white([^"]*)"/g, (match, p1, p2) => {
                // If it's a section or main wrapper, use dark background
                if (p1.includes('py-') || p1.includes('section') || p1.includes('container') || p1.includes('min-h-screen')) {
                    return `className="${p1}bg-[#0B0D14]${p2}"`;
                }
                // If it's a card (rounded, shadow)
                if (p1.includes('rounded') || p2.includes('rounded') || p1.includes('shadow') || p2.includes('shadow')) {
                    return `className="${p1}bg-[#151822] border border-white/10${p2}"`;
                }
                // Default fallback
                return `className="${p1}bg-transparent${p2}"`;
            });

            // Strip light text colors
            content = content.replace(/text-gray-900/g, 'text-white');
            content = content.replace(/text-gray-800/g, 'text-white');
            content = content.replace(/text-gray-700/g, 'text-gray-300');
            content = content.replace(/text-secondary/g, 'text-white');

            // Strip bright borders
            content = content.replace(/border-gray-200/g, 'border-white/10');
            content = content.replace(/border-gray-100/g, 'border-white/5');

            // Change bg-gray-50 (light surfaces)
            content = content.replace(/bg-gray-50/g, 'bg-[#1A1C23]');
            content = content.replace(/bg-gray-100/g, 'bg-[#151822]');

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
            }
        }
    });
}

processDir('./src/pages');
processDir('./src/components');
