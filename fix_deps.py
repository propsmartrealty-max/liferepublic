import json

with open('package.json', 'r') as f:
    data = json.load(f)

if 'devDependencies' in data:
    if 'dependencies' not in data:
        data['dependencies'] = {}
    
    # Move everything from devDependencies to dependencies
    for pkg, version in data['devDependencies'].items():
        data['dependencies'][pkg] = version
    
    del data['devDependencies']

with open('package.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Dependencies merged.")
