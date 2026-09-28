const fs = require('fs');
const https = require('https');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    // If it's not absolute or already local, skip
    if (!url.startsWith('http')) return resolve();
    
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        if (response.statusCode >= 400) {
            reject(new Error(`Status ${response.statusCode}`));
            return;
        }
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

async function run() {
    let file = 'src/data/projects.ts';
    let content = fs.readFileSync(file, 'utf8');
    
    // Find all urls
    const regex = /https:\/\/liferepublic\.in\/images\/[^'"]+/g;
    const matches = [...new Set(content.match(regex))];
    
    console.log(`Found ${matches.length} unique images to download...`);
    
    for (const url of matches) {
        const filename = path.basename(url);
        const decodedFilename = decodeURIComponent(filename);
        // Replace spaces with underscores
        const safeFilename = decodedFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
        const dest = `public/images/projects/${safeFilename}`;
        
        try {
            console.log(`Downloading ${url}...`);
            await download(url, dest);
            
            // Rewrite the URL in the TS file
            const newUrl = `/images/projects/${safeFilename}`;
            // Use split/join to replace all occurrences
            content = content.split(url).join(newUrl);
        } catch (e) {
            console.error(`Failed ${url}: ${e.message}`);
            // If it fails, fallback to a known good image
            content = content.split(url).join('/images/home/box-img-01.jpg');
        }
    }
    
    fs.writeFileSync(file, content);
    console.log("Updated projects.ts with local image paths.");
}

run();
