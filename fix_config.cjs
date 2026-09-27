const fs = require('fs');

const twFile = 'tailwind.config.js';
let twContent = fs.readFileSync(twFile, 'utf8');

twContent = twContent.replace(/'border-strong': 'var\(--border-strong\)',/g, ''); // Remove from colors
twContent = twContent.replace(/colors: \{/g, "borderColor: { strong: 'var(--border-strong)' },\n      colors: {");

fs.writeFileSync(twFile, twContent);

// Update ALL files using border-border-strong to border-strong
const execSync = require('child_process').execSync;
execSync("find src -type f -name '*.*' -exec sed -i '' 's/border-border-strong/border-strong/g' {} +");
