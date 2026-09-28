import requests
from bs4 import BeautifulSoup
url = "https://liferepublic.in/better-homes"
res = requests.get(url)
soup = BeautifulSoup(res.text, 'html.parser')
for img in soup.find_all('img'):
    src = img.get('src') or img.get('data-src')
    if src and 'qrious' in src.lower():
        print(src)
