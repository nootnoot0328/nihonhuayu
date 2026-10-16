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
 const page=await context.newPage();const errors=[],requestOrigins=new Set();
 page.on('request',req=>requestOrigins.add(new URL(req.url()).origin));
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto(`http://127.0.0.1:${server.address().port}`);
 const fill=async text=>page.locator('#source').fill(text);
 const output=()=>page.locator('#output').textContent();
 const forwardExample=async text=>{if(!await page.locator('#chineseExamples').isVisible())await page.locator('#swap').click();await page.locator(`[data-example="${text}"]`).click()};
 await fill('什麼樣的便當？');assert.equal(await output(),'しぇんまやんで弁当？');
 assert.equal(await page.locator('#convert').count(),0);
 assert.equal(await page.locator('#inputCat').getAttribute('data-cat'),'1');
 assert.equal(await page.locator('#outputCat').getAttribute('data-cat'),'2');
 assert.equal(await page.locator('#source').evaluate(el=>el.closest('.speech-bubble')!==null),true);
 assert.equal(await page.locator('#output').evaluate(el=>el.closest('.speech-bubble')!==null),true);
 assert.match(await page.locator('#kanaReading').textContent(),/シェンマヤンデベンダン/);
 assert.equal(await page.evaluate(()=>mock.cancels),0,'idle typing must not cancel the synth');
 await page.locator('#speak').click();
 assert.equal(await page.evaluate(()=>mock.spoken.at(-1).text),'シェンマヤンデベンダン、ニャン？');
 assert.equal(await output(),'しぇんまやんで弁当？','cat sound is speech-only');
 await page.locator('#speak').click();
 await page.locator('.speech-settings').evaluate(el=>{el.open=true});await page.locator('#catSound').uncheck();
 await page.locator('#speak').click();assert.equal(await page.evaluate(()=>mock.spoken.at(-1).text),'シェンマヤンデベンダン？');await page.locator('#speak').click();
 assert.equal(await page.evaluate(()=>localStorage.getItem('nihonhuayu-cat-sound-v1')),'off');
 await page.reload();assert.equal(await page.locator('#catSound').isChecked(),false,'toggle persists');
 await page.locator('.speech-settings').evaluate(el=>{el.open=true});await page.locator('#catSound').check();await page.locator('.speech-settings').evaluate(el=>{el.open=false});
 await forwardExample('什麼樣的便當？');
 await page.locator('#speak').click();
 assert.equal(await page.evaluate(()=>mock.spoken.at(-1).voice),undefined,'automatic voice should use lang only');
 assert.match(await page.locator('#outputCat img').getAttribute('src'),/-2/);
 assert.match(await page.locator('.hero-cat img').getAttribute('src'),/-2/);
 await page.locator('#speak').click();
 await page.locator('[data-mode="hira"]').click();assert.equal(await output(),'しぇんまやんでべんだん？');
 await page.locator('[data-mode="kata"]').click();assert.equal(await output(),'シェンマヤンデベンダン？');
 await page.locator('#swap').click();
 assert.equal(await page.locator('[data-reverse-mode="sound"]').getAttribute('aria-pressed'),'true');
 await fill('ありがとう！');assert.equal(await output(),'阿哩嘎多！');
 await page.locator('#speak').click();assert.equal(await page.evaluate(()=>mock.spoken.at(-1).text),'阿哩嘎多，喵！');assert.equal(await page.evaluate(()=>mock.spoken.at(-1).lang),'zh-TW');await page.locator('#speak').click();
 await fill('シェンマヤンデベンダン？');await page.locator('[data-reverse-mode="restore"]').click();assert.equal(await output(),'什麼樣的便當？');assert.match(await page.locator('#note').textContent(),/歧義/);
 assert.equal(await page.locator('#inputCat').getAttribute('data-cat'),'2');
 assert.equal(await page.locator('#outputCat').getAttribute('data-cat'),'1');
 assert.equal(await page.locator('#kanaReading').isVisible(),false);
 await fill('ぁ');assert.match(await page.locator('#note').textContent(),/不保證|多種/);
 await forwardExample('你在幹嘛？');
 await page.locator('[data-mode="mixed"]').click();assert.equal(await output(),'にざいがんま？');
 await fill('圖書館裡的鬱金香綻放了');assert.match(await output(),/圖書館/);assert.doesNotMatch(await page.locator('#note').textContent(),/未收錄/);
 assert.equal(await page.locator('#source').inputValue(),'圖書館裡的鬱金香綻放了');
 await page.locator('#speak').click();assert.match(await page.evaluate(()=>mock.spoken.at(-1).text),/^[ァ-ヶー]+、ニャン$/);await page.locator('#speak').click();
 await page.locator('#swap').click();await page.locator('[data-reverse-mode="restore"]').click();assert.equal(await output(),'圖書館裡的鬱金香綻放了');await page.locator('#swap').click();
 // The hero switch changes its own artwork, preserving conversion and speech.
 const beforeMascot=await output(),readingBefore=await page.locator('#kanaReading').textContent();
 await page.locator('#swapMascot').click();assert.equal(await page.locator('#heroCat').getAttribute('data-cat'),'2');
 assert.match(await page.locator('#heroCat img').getAttribute('src'),/Cat%202\.png/);
 assert.equal(await output(),beforeMascot);assert.equal(await page.locator('#kanaReading').textContent(),readingBefore);
 await page.reload();assert.equal(await page.locator('#heroCat').getAttribute('data-cat'),'2');
 await fill('圖書館裡的鬱金香綻放了');await page.locator('#speak').click();assert.match(await page.locator('#heroCat img').getAttribute('src'),/Cat%202%20-2/);
 await page.locator('#swapMascot').click();assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'true');assert.match(await page.locator('#heroCat img').getAttribute('src'),/Cat%201%20-2/);
 await page.locator('#speak').click();
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
 await page.evaluate(()=>{mock.voices=[{lang:'ja-JP',name:'Japanese',voiceURI:'ja-test'},{lang:'zh-TW',name:'Taiwan',voiceURI:'zh-test'}];mock.voiceChanged()});
 const spokenBeforeVoiceChange=await page.evaluate(()=>mock.spoken.length);
 await page.locator('#speak').click();assert.equal(await page.evaluate(()=>mock.spoken.at(-1).voice),undefined);
 assert.equal(await page.evaluate(()=>mock.spoken.length),spokenBeforeVoiceChange+1);
 await page.locator('#speak').click();
 await page.locator('.speech-settings').evaluate(el=>{el.open=true});
 await page.locator('#speechVoice').selectOption('ja-test');
 await page.locator('#speak').click();assert.equal(await page.evaluate(()=>mock.spoken.at(-1).voice.name),'Japanese');
 await page.locator('#clear').click();assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'false');
 await fill('你在幹嘛？');await page.locator('#speak').click();await page.locator('#swap').click();await page.locator('#speak').click();assert.equal(await page.evaluate(()=>mock.spoken.at(-1).lang),'zh-TW');
 await page.evaluate(()=>mock.spoken.at(-1).onerror({error:'language-unavailable'}));assert.match(await page.locator('#speechStatus').textContent(),/語音/);
 await page.evaluate(()=>{mock.mode='throw'});await page.locator('#speak').click();assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'false');
 await page.evaluate(()=>{mock.mode='start'});await page.locator('#speak').click();await page.evaluate(()=>mock.spoken.at(-1).onend());assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'false');
 await page.clock.install();await page.evaluate(()=>{mock.mode='silent'});await page.locator('#speak').click();await page.clock.fastForward(11000);assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'false');assert.match(await page.locator('#speechStatus').textContent(),/未能啟動/);
 assert.equal(await page.locator('#outputCat').evaluate(el=>el.classList.contains('talking')),false);
 await page.evaluate(()=>{mock.mode='start'});await page.locator('#speak').click();await page.clock.fastForward(31000);assert.equal(await page.locator('#speak').getAttribute('aria-pressed'),'false');
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.locator('#speak').click();
 const openFace=await page.locator('#outputCat img').getAttribute('src');
 await page.clock.runFor(220);
 assert.notEqual(await page.locator('#outputCat img').getAttribute('src'),openFace);
 await page.emulateMedia({reducedMotion:'reduce'});
 // Deliver the change explicitly while the browser clock is virtualized.
 await page.evaluate(()=>reducedMotion.dispatchEvent(new Event('change')));
 const stillFace=await page.locator('#outputCat img').getAttribute('src');await page.clock.runFor(660);
 assert.equal(await page.locator('#outputCat img').getAttribute('src'),stillFace);
 await page.locator('#speak').click();
 for(const selector of ['#inputCat','#outputCat','.hero-cat','.brand-cat']){
  const cat=page.locator(selector),img=cat.locator('img');
  const normal=await img.getAttribute('src');
  await cat.hover();await page.mouse.down();assert.notEqual(await img.getAttribute('src'),normal);
  await page.mouse.move(0,0);await page.mouse.up();assert.equal(await img.getAttribute('src'),normal);
  await cat.focus();await page.keyboard.down('Space');assert.notEqual(await img.getAttribute('src'),normal);
  await page.keyboard.up('Space');assert.equal(await img.getAttribute('src'),normal);
  await cat.hover();await page.mouse.down();
  await cat.dispatchEvent('pointercancel');await page.mouse.up();assert.equal(await img.getAttribute('src'),normal);
 }
 await page.locator('#customDetails').evaluate(el=>{el.open=true});
 await page.locator('#mappingChinese').fill('奶茶');await page.locator('#mappingJapanese').fill('弁当龘𠮷');await page.locator('#mappingForm button').click();
 await forwardExample('你在幹嘛？');await fill('奶茶');
 assert.equal(await output(),'弁当龘𠮷');assert.match(await page.locator('#kanaReading').textContent(),/ベンダンダ〔𠮷〕.*自訂/);
 await page.locator('#speak').click();assert.equal((await page.evaluate(()=>mock.spoken.at(-1).text)).trim(),'ベンダンダ、ニャン');
 await page.locator('#speak').click();
 await page.reload();await fill('奶茶');assert.equal(await output(),'弁当龘𠮷');
 await page.locator('#customDetails').evaluate(el=>{el.open=true});await page.locator('#mappingList button').click();
 assert.notEqual(await output(),'弁当龘𠮷');await page.locator('#customDetails').evaluate(el=>{el.open=false});
 await fill('<img src=x onerror=alert(1)>');assert.equal(await page.locator('#output img').count(),0);
 await forwardExample('什麼樣的便當？');
 await page.locator('[data-mode="mixed"]').click();
 await page.locator('.speech-settings').evaluate(el=>{el.open=false});
 for(const width of [320,375,390,1280]){
  await page.setViewportSize({width,height:900});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  for(const selector of ['#source','#mappingChinese','#mappingJapanese','#speechVoice'])assert(await page.locator(selector).evaluate(el=>parseFloat(getComputedStyle(el).fontSize)>=16));
  assert.equal(await page.locator('#source').evaluate(el=>getComputedStyle(el).userSelect||getComputedStyle(el).webkitUserSelect),'text');
  assert.equal(await page.locator('#output').evaluate(el=>getComputedStyle(el).userSelect||getComputedStyle(el).webkitUserSelect),'text');
  assert.equal(await page.locator('#swap').evaluate(el=>getComputedStyle(el).userSelect||getComputedStyle(el).webkitUserSelect),'none');
  for(const img of await page.locator('img').all())assert(await img.evaluate(el=>el.complete&&el.naturalWidth>0));
  for(const [a,b] of [['.direction','.input-message'],['.input-message','.modebar'],['.modebar','.output-message'],['.output-message','.resultactions']]){
   const x=await page.locator(a).first().boundingBox(),y=await page.locator(b).first().boundingBox();assert(x.y+x.height<=y.y+1,`${a} overlaps ${b} at ${width}`);
  }
  for(const [a,b] of [['#inputCat','.input-bubble'],['.result','#outputCat']]){
   const x=await page.locator(a).boundingBox(),y=await page.locator(b).boundingBox();assert(x.x+x.width<=y.x+1,`${a} overlaps ${b} at ${width}`);
  }
  const hero=await page.locator('#heroCat').boundingBox(),toggle=await page.locator('#swapMascot').boundingBox();
  assert(toggle.width>=44&&toggle.height>=44);assert(toggle.x>hero.x+hero.width/2&&toggle.y>hero.y+hero.height/2);
  if(width===390||width===1280)await page.screenshot({path:path.join(process.env.TEMP||root,`nihonhuayu-${width}.png`),fullPage:true});
  await page.locator('#swap').click();await page.locator('[data-reverse-mode="sound"]').click();
  await page.locator('[data-japanese-example="ありがとう！"]').click();assert.equal(await output(),'阿哩嘎多！');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  if(width===390)await page.screenshot({path:path.join(process.env.TEMP||root,'nihonhuayu-reverse-390.png'),fullPage:true});
  await forwardExample('什麼樣的便當？');
 }
 const manifest=await page.evaluate(async()=>await(await fetch('./manifest.webmanifest')).json());
 for(const icon of manifest.icons)assert((await page.request.get(new URL(icon.src,page.url()).href)).ok());
 assert.deepEqual(errors,[]);assert.deepEqual([...requestOrigins],[new URL(page.url()).origin]);await context.close();
 const unsupported=await browser.newContext();await unsupported.addInitScript(()=>{delete window.speechSynthesis;delete window.SpeechSynthesisUtterance});
 const p=await unsupported.newPage();await p.goto(`http://127.0.0.1:${server.address().port}`);await p.locator('#source').fill('你好');await p.locator('#speak').click({force:true});assert.match(await p.locator('#toast').textContent(),/不支援/);await unsupported.close();
 const touch=await browser.newContext({hasTouch:true,isMobile:true,viewport:{width:390,height:844},reducedMotion:'reduce'});
 const t=await touch.newPage();await t.goto(`http://127.0.0.1:${server.address().port}`);
 await t.evaluate(()=>{
  window.touchFrames=[];
  for(const cat of document.querySelectorAll('.chat-cat')){
   for(const event of ['pointerdown','pointerup'])cat.addEventListener(event,()=>touchFrames.push({event,src:cat.querySelector('img').getAttribute('src')}));
  }
 });
 await t.locator('#inputCat').tap();await t.locator('#outputCat').tap();
 const frames=await t.evaluate(()=>touchFrames);assert.equal(frames.length,4);
 assert.match(frames[0].src,/-2/);assert.doesNotMatch(frames[1].src,/-2/);
 assert.match(frames[2].src,/-2/);assert.doesNotMatch(frames[3].src,/-2/);
 await touch.close();
 const missingDictionary=await browser.newContext();
 await missingDictionary.route('**/vendor/pinyin-pro-3.29.5.js',route=>route.fulfill({status:200,contentType:'text/javascript',body:'/* Simulated dictionary load failure. */'}));
 const d=await missingDictionary.newPage();const degradedErrors=[];d.on('pageerror',e=>degradedErrors.push(e.message));
 await d.goto(`http://127.0.0.1:${server.address().port}`);await d.locator('#source').fill('圖書館');assert.match(await d.locator('#note').textContent(),/字典未載入/);assert.equal(await d.locator('#output').textContent(),'圖書館');assert.deepEqual(degradedErrors,[]);await missingDictionary.close();
}
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 try{browser=process.env.BROWSER_ENGINE==='webkit'?await webkit.launch({headless:true}):await chromium.launch({channel:process.env.BROWSER_CHANNEL||'msedge',headless:true});await run(browser);console.log('PASS: conversions, mappings/edit/delete/persistence, copy/share, kana speech and lifecycle/failures/timeouts, cat press/release/animation/reduced motion, unsupported browser, four layouts, assets and console');}
 finally{await browser?.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

