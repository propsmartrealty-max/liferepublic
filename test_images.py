import requests

urls = [
    "https://liferepublic.in/images/home/slider-1.webp",
    "https://liferepublic.in/images/home/slider-2.webp",
    "https://liferepublic.in/images/home/slider-3.webp",
    "https://liferepublic.in/images/home/slider-4.webp",
    "https://liferepublic.in/images/projects/location/172060335117189650503rd Avenue-.jpg"
]

for url in urls:
    r = requests.head(url)
    print(f"{url} - {r.status_code}")
