import json

with open('src/lib/clusters.ts', 'r') as f:
    content = f.read()

with open('remaining_data.json', 'r') as f:
    data = json.load(f)

def update_cluster(cluster_id, cluster_data):
    global content
    gallery_str = json.dumps(cluster_data.get('gallery', []), indent=8)
    amenities_str = json.dumps(cluster_data.get('amenities', []), indent=8)
    floorplans_str = json.dumps(cluster_data.get('floorPlans', []), indent=8)
    
    search_str = f'id: "{cluster_id}"'
    if search_str in content:
        start_idx = content.find(search_str)
        conf_idx = content.find('configurations: [', start_idx)
        end_conf_idx = content.find(']', conf_idx) + 1
        
        injection = f",\n        gallery: {gallery_str},\n        amenitiesList: {amenities_str},\n        floorPlans: {floorplans_str}"
        content = content[:end_conf_idx] + injection + content[end_conf_idx:]

update_cluster('aros', data['aros'])
update_cluster('atmos', data['atmos'])
update_cluster('universe', data['universe'])
update_cluster('oro-avenue', data['oro-avenue'])

with open('src/lib/clusters.ts', 'w') as f:
    f.write(content)
