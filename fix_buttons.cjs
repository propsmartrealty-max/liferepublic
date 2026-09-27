const fs = require('fs');
const file = 'src/components/ui/Button.tsx';
let content = fs.readFileSync(file, 'utf8');

// Harden Base Styles
content = content.replace(/rounded-full/g, 'rounded-none');
content = content.replace(/transition-all duration-300/, 'transition-all duration-100');

// Harden Variants
content = content.replace(/primary: ".*?"/, 'primary: "bg-primary text-white border-2 border-primary shadow-hard hover:bg-white hover:text-primary hover:shadow-hard-hover"');
content = content.replace(/secondary: ".*?"/, 'secondary: "bg-background text-primary border-2 border-primary shadow-hard hover:bg-primary hover:text-white hover:shadow-hard-hover"');
content = content.replace(/outline: ".*?"/, 'outline: "bg-transparent text-primary border-2 border-primary shadow-hard hover:bg-primary hover:text-white hover:shadow-hard-hover"');
content = content.replace(/ghost: ".*?"/, 'ghost: "text-primary hover:bg-primary hover:text-white border-2 border-transparent hover:border-primary"');
content = content.replace(/glass: ".*?"/, 'glass: "bg-surface text-primary border-2 border-primary shadow-hard hover:shadow-hard-hover"');

// Harden Sizes (remove rounded-full from icon)
content = content.replace(/icon: "h-12 w-12 rounded-none"/, 'icon: "h-12 w-12 rounded-none border-2 border-primary"');

// Remove soft bouncy animations
content = content.replace(/whileHover=\{\{ scale: 1.03, y: -2 \}\}/, 'whileHover={{ x: -2, y: -2 }}');
content = content.replace(/whileTap=\{\{ scale: 0.97 \}\}/, 'whileTap={{ x: 0, y: 0 }}');
content = content.replace(/transition=\{\{ type: "spring", stiffness: 400, damping: 25 \}\}/, 'transition={{ duration: 0.1 }}');

fs.writeFileSync(file, content);
