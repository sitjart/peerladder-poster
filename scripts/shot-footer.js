const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({args:['--no-sandbox']});
  const p = await b.newPage();
  await p.emulateMediaType('print');
  await p.setViewport({width:1191,height:1684,deviceScaleFactor:3});
  await p.goto('http://localhost:8000/poster.html',{waitUntil:'networkidle0'});
  await p.evaluate(()=>{const e=document.querySelector('.poster'); if(e){e.style.transform='none';e.style.margin='0';}});
  await new Promise(r=>setTimeout(r,700));
  const el = await p.$('.footer');
  await el.screenshot({path:'pdfs/footer.png'});
  // also report center offset
  const d = await p.evaluate(()=>{
    const f=document.querySelector('.footer').getBoundingClientRect();
    const pa=document.querySelector('.footer-partners').getBoundingClientRect();
    return {footerMid:(f.left+f.right)/2, partnersMid:(pa.left+pa.right)/2};
  });
  console.log(JSON.stringify(d));
  await b.close();
})();
