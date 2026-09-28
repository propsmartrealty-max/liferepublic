const fs = require('fs');

// 1. Update Global CSS for Headings
let cssFile = 'src/index.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

// Ensure heading-hero and heading-section are uppercase
cssContent = cssContent.replace(
  /\.heading-hero \{/g,
  '.heading-hero {\n    text-transform: uppercase;'
);
cssContent = cssContent.replace(
  /\.heading-section \{/g,
  '.heading-section {\n    text-transform: uppercase;'
);
// Make all h1-h6 uppercase
cssContent = cssContent.replace(
  /h1, h2, h3, h4, h5, h6 \{\n    @apply font-serif tracking-tight text-secondary;\n  \}/g,
  'h1, h2, h3, h4, h5, h6 {\n    @apply font-serif tracking-tight text-secondary uppercase;\n  }'
);

fs.writeFileSync(cssFile, cssContent);

// 2. Update Navbar.tsx links to be uppercase
let navFile = 'src/components/layout/Navbar.tsx';
let navContent = fs.readFileSync(navFile, 'utf8');

navContent = navContent.replace(/capitalize tracking-normal/g, 'uppercase tracking-[0.15em]');
// Also ensure the Enquire Now button in Navbar is uppercase if it isn't
navContent = navContent.replace(/bg-primary text-white px-8 py-3 font-semibold text-\[15px\] tracking-tight gap-2/g, 'bg-primary text-white px-8 py-3 font-bold text-[13px] uppercase tracking-[0.2em] gap-2');

fs.writeFileSync(navFile, navContent);

