import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => {
    console.log("BROWSER ERROR:", err.message);
    if (err.stack) console.log("STACK TRACE:", err.stack);
  });
  
  console.log('Navigating to http://localhost:5173...');
  try {
    await page.goto('https://life-republic.in', { waitUntil: 'networkidle0' });
    const html = await page.evaluate(() => document.body.innerHTML);
    await page.screenshot({ path: 'live-site-screenshot.png', fullPage: true });
    console.log("HTML LENGTH:", html.length);
  } catch (e) {
    console.log("GOTO ERROR:", e);
  }
  
  await browser.close();
})();
