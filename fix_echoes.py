import re

with open('src/lib/clusters.ts', 'r') as f:
    content = f.read()

# Replace the Echoes 2.5 BHK price
content = content.replace('{ type: "2.5 BHK", size: "866 - 1,086 sq.ft.", price: "₹85 Lakhs*" }', '{ type: "2.5 BHK", size: "866 - 1,086 sq.ft.", price: "₹1.02 Cr*" }')

with open('src/lib/clusters.ts', 'w') as f:
    f.write(content)

