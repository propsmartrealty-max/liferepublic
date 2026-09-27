const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Intercept and print ALL console logs
  page.on('console', msg => {
      console.log(`[CONSOLE] ${msg.type().toUpperCase()}:`, msg.text());
  });
  
  page.on('pageerror', error => {
      console.log('[PAGE ERROR]', error.message);
  });
  
  // Set Safari user agent just in case it's Safari-specific
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15');

  try {
      await page.goto('https://life-republic.in', { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 2000));
      
      const content = await page.content();
      if (content.includes('We.ve encountered')) {
          console.log('ERROR BOUNDARY IS VISIBLE!');
      } else {
          console.log('NO ERROR BOUNDARY DETECTED.');
      }
  } catch (e) {
      console.log('Navigation failed:', e);
  }
  
  await browser.close();
})();
