const fs = require('fs');
const https = require('https');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    // Ensure dir exists
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const images = [
    { url: "https://liferepublic.in/images/home/slider-1.webp", dest: "public/images/home/slider-1.webp" },
    { url: "https://liferepublic.in/images/home/slider-2.webp", dest: "public/images/home/slider-2.webp" },
    { url: "https://liferepublic.in/images/home/slider-3.webp", dest: "public/images/home/slider-3.webp" },
    { url: "https://liferepublic.in/images/home/box-img-01.jpg", dest: "public/images/home/box-img-01.jpg" },
    { url: "https://liferepublic.in/images/home/box-img-02.jpg", dest: "public/images/home/box-img-02.jpg" },
    { url: "https://liferepublic.in/images/home/box-img-03.jpg", dest: "public/images/home/box-img-03.jpg" },
    { url: "https://liferepublic.in/images/home/overview-img.jpg", dest: "public/images/home/overview-img.jpg" },
    { url: "https://liferepublic.in/images/home/better-living-img.jpg", dest: "public/images/home/better-living-img.jpg" },
    { url: "https://liferepublic.in/images/home/walkthrough.jpg", dest: "public/images/home/walkthrough.jpg" },
    { url: "https://liferepublic.in/images/home/sound-of-soul-thumb.jpg", dest: "public/images/home/sound-of-soul-thumb.jpg" },
    { url: "https://liferepublic.in/images/home/canvas-thumb.jpg", dest: "public/images/home/canvas-thumb.jpg" },
    { url: "https://liferepublic.in/images/webp/logo.webp", dest: "public/images/logo.webp" }
];

async function run() {
    for (const img of images) {
        try {
            console.log(`Downloading ${img.url}...`);
            await download(img.url, img.dest);
            console.log(`Saved to ${img.dest}`);
        } catch (e) {
            console.error(`Failed ${img.url}: ${e}`);
        }
    }
}

run();
