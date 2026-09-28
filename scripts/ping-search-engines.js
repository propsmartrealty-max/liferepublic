import https from 'https';

const PING_URLS = [
    'https://www.google.com/ping?sitemap=https://life-republic.in/sitemap-silos-index.xml',
    'https://www.bing.com/ping?sitemap=https://life-republic.in/sitemap-silos-index.xml'
];

console.log('Initiating Algorithmic Sitemap Ping Protocol to Global Search Engines...');

PING_URLS.forEach(url => {
    https.get(url, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`[SUCCESS] Pinged: ${url} (Status: ${res.statusCode})`);
        } else {
            console.log(`[WARNING] Ping Failed: ${url} (Status: ${res.statusCode})`);
        }
    }).on('error', (e) => {
        console.error(`[ERROR] Ping Error on ${url}: ${e.message}`);
    });
});
