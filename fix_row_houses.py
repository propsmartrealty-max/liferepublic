import re

with open('src/lib/clusters.ts', 'r') as f:
    content = f.read()

# Fix Espada (24k-espada)
# Current config: { type: "3 BHK", ... }, { type: "4 BHK", ... }
# Change to: { type: "5 BHK Row House", size: "On Request", price: "₹3.5 Cr*" }

espada_pattern = re.compile(r'(id:\s*"24k-espada",[\s\S]*?configurations:\s*\[\s*)([\s\S]*?)(\s*\])', re.IGNORECASE)
content = espada_pattern.sub(r'\g<1>{ type: "5 BHK Row House", size: "Premium Row House", price: "₹3.5 Cr*" }\g<3>', content)


# Fix Sound of Soul (sound-of-soul)
# Current config: { type: "4 BHK Row House", size: "1800 sq.ft.", price: "₹3.40 Cr*" }
# Wait, let's just make sure it precisely matches the user's latest "sound of soul 4BHK Row House" 
# with the 3.40Cr price they provided earlier.

sos_pattern = re.compile(r'(id:\s*"sound-of-soul",[\s\S]*?configurations:\s*\[\s*)([\s\S]*?)(\s*\])', re.IGNORECASE)
content = sos_pattern.sub(r'\g<1>{ type: "4 BHK Row House", size: "Premium Row House", price: "₹3.40 Cr*" }\g<3>', content)


with open('src/lib/clusters.ts', 'w') as f:
    f.write(content)

