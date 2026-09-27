const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('response', response => {
      const contentType = response.headers()['content-type'];
      const url = response.url();
      if (contentType === 'application/octet-stream') {
          console.log(`OCTET STREAM RETURNED FOR: ${url}`);
      }
  });
  
  await page.goto('https://life-republic.in', { waitUntil: 'networkidle0' });
  await browser.close();
})();
