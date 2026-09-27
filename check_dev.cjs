const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => {
      const type = msg.type();
      if (type === 'error' || type === 'warning') {
          console.log(`REACT ${type.toUpperCase()}:`, msg.text());
      }
  });
  page.on('pageerror', error => console.log('RUNTIME ERROR:', error.message));
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  await new Promise(r => setTimeout(r, 2000));
  
  const content = await page.content();
  if (content.includes('Structural Anomaly Detected')) {
      console.log('ERROR BOUNDARY IS VISIBLE');
  } else {
      console.log('SITE RENDERED SUCCESSFULLY!');
  }
  
  await browser.close();
})();
