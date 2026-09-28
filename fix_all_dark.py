with open('src/pages/LocationHighlights.tsx', 'r') as f:
    content = f.read()

# Fix the location map overlay card
content = content.replace('bg-[#151822] border border-white/20/10 backdrop-blur-2xl rounded-[24px] border border-white/20 text-[#202124]', 'bg-white/90 backdrop-blur-2xl rounded-[24px] border border-black/10 text-[#202124] shadow-2xl')

# Fix the Synthesis Button
content = content.replace('bg-[#151822] border border-white/20 text-[#202124]', 'bg-black text-white')

# Fix the tiny icon container
content = content.replace('bg-[#151822] border border-white/20', 'bg-white border border-black/10')

with open('src/pages/LocationHighlights.tsx', 'w') as f:
    f.write(content)
