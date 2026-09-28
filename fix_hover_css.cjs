const fs = require('fs');

let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

// Fix google-card hover apply
content = content.replace(/@apply bg-\[#F8F9FA\] rounded-\[24px\] border border-\[#DADCE0\] transition-shadow duration-300 hover:shadow-google overflow-hidden;/g, '@apply bg-[#F8F9FA] rounded-[24px] border border-[#DADCE0] transition-shadow duration-300 overflow-hidden;\n  }\n  .google-card:hover {\n    @apply shadow-google;');

// Fix hover states in buttons
content = content.replace(/@apply bg-\[#1a73e8\] text-white rounded-full px-6 py-2\.5 font-medium text-sm transition-colors hover:bg-\[#1557b0\] active:bg-\[#174ea6\] flex items-center justify-center gap-2;/g, '@apply bg-[#1a73e8] text-white rounded-full px-6 py-2.5 font-medium text-sm transition-colors flex items-center justify-center gap-2;\n  }\n  .google-btn:hover {\n    @apply bg-[#1557b0];\n  }\n  .google-btn:active {\n    @apply bg-[#174ea6];');

content = content.replace(/@apply bg-white border border-\[#DADCE0\] text-\[#1a73e8\] rounded-full px-6 py-2\.5 font-medium text-sm transition-colors hover:bg-\[#F8F9FA\] active:bg-\[#F1F3F4\] flex items-center justify-center gap-2;/g, '@apply bg-white border border-[#DADCE0] text-[#1a73e8] rounded-full px-6 py-2.5 font-medium text-sm transition-colors flex items-center justify-center gap-2;\n  }\n  .google-btn-secondary:hover {\n    @apply bg-[#F8F9FA];\n  }\n  .google-btn-secondary:active {\n    @apply bg-[#F1F3F4];');

fs.writeFileSync(file, content);
