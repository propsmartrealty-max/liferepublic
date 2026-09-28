const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src/pages', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/bg-\[#0B0D14\]/g, 'bg-white');
    content = content.replace(/bg-\[#1A1C23\]/g, 'bg-[#F8F9FA]');
    content = content.replace(/bg-\[#030508\]/g, 'bg-white');
    content = content.replace(/text-white/g, 'text-[#202124]');
    content = content.replace(/text-gray-400/g, 'text-[#5F6368]');
    content = content.replace(/text-gray-500/g, 'text-[#5F6368]');
    content = content.replace(/text-accent/g, 'text-[#1a73e8]');
    content = content.replace(/border-white\/5/g, 'border-[#DADCE0]');
    content = content.replace(/border-white\/10/g, 'border-[#DADCE0]');
    content = content.replace(/border-white\/20/g, 'border-[#DADCE0]');
    content = content.replace(/rounded-\[3rem\]/g, 'rounded-[24px]');
    content = content.replace(/rounded-\[4rem\]/g, 'rounded-[24px]');
    content = content.replace(/rounded-\[2\.5rem\]/g, 'rounded-[24px]');
    content = content.replace(/font-serif/g, 'font-sans');
    fs.writeFileSync(filePath, content);
  }
});

walkDir('./src/components', function(filePath) {
  if (filePath.endsWith('.tsx') && !filePath.includes('Navbar.tsx') && !filePath.includes('HeroSlider.tsx') && !filePath.includes('ProjectCard.tsx') && !filePath.includes('Button.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/bg-\[#0B0D14\]/g, 'bg-white');
    content = content.replace(/bg-\[#1A1C23\]/g, 'bg-[#F8F9FA]');
    content = content.replace(/bg-\[#030508\]/g, 'bg-white');
    content = content.replace(/text-white/g, 'text-[#202124]');
    content = content.replace(/text-gray-400/g, 'text-[#5F6368]');
    content = content.replace(/text-gray-500/g, 'text-[#5F6368]');
    content = content.replace(/text-accent/g, 'text-[#1a73e8]');
    content = content.replace(/border-white\/5/g, 'border-[#DADCE0]');
    content = content.replace(/border-white\/10/g, 'border-[#DADCE0]');
    content = content.replace(/border-white\/20/g, 'border-[#DADCE0]');
    content = content.replace(/rounded-\[3rem\]/g, 'rounded-[24px]');
    content = content.replace(/rounded-\[4rem\]/g, 'rounded-[24px]');
    content = content.replace(/rounded-\[2\.5rem\]/g, 'rounded-[24px]');
    content = content.replace(/font-serif/g, 'font-sans');
    fs.writeFileSync(filePath, content);
  }
});
