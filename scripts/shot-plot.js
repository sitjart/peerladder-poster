const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({args:['--no-sandbox']});
  const p = await b.newPage();
  await p.emulateMediaType('print');
  await p.setViewport({width:1191,height:1684,deviceScaleFactor:3});
  await p.goto('http://localhost:8000/poster.html',{waitUntil:'networkidle0'});
  await p.evaluate(()=>{const e=document.querySelector('.poster'); if(e){e.style.transform='none';e.style.margin='0';}});
  await new Promise(r=>setTimeout(r,800));
  const el = await p.$('.why-mechanism');
  await el.screenshot({path:'pdfs/plot.png'});
  await b.close();
})();
