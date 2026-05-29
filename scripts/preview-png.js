// Render poster.html to a PNG for quick visual review (print media, A0).
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.emulateMediaType('print');
  // A0 at ~96dpi/3.7795 px-per-mm scaled down: use deviceScaleFactor for crispness.
  await page.setViewport({ width: 1191, height: 1684, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:8000/poster.html', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => {
    const p = document.querySelector('.poster');
    if (p) { p.style.transform = 'none'; p.style.margin = '0'; }
  });
  await new Promise(r => setTimeout(r, 1200));
  // Screenshot the poster element at its natural (print) size.
  const el = await page.$('.poster');
  await el.screenshot({ path: 'pdfs/preview.png' });
  await browser.close();
  console.log('Wrote pdfs/preview.png');
})().catch(e => { console.error(e); process.exit(1); });
