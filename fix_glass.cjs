const fs = require('fs');

// 1. Re-Glassify Buttons
let btnFile = 'src/components/ui/Button.tsx';
let btnContent = fs.readFileSync(btnFile, 'utf8');
btnContent = btnContent.replace(/rounded-none/g, 'rounded-full');
btnContent = btnContent.replace(/bg-primary text-white border-2 border-primary shadow-hard hover:bg-white hover:text-primary hover:shadow-hard-hover/g, 'bg-accent/80 text-white backdrop-blur-xl border border-white/20 shadow-glass hover:bg-accent hover:shadow-glass-hover hover:-translate-y-1');
btnContent = btnContent.replace(/bg-background text-primary border-2 border-primary shadow-hard hover:bg-primary hover:text-white hover:shadow-hard-hover/g, 'bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-glass hover:bg-white/20');
btnContent = btnContent.replace(/bg-transparent text-primary border-2 border-primary shadow-hard hover:bg-primary hover:text-white hover:shadow-hard-hover/g, 'bg-transparent text-white border border-white/30 backdrop-blur-sm hover:bg-white/10');
btnContent = btnContent.replace(/bg-surface text-primary border-2 border-primary shadow-hard hover:shadow-hard-hover/g, 'bg-white/5 text-white backdrop-blur-2xl border border-white/10 shadow-glass hover:bg-white/10');
fs.writeFileSync(btnFile, btnContent);

// 2. Re-Glassify Navbar
let navFile = 'src/components/layout/Navbar.tsx';
let navContent = fs.readFileSync(navFile, 'utf8');
navContent = navContent.replace(/bg-surface border-b-2 border-border-strong/g, 'bg-black/20 backdrop-blur-xl border-b border-white/10');
navContent = navContent.replace(/text-primary/g, 'text-white');
navContent = navContent.replace(/bg-surface\/95 border-2 border-strong/g, 'bg-black/40 backdrop-blur-3xl border border-white/10 shadow-glass rounded-3xl');
navContent = navContent.replace(/bg-background/g, 'bg-black/90 backdrop-blur-3xl');
navContent = navContent.replace(/border-2 border-strong/g, 'border border-white/10');
navContent = navContent.replace(/border-strong/g, 'border-white/10');
navContent = navContent.replace(/rounded-none/g, 'rounded-2xl');
fs.writeFileSync(navFile, navContent);

// 3. Re-Glassify Widgets
let waFile = 'src/components/ui/WhatsAppWidget.tsx';
let waContent = fs.readFileSync(waFile, 'utf8');
waContent = waContent.replace(/rounded-none/g, 'rounded-2xl');
waContent = waContent.replace(/border-2 border-primary shadow-hard/g, 'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-glass text-white');
waContent = waContent.replace(/shadow-hard/g, 'shadow-glass');
fs.writeFileSync(waFile, waContent);

let fcFile = 'src/components/ui/FloatingContact.tsx';
let fcContent = fs.readFileSync(fcFile, 'utf8');
fcContent = fcContent.replace(/rounded-none/g, 'rounded-full');
fcContent = fcContent.replace(/bg-surface p-0/g, 'bg-white/10 backdrop-blur-2xl p-2 rounded-full border border-white/20 shadow-glass');
fcContent = fcContent.replace(/border-2 border-primary shadow-hard/g, 'shadow-glass');
fs.writeFileSync(fcFile, fcContent);

