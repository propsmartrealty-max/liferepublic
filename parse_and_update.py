import re
from bs4 import BeautifulSoup
import json
import os

# --- DUET ---
with open('/Users/vikasyewle/.gemini/antigravity/brain/8d2f0b95-dada-4f69-85f1-5c21a97bab55/.system_generated/steps/7405/content.md', 'r') as f:
    duet_html = f.read()
soup_duet = BeautifulSoup(duet_html, 'html.parser')

duet_images = []
for img in soup_duet.find_all('img'):
    src = img.get('src')
    if src and 'http' in src and not src.endswith('.svg') and not src.endswith('.png'):
        duet_images.append(src)

duet_gallery = [img for img in duet_images if 'gallery' in img.lower()]
duet_floor_plans = [img for img in duet_images if 'plan' in img.lower() or 'layout' in img.lower()]
duet_amenities_icons = [img for img in duet_images if 'amenities' in img.lower() or 'aminities' in img.lower()]

duet_amenities_list = []
for icon in duet_amenities_icons:
    name = icon.split('/')[-1].split('.')[0].replace('_', ' ').replace('-', ' ').upper()
    name = ''.join(c for c in name if not c.isdigit()).strip()
    if len(name) > 2:
        duet_amenities_list.append({"name": name, "icon": icon})

# --- QRIOUS ---
with open('/Users/vikasyewle/.gemini/antigravity/brain/8d2f0b95-dada-4f69-85f1-5c21a97bab55/.system_generated/steps/7408/content.md', 'r') as f:
    qrious_html = f.read()
soup_qrious = BeautifulSoup(qrious_html, 'html.parser')

qrious_images = []
for img in soup_qrious.find_all('img'):
    src = img.get('src')
    if src and 'http' in src and not src.endswith('.svg') and not src.endswith('.png'):
        qrious_images.append(src)

qrious_gallery = [img for img in qrious_images if 'gallery' in img.lower()]
qrious_floor_plans = [img for img in qrious_images if 'plan' in img.lower() or 'layout' in img.lower()]
qrious_amenities_icons = [img for img in qrious_images if 'amenities' in img.lower() or 'aminities' in img.lower()]

qrious_amenities_list = []
for icon in qrious_amenities_icons:
    name = icon.split('/')[-1].split('.')[0].replace('_', ' ').replace('-', ' ').upper()
    name = ''.join(c for c in name if not c.isdigit()).strip()
    if len(name) > 2:
        qrious_amenities_list.append({"name": name, "icon": icon})

print(json.dumps({
    "duet": {
        "gallery": list(set(duet_gallery)),
        "floorPlans": list(set(duet_floor_plans)),
        "amenities": [dict(t) for t in {tuple(d.items()) for d in duet_amenities_list}]
    },
    "qrious": {
        "gallery": list(set(qrious_gallery)),
        "floorPlans": list(set(qrious_floor_plans)),
        "amenities": [dict(t) for t in {tuple(d.items()) for d in qrious_amenities_list}]
    }
}, indent=2))
