const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => {
      const type = msg.type();
      if (type === 'error') {
          console.log('REACT ERROR:', msg.text());
      }
  });
  page.on('pageerror', error => console.log('RUNTIME ERROR:', error.message));
  
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  await browser.close();
})();
