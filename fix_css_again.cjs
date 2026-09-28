const fs = require('fs');

const cssContent = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-size: 16px;
    background-color: #000000;
  }
  
  body {
    @apply text-white font-sans overflow-x-hidden;
    background: #000000;
  }

  body::before {
    content: '';
    position: fixed;
    top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle at 50% 50%, rgba(54, 168, 73, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 80% 20%, rgba(240, 124, 39, 0.03) 0%, transparent 30%);
    z-index: -1;
    pointer-events: none;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif tracking-tight text-white;
  }
}

@layer components {
  .glass-panel {
    @apply bg-[#1C1C1E]/60 backdrop-blur-[40px] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-[2.5rem];
  }
  
  .glass-card {
    @apply bg-[#1C1C1E]/40 backdrop-blur-[30px] border border-white/[0.05] rounded-[2rem] shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-700 hover:bg-[#2C2C2E]/60 hover:border-white/[0.12] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)];
  }

  .heading-hero {
    @apply text-6xl md:text-8xl lg:text-[7rem] font-serif font-medium tracking-[-0.04em] leading-[1.05] text-white;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .heading-section {
    @apply text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-[-0.03em] leading-[1.1] text-white mb-8;
  }

  .text-golden-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-[#36A849] to-[#80E090];
  }
}

@layer utilities {
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

.fade-in {
  animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

fs.writeFileSync('src/index.css', cssContent);
