import requests
from bs4 import BeautifulSoup

url = 'https://liferepublic.in/'
headers = {'User-Agent': 'Mozilla/5.0'}
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

images = soup.find_all('img')
print("All images found on homepage:")
for img in images:
    src = img.get('src') or img.get('data-src')
    if src and ('png' in src or 'jpg' in src or 'jpeg' in src or 'webp' in src):
        if src.startswith('/'):
            src = 'https://liferepublic.in' + src
        print(src)
