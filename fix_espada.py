import re

with open('src/lib/clusters.ts', 'r') as f:
    content = f.read()

# Update Espada configurations
old_espada = '{ type: "5 BHK Row House", size: "Premium Row House", price: "₹3.5 Cr*" }'
new_espada = '{ type: "5 BHK Row Villa", size: "3,618 sq.ft.", price: "₹3.5 Cr*" }'
content = content.replace(old_espada, new_espada)

with open('src/lib/clusters.ts', 'w') as f:
    f.write(content)

