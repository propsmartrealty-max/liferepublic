const fs = require('fs');

const waFile = 'src/components/ui/WhatsAppWidget.tsx';
let waContent = fs.readFileSync(waFile, 'utf8');

// Harden WhatsAppWidget
waContent = waContent.replace(/rounded-2xl/g, 'rounded-none');
waContent = waContent.replace(/rounded-xl/g, 'rounded-none');
waContent = waContent.replace(/rounded-full/g, 'rounded-none border-2 border-primary');
waContent = waContent.replace(/shadow-2xl border border-gray-100/g, 'border-2 border-primary shadow-hard');
waContent = waContent.replace(/shadow-lg hover:shadow-xl transition-shadow/g, 'shadow-hard hover:shadow-hard-hover transition-all');
waContent = waContent.replace(/className="fixed bottom-6 right-6/g, 'className="fixed bottom-8 right-8'); // Space it like a structural box
fs.writeFileSync(waFile, waContent);

const fcFile = 'src/components/ui/FloatingContact.tsx';
let fcContent = fs.readFileSync(fcFile, 'utf8');

// Harden FloatingContact
fcContent = fcContent.replace(/rounded-\[2rem\]/g, 'rounded-none');
fcContent = fcContent.replace(/rounded-full/g, 'rounded-none border-2 border-primary');
fcContent = fcContent.replace(/backdrop-blur-xl bg-white\/50 p-2/g, 'bg-surface p-0');
fcContent = fcContent.replace(/border border-white\/40 shadow-2xl/g, 'border-2 border-primary shadow-hard');
fcContent = fcContent.replace(/shadow-lg/g, 'shadow-none');
fcContent = fcContent.replace(/shadow-accent\/40/g, 'shadow-none');

fs.writeFileSync(fcFile, fcContent);
