import re

with open('src/components/layout/Navbar.tsx', 'r') as f:
    content = f.read()

cmd_k_button = """
                    <button 
                        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors text-xs font-mono cursor-interactive"
                    >
                        <span className="material-symbol text-sm">search</span>
                        Cmd K
                    </button>
                    <button
"""

content = content.replace('<button\n                        onClick={() => window.dispatchEvent(new CustomEvent(\'open-enquiry\'))}', cmd_k_button + "                        onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry'))}")


with open('src/components/layout/Navbar.tsx', 'w') as f:
    f.write(content)
