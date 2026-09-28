import re
from bs4 import BeautifulSoup
import json

with open('/Users/vikasyewle/.gemini/antigravity/brain/8d2f0b95-dada-4f69-85f1-5c21a97bab55/.system_generated/steps/7376/content.md', 'r') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# Extract images
images = []
for img in soup.find_all('img'):
    src = img.get('src')
    if src and 'http' in src and not src.endswith('.svg') and not src.endswith('.png'):
        images.append(src)

# Extract floor plans and amenities
amenities = []
for a in soup.find_all('div', class_=re.compile('amenity', re.I)):
    amenities.append(a.text.strip())

text_content = soup.get_text(separator=' ', strip=True)

data = {
    'images': list(set(images)),
    'text': text_content[:2000] # First 2000 chars of text for context
}

print(json.dumps(data, indent=2))
