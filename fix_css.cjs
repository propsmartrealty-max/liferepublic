const fs = require('fs');
let file = 'src/index.css';
let content = fs.readFileSync(file, 'utf8');

const rainbowGradient = `
:root {
  /* Life Republic Logo Strip Colors */
  --lr-red: #E31837;
  --lr-orange: #F37021;
  --lr-yellow: #FFC20E;
  --lr-green: #008A4B;
  --lr-cyan: #009CDE;
  --lr-blue: #0033A0;
  --lr-pink: #E8114B;
  
  --lr-rainbow: linear-gradient(90deg, var(--lr-red), var(--lr-orange), var(--lr-yellow), var(--lr-green), var(--lr-cyan), var(--lr-blue), var(--lr-pink));
  --lr-rainbow-vertical: linear-gradient(180deg, var(--lr-red), var(--lr-orange), var(--lr-yellow), var(--lr-green), var(--lr-cyan), var(--lr-blue), var(--lr-pink));
}

.text-rainbow {
  background: var(--lr-rainbow);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bg-rainbow {
  background: var(--lr-rainbow);
}

.bg-rainbow-hover:hover {
  background: var(--lr-rainbow);
  color: white !important;
  border-color: transparent !important;
}

.border-rainbow-hover:hover {
  border-image: var(--lr-rainbow) 1;
}

.glow-rainbow {
  box-shadow: 0 0 40px rgba(227, 24, 55, 0.2), 0 0 80px rgba(0, 156, 222, 0.2);
}
`;

content = content.replace(/@tailwind utilities;/, "@tailwind utilities;\n" + rainbowGradient);

fs.writeFileSync(file, content);
