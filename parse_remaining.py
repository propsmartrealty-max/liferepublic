import re
from bs4 import BeautifulSoup
import json
import os

def parse_md(filepath):
    if not os.path.exists(filepath): return {'gallery': [], 'floorPlans': [], 'amenities': []}
    with open(filepath, 'r') as f:
        html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    images = []
    for img in soup.find_all('img'):
        src = img.get('src')
        if src and 'http' in src and not src.endswith('.svg') and not src.endswith('.png'):
            images.append(src)
            
    gallery = [img for img in images if 'gallery' in img.lower()]
    floor_plans = [img for img in images if 'plan' in img.lower() or 'layout' in img.lower()]
    amenities_icons = [img for img in images if 'amenities' in img.lower() or 'aminities' in img.lower()]

    amenities_list = []
    for icon in amenities_icons:
        name = icon.split('/')[-1].split('.')[0].replace('_', ' ').replace('-', ' ').upper()
        name = ''.join(c for c in name if not c.isdigit()).strip()
        if len(name) > 2:
            amenities_list.append({"name": name, "icon": icon})
            
    return {
        "gallery": list(set(gallery)),
        "floorPlans": list(set(floor_plans)),
        "amenities": [dict(t) for t in {tuple(d.items()) for d in amenities_list}]
    }

print(json.dumps({
    "aros": parse_md('/Users/vikasyewle/.gemini/antigravity/brain/8d2f0b95-dada-4f69-85f1-5c21a97bab55/.system_generated/steps/7476/content.md'),
    "atmos": parse_md('/Users/vikasyewle/.gemini/antigravity/brain/8d2f0b95-dada-4f69-85f1-5c21a97bab55/.system_generated/steps/7477/content.md'),
    "universe": parse_md('/Users/vikasyewle/.gemini/antigravity/brain/8d2f0b95-dada-4f69-85f1-5c21a97bab55/.system_generated/steps/7478/content.md'),
    "oro-avenue": parse_md('/Users/vikasyewle/.gemini/antigravity/brain/8d2f0b95-dada-4f69-85f1-5c21a97bab55/.system_generated/steps/7479/content.md')
}, indent=2))
