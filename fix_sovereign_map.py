with open('src/components/ui/SovereignMap.tsx', 'r') as f:
    content = f.read()

content = content.replace('<div className="font-sans font-bold text-white text-sm">Hinjewadi IT Corridor</div>', '<h2 className="font-sans font-bold text-white text-sm m-0">Properties Near Me: Hinjewadi</h2>')

content = content.replace('<Navigation size={14} /> Get Live Directions', '<Navigation size={14} /> Get Directions to Properties Near Me')

with open('src/components/ui/SovereignMap.tsx', 'w') as f:
    f.write(content)
