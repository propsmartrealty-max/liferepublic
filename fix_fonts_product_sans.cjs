const fs = require('fs');
let tailwindFile = 'tailwind.config.js';
let tailwindContent = fs.readFileSync(tailwindFile, 'utf8');

// Set both sans and serif to use Outfit (the closest Google Sans alternative)
tailwindContent = tailwindContent.replace(/sans: \['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'\],/g, `sans: ['"Outfit"', 'system-ui', '-apple-system', 'sans-serif'],`);
tailwindContent = tailwindContent.replace(/serif: \['"Outfit"', 'system-ui', 'sans-serif'\],/g, `serif: ['"Outfit"', 'system-ui', 'sans-serif'],`);
fs.writeFileSync(tailwindFile, tailwindContent);

