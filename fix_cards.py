import re

with open('src/pages/LocationHighlights.tsx', 'r') as f:
    content = f.read()

old_card = """className="bg-[#151822] border border-white/20 p-16 rounded-[24px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-white/20 group hover:border-accent transition-all flex flex-col justify-between\""""

new_card = """className="bg-white/80 backdrop-blur-2xl border-t border-l border-white/60 p-16 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] group hover:shadow-[0_40px_80px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between relative overflow-hidden\""""

content = content.replace(old_card, new_card)

# Let's add a colorful glow orb behind the icon
old_icon_container = """<div className="w-20 h-20 bg-white rainbow-text-clip font-bold rounded-[1.5rem] flex items-center justify-center mb-12 group-hover:bg-accent group-hover:text-[#202124] transition-all shadow-xl shadow-secondary/10">
                                        <group.icon size={32} />
                                    </div>"""

new_icon_container = """
                                    <div className="relative mb-12">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-[1.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                        <div className="relative w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center border border-black/5 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-500 text-black">
                                            <group.icon size={32} />
                                        </div>
                                    </div>
"""
content = content.replace(old_icon_container, new_icon_container.strip())

# Fix the bottom border 
old_bottom = """<div className="mt-16 pt-8 border-t border-white/20 flex items-center justify-between text-[10px] font-bold tracking-tight font-medium text-[#5F6368]">"""
new_bottom = """<div className="mt-16 pt-8 border-t border-black/5 flex items-center justify-between text-[10px] font-bold tracking-tight font-medium text-[#5F6368]">"""
content = content.replace(old_bottom, new_bottom)

with open('src/pages/LocationHighlights.tsx', 'w') as f:
    f.write(content)
