// Run with Playwright installed (NODE_PATH may point to a shared installation).
const {chromium,webkit}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const filename=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));
 if(!filename.startsWith(root+path.sep)){res.writeHead(403).end();return}
 fs.readFile(filename,(err,data)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',({'html':'text/html','js':'text/javascript','css':'text/css','png':'image/png','webmanifest':'application/manifest+json'})[filename.split('.').pop()]||'text/plain');res.end(data)});
});
async function run(browser){
 const context=await browser.newContext({reducedMotion:'reduce'});
 await context.addInitScript(()=>{
  window.mock={voices:[],spoken:[],cancels:0,clipboard:[],shares:[],mode:'start'};
  class Utterance{constructor(text){this.text=text}}
  Object.defineProperty(window,'SpeechSynthesisUtterance',{value:Utterance,configurable:true});
  Object.defineProperty(window,'speechSynthesis',{value:{paused:true,
   getVoices:()=>mock.voices,addEventListener:(name,cb)=>{mock.voiceChanged=cb},
   cancel:()=>{mock.cancels++;mock.spoken.at(-1)?.onerror?.({error:'canceled'})},
   resume:()=>{mock.resumed=true},
   speak:u=>{mock.spoken.push(u);if(mock.mode==='throw')throw Error('failed');if(mock.mode==='start')u.onstart?.()}
  },configurable:true});
  Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{if(mock.copyFail)throw Error();mock.clipboard.push(text)}},configurable:true});
  Object.defineProperty(navigator,'share',{value:async data=>{if(mock.shareFail)throw Object.assign(Error(),{name:mock.shareFail});mock.shares.push(data)},configurable:true});
 });
 const page=await context.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto(`http://127.0.0.1:${server.address().port}`);
 const fill=async text=>page.locator('#source').fill(text);
 const output=()=>page.locator('#output').textContent();
 await fill('什麼樣的便當？');assert.equal(await output(),'しぇんまやんで弁当？');
 await page.locator('[data-mode="hira"]').click();assert.equal(await output(),'しぇんまやんでべんだん？');
 await page.locator('[data-mode="kata"]').click();assert.equal(await output(),'シェンマヤンデベンダン？');
 await page.locator('#swap').click();assert.equal(await output(),'什麼樣的便當？');assert.match(await page.locator('#note').textContent(),/歧義/);
 await fill('ぁ');assert.match(await page.locator('#note').textContent(),/不保證|多種/);
 await page.locator('[data-example="你在幹嘛？"]').click();
 await page.locator('[data-mode="mixed"]').click();assert.equal(await output(),'にざいがんま？');
 await page.locator('#customDetails').evaluate(el=>{el.open=true});
 await page.locator('#mappingChinese').fill('奶茶');await page.locator('#mappingJapanese').fill('ないちゃ');
 await page.locator('#mappingForm button').click();await fill('奶茶，謝謝！');assert.equal(await output(),'ないちゃ、しぇしぇ！');
 await page.reload();await fill('奶茶');assert.equal(await output(),'ないちゃ');
 await page.locator('#copy').click();await page.locator('#share').click();
 assert.equal(await page.evaluate(()=>mock.clipboard.at(-1)),'ないちゃ');assert.equal(await page.evaluate(()=>mock.shares.at(-1).text),'ないちゃ');
 await page.evaluate(()=>{Object.defineProperty(navigator,'share',{value:undefined,configurable:true})});await page.locator('#share').click();assert.equal(await page.evaluate(()=>mock.clipboard.length),2);
 await page.evaluate(()=>{mock.copyFail=true});await page.locator('#copy').click();assert.match(await page.locator('#toast').textContent(),/長按/);
 // Empty voices still initiate immediately; late voices apply on the next tap.
 await page.locator('#speak').click();assert.equal(await page.evaluate(()=>mock.spoken.at(-1).lang),'ja-JP');assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'true');
 await page.locator('#speak').click();assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'false');
 await page.evaluate(()=>{mock.voices=[{lang:'ja-JP',name:'Japanese'},{lang:'zh-TW',name:'Taiwan'}];mock.voiceChanged()});
 await page.locator('#speak').click();assert.equal(await page.evaluate(()=>mock.spoken.at(-1).voice.name),'Japanese');
 await page.locator('#clear').click();assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'false');
 await fill('你在幹嘛？');await page.locator('#speak').click();await page.locator('#swap').click();await page.locator('#speak').click();assert.equal(await page.evaluate(()=>mock.spoken.at(-1).lang),'zh-TW');
 await page.evaluate(()=>mock.spoken.at(-1).onerror({error:'language-unavailable'}));assert.match(await page.locator('#speechStatus').textContent(),/語音/);
 await page.evaluate(()=>{mock.mode='throw'});await page.locator('#speak').click();assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'false');
 await page.evaluate(()=>{mock.mode='start'});await page.locator('#speak').click();await page.evaluate(()=>mock.spoken.at(-1).onend());assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'false');
 await page.clock.install();await page.evaluate(()=>{mock.mode='silent'});await page.locator('#speak').click();await page.clock.fastForward(11000);assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'false');assert.match(await page.locator('#speechStatus').textContent(),/未能啟動/);
 await page.evaluate(()=>{mock.mode='start'});await page.locator('#speak').click();await page.clock.fastForward(31000);assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'false');
 await fill('<img src=x onerror=alert(1)>');assert.equal(await page.locator('#output img').count(),0);
 for(const width of [320,375,390,1280]){
  await page.setViewportSize({width,height:900});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  for(const selector of ['#source','#mappingChinese','#mappingJapanese'])assert(await page.locator(selector).evaluate(el=>parseFloat(getComputedStyle(el).fontSize)>=16));
  assert.equal(await page.locator('#source').evaluate(el=>getComputedStyle(el).userSelect||getComputedStyle(el).webkitUserSelect),'text');
  assert.equal(await page.locator('#output').evaluate(el=>getComputedStyle(el).userSelect||getComputedStyle(el).webkitUserSelect),'text');
  assert.equal(await page.locator('#convert').evaluate(el=>getComputedStyle(el).userSelect||getComputedStyle(el).webkitUserSelect),'none');
  for(const img of await page.locator('img').all())assert(await img.evaluate(el=>el.complete&&el.naturalWidth>0));
  assert.equal(await page.locator('.cat-chat').first().evaluate(el=>getComputedStyle(el).pointerEvents),'none');
  for(const [a,b] of [['.direction','.cat-chat'],['.cat-chat','#source'],['#convert','.cat-reply'],['.cat-reply','.result']]){
   const x=await page.locator(a).first().boundingBox(),y=await page.locator(b).first().boundingBox();assert(x.y+x.height<=y.y+1,`${a} overlaps ${b} at ${width}`);
  }
  if(width===390||width===1280)await page.screenshot({path:path.join(process.env.TEMP||root,`nihonhuayu-${width}.png`),fullPage:true});
 }
 const manifest=await page.evaluate(async()=>await(await fetch('./manifest.webmanifest')).json());
 for(const icon of manifest.icons)assert((await page.request.get(new URL(icon.src,page.url()).href)).ok());
 assert.deepEqual(errors,[]);await context.close();
 const unsupported=await browser.newContext();await unsupported.addInitScript(()=>{delete window.speechSynthesis;delete window.SpeechSynthesisUtterance});
 const p=await unsupported.newPage();await p.goto(`http://127.0.0.1:${server.address().port}`);await p.locator('#source').fill('你好');await p.locator('#speak').click({force:true});assert.match(await p.locator('#toast').textContent(),/不支援/);await unsupported.close();
}
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 try{browser=process.env.BROWSER_ENGINE==='webkit'?await webkit.launch({headless:true}):await chromium.launch({channel:process.env.BROWSER_CHANNEL||'msedge',headless:true});await run(browser);console.log('PASS: conversions, mappings/persistence, copy/share, speech lifecycle/failures/timeouts, unsupported browser, four layouts, assets and console');}
 finally{await browser?.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

