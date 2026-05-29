const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({args:['--no-sandbox']});
  const p = await b.newPage();
  await p.emulateMediaType('print');
  await p.setViewport({width:1191,height:1684,deviceScaleFactor:1});
  await p.goto('http://localhost:8000/poster.html',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,800));
  const d = await p.evaluate(()=>{
    const mm = px => (px/ (96/25.4)).toFixed(1);
    const h = s => { const e=document.querySelector(s); return e? +mm(e.getBoundingClientRect().height):null; };
    return {
      stats_col:h('.why-stats-col'), plot_card:h('.why-mechanism'),
      svg:h('.psafety-svg'), rungs_col:h('.ladder-col'), caption:h('.psafety-cap')
    };
  });
  console.log(JSON.stringify(d));
  await b.close();
})();
