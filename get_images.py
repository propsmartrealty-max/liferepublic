import requests
from bs4 import BeautifulSoup
import json

urls_to_check = [
    "https://liferepublic.in/pune/2-bhk-flats-in-pune",
    "https://liferepublic.in/pune/3-bhk-flats-in-pune",
    "https://liferepublic.in/pune/residential-projects-in-pune"
]

images = set()

for url in urls_to_check:
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src')
        if src and ('project' in src.lower() or 'banner' in src.lower() or 'gallery' in src.lower()):
            images.add(src)

print(json.dumps(list(images), indent=2))
