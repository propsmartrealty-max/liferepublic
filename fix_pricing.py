import re

with open('src/lib/clusters.ts', 'r') as f:
    content = f.read()

updates = {
    'duet': {'price': '₹79 Lacs*', 'status': 'New Launch'},
    'atmos': {'price': '₹83 Lacs*', 'status': 'Under Construction'},
    'qrious': {'price': '₹85 Lacs*', 'status': 'Nearing Possession'},
    'echoes': {'price': '₹86 Lacs*', 'status': 'New Launch'},
    'aros': {'price': '₹89 Lacs*', 'status': 'Ready Possession'},
    '24k-espada': {'price': '₹3.5 Cr*', 'status': 'Sold Out'},
    'sound-of-soul': {'price': '₹3.40 Cr*', 'status': 'Sold Out'},
    'canvas': {'price': '₹1.49 Cr*', 'status': 'New Launch'},
    'oro-avenue': {'price': '₹75 Lacs*', 'status': 'Sold Out'},
    'universe': {'price': '₹75 Lacs*', 'status': 'Sold Out'},
    'i-tower': {'price': '₹83 Lacs*', 'status': 'Sold Out'}
}

# The regex approach: find id: "cluster", replace price and status, and also update configurations
for cid, data in updates.items():
    # Update global price
    pattern_price = re.compile(rf'(id:\s*"{cid}",[\s\S]*?price:\s*")[^"]+(")', re.IGNORECASE)
    content = pattern_price.sub(rf'\g<1>{data["price"]}\g<2>', content)
    
    # Update status
    pattern_status = re.compile(rf'(id:\s*"{cid}",[\s\S]*?status:\s*")[^"]+(")', re.IGNORECASE)
    content = pattern_status.sub(rf'\g<1>{data["status"]}\g<2>', content)
    
    # Update the first configuration price so the UI shows the correct starting price in the modal
    # We find configurations: [ { type: "...", size: "...", price: "..." } ]
    # We just replace the first price occurrence after id: cid
    # Actually, the user just gave a single starting price. I'll replace the first config's price.
    search_str = f'id: "{cid}"'
    if search_str in content:
        start_idx = content.find(search_str)
        conf_idx = content.find('configurations:', start_idx)
        if conf_idx != -1:
            price_idx = content.find('price: "', conf_idx)
            if price_idx != -1 and price_idx < content.find('],', conf_idx):
                end_quote = content.find('"', price_idx + 8)
                content = content[:price_idx + 8] + data['price'] + content[end_quote:]

with open('src/lib/clusters.ts', 'w') as f:
    f.write(content)

