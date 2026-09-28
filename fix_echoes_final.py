import re

with open('src/lib/clusters.ts', 'r') as f:
    content = f.read()

# Update the global starting price for Echoes
content = re.sub(r'(id:\s*"echoes",[\s\S]*?price:\s*")₹86 Lacs\*(")', r'\g<1>₹92 Lakhs*\g<2>', content)

# Update the configurations array
old_configs = '''configurations: [
            { type: "2 BHK", size: "735 - 840 sq.ft.", price: "₹86 Lacs*" },
            { type: "2.5 BHK", size: "866 - 1,086 sq.ft.", price: "₹1.02 Cr*" }
        ],'''

new_configs = '''configurations: [
            { type: "2 BHK", size: "837 sq.ft.", price: "₹92 - 99 Lakhs*" },
            { type: "2.5 BHK", size: "963 - 978 sq.ft.", price: "₹1.02 - 1.10 Cr*" }
        ],'''

content = content.replace(old_configs, new_configs)

with open('src/lib/clusters.ts', 'w') as f:
    f.write(content)

