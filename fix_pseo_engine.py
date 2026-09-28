with open('src/lib/pSEO-engine.ts', 'r') as f:
    content = f.read()

new_matrix = """export const pSEOMatrix = {
    intents: [
        { key: 'luxury', title: 'Luxury' },
        { key: 'premium', title: 'Premium' },
        { key: 'affordable', title: 'Affordable' },
        { key: 'ready-possession', title: 'Ready Possession' },
        { key: 'under-construction', title: 'Under Construction' },
        { key: 'investment', title: 'Investment' },
        { key: 'new-launch', title: 'New Launch' },
        { key: 'best', title: 'Best' },
        { key: 'top', title: 'Top' },
        { key: 'high-roi', title: 'High ROI' },
        { key: 'residential', title: 'Residential' },
        { key: 'township', title: 'Township' },
        { key: 'pre-launch', title: 'Pre Launch' },
        { key: 'walk-to-work', title: 'Walk to Work' }
    ],
    configurations: [
        { key: '1-bhk-flats', title: '1 BHK Flats' },
        { key: '2-bhk-flats', title: '2 BHK Flats' },
        { key: '3-bhk-flats', title: '3 BHK Flats' },
        { key: '4-bhk-flats', title: '4 BHK Flats' },
        { key: '5-bhk-flats', title: '5 BHK Flats' },
        { key: 'duplex', title: 'Duplex' },
        { key: 'penthouse', title: 'Penthouses' },
        { key: 'villas', title: 'Villas' },
        { key: 'row-houses', title: 'Row Houses' },
        { key: 'twin-bungalows', title: 'Twin Bungalows' },
        { key: 'studio-apartments', title: 'Studio Apartments' },
        { key: 'plots', title: 'Plots' }
    ],
    locations: [
        { key: 'hinjewadi-phase-1', title: 'Hinjewadi Phase 1' },
        { key: 'hinjewadi-phase-2', title: 'Hinjewadi Phase 2' },
        { key: 'hinjewadi-phase-3', title: 'Hinjewadi Phase 3' },
        { key: 'hinjewadi', title: 'Hinjewadi' },
        { key: 'wakad', title: 'Wakad' },
        { key: 'baner', title: 'Baner' },
        { key: 'balewadi', title: 'Balewadi' },
        { key: 'mahalunge', title: 'Mahalunge' },
        { key: 'punawale', title: 'Punawale' },
        { key: 'tathawade', title: 'Tathawade' },
        { key: 'bavdhan', title: 'Bavdhan' },
        { key: 'sus', title: 'Sus' },
        { key: 'pcmc', title: 'PCMC' },
        { key: 'pune-west', title: 'Pune West' },
        { key: 'it-park', title: 'IT Park' },
        { key: 'marunji', title: 'Marunji' },
        { key: 'kasarsai', title: 'Kasarsai' }
    ],
    entities: [
        { key: 'kolte-patil-life-republic', title: 'Kolte Patil Life Republic' },
        { key: 'life-republic-township', title: 'Life Republic Township' },
        { key: 'atmos', title: 'Atmos' },
        { key: 'aros', title: 'Aros' },
        { key: 'universe', title: 'Universe' },
        { key: 'canvas', title: 'Canvas' },
        { key: '24k-espada', title: '24K Espada' },
        { key: 'echoes', title: 'Echoes' }
    ]
};"""

import re
content = re.sub(r'export const pSEOMatrix = \{.*?\n\};\n', new_matrix + '\n', content, flags=re.DOTALL)

with open('src/lib/pSEO-engine.ts', 'w') as f:
    f.write(content)
