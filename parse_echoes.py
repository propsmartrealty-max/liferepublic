import re
from bs4 import BeautifulSoup
import json
import urllib.request

# --- ECHOES ---
with open('/Users/vikasyewle/.gemini/antigravity/brain/8d2f0b95-dada-4f69-85f1-5c21a97bab55/.system_generated/steps/7413/content.md', 'r') as f:
    echoes_html = f.read()
soup_echoes = BeautifulSoup(echoes_html, 'html.parser')

echoes_images = []
for img in soup_echoes.find_all('img'):
    src = img.get('src')
    if src and 'http' in src and not src.endswith('.svg') and not src.endswith('.png'):
        echoes_images.append(src)

echoes_gallery = [img for img in echoes_images if 'gallery' in img.lower()]
echoes_floor_plans = [img for img in echoes_images if 'plan' in img.lower() or 'layout' in img.lower()]
echoes_amenities_icons = [img for img in echoes_images if 'amenities' in img.lower() or 'aminities' in img.lower()]

echoes_amenities_list = []
for icon in echoes_amenities_icons:
    name = icon.split('/')[-1].split('.')[0].replace('_', ' ').replace('-', ' ').upper()
    name = ''.join(c for c in name if not c.isdigit()).strip()
    if len(name) > 2:
        echoes_amenities_list.append({"name": name, "icon": icon})

# --- TOWNSHIP / BETTER LIVING ---
with open('/Users/vikasyewle/.gemini/antigravity/brain/8d2f0b95-dada-4f69-85f1-5c21a97bab55/.system_generated/steps/7400/content.md', 'r') as f:
    bl_html = f.read()
soup_bl = BeautifulSoup(bl_html, 'html.parser')

township_images = []
for img in soup_bl.find_all('img'):
    src = img.get('src')
    if src and 'http' in src and not src.endswith('.svg') and not src.endswith('.png'):
        township_images.append(src)

print(json.dumps({
    "echoes": {
        "gallery": list(set(echoes_gallery)),
        "floorPlans": list(set(echoes_floor_plans)),
        "amenities": [dict(t) for t in {tuple(d.items()) for d in echoes_amenities_list}]
    },
    "township": list(set(township_images))
}, indent=2))
