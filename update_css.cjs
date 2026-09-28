const fs = require('fs');
let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

const additionalRainbowStyles = `
/* Advanced Rainbow Design Language */
.rainbow-border-wrap {
  position: relative;
  background: var(--lr-rainbow);
  padding: 1px;
  border-radius: inherit;
}
.rainbow-border-wrap::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: var(--lr-rainbow);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.3;
  transition: opacity 0.5s ease;
}
.rainbow-border-wrap:hover::before {
  opacity: 1;
}

.rainbow-aura {
  position: relative;
}
.rainbow-aura::after {
  content: "";
  position: absolute;
  inset: -20px;
  background: var(--lr-rainbow);
  filter: blur(60px);
  z-index: -1;
  opacity: 0.15;
  border-radius: 50%;
  animation: pulse-aura 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-aura {
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.1); }
}

.rainbow-text-clip {
  background: var(--lr-rainbow);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.rainbow-divider {
  height: 2px;
  background: var(--lr-rainbow);
  width: 100%;
  opacity: 0.5;
}
`;

if (!content.includes('.rainbow-border-wrap')) {
    content = content + additionalRainbowStyles;
    fs.writeFileSync(file, content);
}
