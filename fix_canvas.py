import re

with open('src/lib/clusters.ts', 'r') as f:
    content = f.read()

# Update the global starting price for Canvas
content = re.sub(r'(id:\s*"canvas",[\s\S]*?price:\s*")₹1.49 Cr\*(")', r'\g<1>₹1.55 Cr*\g<2>', content)

# Update the category since it now includes 3.5 BHK
content = re.sub(r'(id:\s*"canvas",[\s\S]*?category:\s*")Premium 3 & 4 BHK(")', r'\g<1>Premium 3, 3.5 & 4 BHK\g<2>', content)


# Update the configurations array
old_configs = '''configurations: [
            { type: "3 BHK", size: "1,151 - 1,330 sq.ft.", price: "₹1.49 Cr*" },
            { type: "4 BHK", size: "1,700 - 2,023 sq.ft.", price: "₹2.20 Cr*" }
        ],'''

new_configs = '''configurations: [
            { type: "3 BHK", size: "1,330+ sq.ft.", price: "₹1.55 Cr*" },
            { type: "3 BHK XL", size: "1,450+ sq.ft.", price: "₹1.69 Cr*" },
            { type: "3.5 BHK", size: "1,700+ sq.ft.", price: "₹1.99 Cr*" },
            { type: "4 BHK", size: "2,023+ sq.ft.", price: "₹2.45 Cr*" }
        ],'''

content = content.replace(old_configs, new_configs)

with open('src/lib/clusters.ts', 'w') as f:
    f.write(content)

