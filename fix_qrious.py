import re

with open('src/lib/clusters.ts', 'r') as f:
    content = f.read()

# Update the global starting price for Qrious
content = re.sub(r'(id:\s*"qrious",[\s\S]*?price:\s*")₹85 Lacs\*(")', r'\g<1>₹89 Lakhs*\g<2>', content)

# Update the description
old_desc = '''description: "Qrious offers technology-enabled 2 and 3 BHK homes tailored for IT professionals, located just 10 minutes from Hinjewadi IT Park Phase 1.",'''
new_desc = '''description: "Qrious at Life Republic, Punawale features premium 2 & 3 BHK homes in a 7.58-acre development. Highlights include 5 Towers, 8 Flats/floor, 4 Lifts/tower, 36 Habitable Floors, and High Street Retail with 90 Shops.",'''
content = content.replace(old_desc, new_desc)

# Update the configurations array
old_configs = '''configurations: [
            { type: "2 BHK Large", size: "813 sq.ft.", price: "₹85 Lacs*" },
            { type: "2 BHK Lux", size: "900 sq.ft.", price: "₹85 Lakhs*" },
            { type: "3 BHK Large", size: "1,116 sq.ft.", price: "₹1.1 Cr*" },
            { type: "3 BHK Lux", size: "1,231 sq.ft.", price: "₹1.3 Cr*" }
        ],'''

new_configs = '''configurations: [
            { type: "2 BHK Large", size: "813 sq.ft.", price: "₹89 Lakhs*" },
            { type: "2 BHK Luxurious", size: "900 sq.ft.", price: "₹97 Lakhs*" },
            { type: "3 BHK Large", size: "1,116 sq.ft.", price: "₹1.23 Cr*" },
            { type: "3 BHK Luxurious", size: "1,231 sq.ft.", price: "₹1.38 Cr*" }
        ],'''

content = content.replace(old_configs, new_configs)

with open('src/lib/clusters.ts', 'w') as f:
    f.write(content)

