const fs = require('fs');
let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

// The CSS mask trick is buggy. Let's just use a pseudo element with a background and z-index.
content = content.replace(/\.rainbow-border-wrap::before {[\s\S]*?opacity: 0\.3;[\s\S]*?}/, `.rainbow-border-wrap::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: var(--lr-rainbow);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  opacity: 0.3;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: 10;
}`);

// Also fix ProjectCard to revert to rainbow-border-wrap
let cardFile = 'src/components/ui/ProjectCard.tsx';
let cardContent = fs.readFileSync(cardFile, 'utf8');
cardContent = cardContent.replace(/p-\[2px\] bg-rainbow hover:bg-rainbow-hover/g, 'rainbow-border-wrap');
fs.writeFileSync(cardFile, cardContent);

fs.writeFileSync(file, content);
