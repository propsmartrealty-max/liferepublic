const fs = require('fs');
let file = 'src/pages/ProjectDetails.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace old MahaRERA portal URL with the new official one
content = content.replace(
    /const reraVerificationUrl = `https:\/\/maharerait\.mahaonline\.gov\.in\/PrintPreview\/PrintPreview\/\?q=\$\{project\.rera\}`;/g,
    'const reraVerificationUrl = `https://maharera.maharashtra.gov.in/`;'
);

fs.writeFileSync(file, content);
