import re

with open('src/pages/Home.tsx', 'r') as f:
    content = f.read()

old_kinetic = """<KineticText 
                        text="Life Republic." 
                        className="text-5xl md:text-5xl font-sans font-bold text-white tracking-tight mb-6 justify-center rainbow-aura"
                    />"""

new_kinetic = """<KineticText 
                        as="h1"
                        text="Kolte Patil Life Republic Township Hinjewadi" 
                        className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tighter mb-6 justify-center rainbow-aura leading-[1.1]"
                    />"""

content = content.replace(old_kinetic, new_kinetic)

with open('src/pages/Home.tsx', 'w') as f:
    f.write(content)
