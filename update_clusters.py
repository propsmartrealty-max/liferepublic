import json
import re

with open('src/lib/clusters.ts', 'r') as f:
    content = f.read()

with open('scraped_data.json', 'r') as f:
    scraped = json.load(f)

with open('echoes_data.json', 'r') as f:
    echoes = json.load(f)

def update_cluster(cluster_id, data):
    global content
    
    gallery_str = json.dumps(data.get('gallery', []), indent=8)
    amenities_str = json.dumps(data.get('amenities', []), indent=8)
    floorplans_str = json.dumps(data.get('floorPlans', []), indent=8)
    
    # We will search for id: "duet", then replace the closing bracket of configurations
    search_str = f'id: "{cluster_id}"'
    if search_str in content:
        start_idx = content.find(search_str)
        conf_idx = content.find('configurations: [', start_idx)
        end_conf_idx = content.find(']', conf_idx) + 1
        
        injection = f",\n        gallery: {gallery_str},\n        amenitiesList: {amenities_str},\n        floorPlans: {floorplans_str}"
        
        content = content[:end_conf_idx] + injection + content[end_conf_idx:]

update_cluster('duet', scraped['duet'])
update_cluster('qrious', scraped['qrious'])
update_cluster('echoes', echoes['echoes'])

with open('src/lib/clusters.ts', 'w') as f:
    f.write(content)
