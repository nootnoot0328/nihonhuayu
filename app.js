"use strict";
const $ = (id) => document.getElementById(id);
const examples = {
  "什麼樣的便當":"しぇんまやんで弁当",
  "好吃的嗎":"はおちーでま",
  "你在幹嘛":"にざいがんま",
  "真的假的":"じぇんでじあで",
  "我不知道耶":"うぉぶーじーだおえ",
  "我要睡覺了":"うぉやお睡覚ら",
  "我要吃便當":"うぉやおちー弁当",
  "晚安":"わんあん",
  "早安":"ざおあん",
  "謝謝":"しぇしぇ",
  "對不起":"どぅいぶちー",
  "我愛你":"うぉあいに",
  "好可愛":"はおくーあい",
  "你吃飯了嗎":"にちーふぁんらま",
  "我很餓":"うぉへんえ",
  "不知道":"ぶーじーだお",
  "便當":"弁当"
};
const hanPinyin = {
 我:"wo",你:"ni",他:"ta",她:"ta",它:"ta",們:"men",是:"shi",不:"bu",知:"zhi",道:"dao",想:"xiang",要:"yao",吃:"chi",喝:"he",嗎:"ma",嘛:"ma",呢:"ne",啊:"a",啦:"la",耶:"ye",喔:"o",哦:"o",了:"le",的:"de",得:"de",地:"de",好:"hao",很:"hen",太:"tai",真:"zhen",假:"jia",什:"shen",麼:"me",樣:"yang",便:"bian",當:"dang",飯:"fan",在:"zai",幹:"gan",做:"zuo",事:"shi",情:"qing",睡:"shui",覺:"jiao",起:"qi",床:"chuang",早:"zao",晚:"wan",安:"an",謝:"xie",對:"dui",沒:"mei",有:"you",問:"wen",題:"ti",愛:"ai",喜:"xi",歡:"huan",可:"ke",以:"yi",會:"hui",能:"neng",跟:"gen",和:"he",但:"dan",就:"jiu",都:"dou",也:"ye",還:"hai",這:"zhe",那:"na",個:"ge",一:"yi",二:"er",三:"san",四:"si",五:"wu",六:"liu",七:"qi",八:"ba",九:"jiu",十:"shi",多:"duo",少:"shao",大:"da",小:"xiao",今:"jin",天:"tian",明:"ming",昨:"zuo",後:"hou",前:"qian",午:"wu",上:"shang",下:"xia",中:"zhong",午:"wu",夜:"ye",點:"dian",分:"fen",鐘:"zhong",小:"xiao",時:"shi",秒:"miao",又:"you",再:"zai",見:"jian",回:"hui",來:"lai",去:"qu",出:"chu",門:"men",家:"jia",裡:"li",外:"wai",面:"mian",樓:"lou",台:"tai",灣:"wan",臺:"tai",日:"ri",本:"ben",中:"zhong",國:"guo",人:"ren",誰:"shei",怎:"zen",為:"wei",何:"he",哪:"na",裡:"li",什:"shen",麼:"me",買:"mai",賣:"mai",錢:"qian",貴:"gui",便:"bian",宜:"yi",便:"bian",當:"dang",蛋:"dan",餅:"bing",麵:"mian",包:"bao",菜:"cai",魚:"yu",肉:"rou",雞:"ji",牛:"niu",豬:"zhu",奶:"nai",茶:"cha",咖:"ka",啡:"fei",水:"shui",冰:"bing",熱:"re",冷:"leng",甜:"tian",辣:"la",酸:"suan",苦:"ku",香:"xiang",快:"kuai",慢:"man",高:"gao",興:"xing",心:"xin",難:"nan",過:"guo",累:"lei",忙:"mang",餓:"e",飽:"bao",漂:"piao",亮:"liang",帥:"shuai",美:"mei",醜:"chou",棒:"bang",強:"qiang",弱:"ruo",胖:"pang",瘦:"shou",貓:"mao",狗:"gou",花:"hua",草:"cao",星:"xing",月:"yue",陽:"yang",雨:"yu",風:"feng",雪:"xue",火:"huo",山:"shan",海:"hai",車:"che",路:"lu",走:"zou",跑:"pao",跳:"tiao",玩:"wan",笑:"xiao",哭:"ku",說:"shuo",話:"hua",聽:"ting",看:"kan",讀:"du",寫:"xie",打:"da",開:"kai",關:"guan",電:"dian",腦:"nao",手:"shou",機:"ji",照:"zhao",片:"pian",照:"zhao",顧:"gu",朋:"peng",友:"you",老:"lao",師:"shi",同:"tong",學:"xue",工:"gong",作:"zuo",班:"ban",休:"xiu",息:"xi",請:"qing",給:"gei",謝:"xie",抱:"bao",歉:"qian",沒:"mei",關:"guan",係:"xi",馬:"ma",上:"shang",等:"deng",等:"deng",先:"xian",只:"zhi",都:"dou",每:"mei",次:"ci",讓:"rang",叫:"jiao",名:"ming",字:"zi",新:"xin",舊:"jiu",長:"chang",短:"duan",黑:"hei",白:"bai",紅:"hong",藍:"lan",綠:"lv",黃:"huang",粉:"fen",紫:"zi",橙:"cheng",灰:"hui",色:"se",女:"nv",男:"nan",孩:"hai",子:"zi",爸:"ba",媽:"ma",哥:"ge",姐:"jie",弟:"di",妹:"mei",公:"gong",司:"si",店:"dian",餐:"can",廳:"ting",超:"chao",市:"shi",場:"chang",生:"sheng",活:"huo",世:"shi",界:"jie",完:"wan",全:"quan",正:"zheng",確:"que",錯:"cuo",棒:"bang",得:"de",非:"fei",常:"chang",可:"ke",怕:"pa",樂:"le",玩:"wan",物:"wu",東:"dong",西:"xi",另:"ling",別:"bie",所:"suo",樣:"yang",故:"gu",意:"yi",思:"si",因:"yin",果:"guo",所:"suo",以:"yi",然:"ran",後:"hou",如:"ru",果:"guo",或:"huo",者:"zhe",跟:"gen",比:"bi",較:"jiao",最:"zui",第:"di",快:"kuai",點:"dian",啦:"la",呀:"ya",哇:"wa",欸:"ei",欸:"ei",吼:"hou",嗯:"en",唉:"ai",噢:"o",哈:"ha",嘿:"hei",嘻:"xi",嘿:"hei",啦:"la",嘞:"le",噠:"da",萌:"meng",的:"de",咧:"lie",哩:"li"
};
const pinyinToHira=p=>NihonPronunciation.pinyinToHira(p)||"";
const kata = s=>s.replace(/[ぁ-ゖ]/g,c=>String.fromCharCode(c.charCodeAt(0)+96));
const hira = s=>s.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96));
const punctuation = {"？":"？","?":"？","！":"！","!":"！","。":"。",",":"、","，":"、","～":"〜","~":"〜","、":"、","；":"；",":":"：","：":"："," ":" "};
const MAPPING_KEY = "nihonhuayu-custom-mappings-v1";
function loadMappings(){
  try {
    const value=JSON.parse(localStorage.getItem(MAPPING_KEY)||"{}");
    if(!value || typeof value!=="object" || Array.isArray(value)) return {};
    return Object.fromEntries(Object.entries(value).filter(([k,v])=>typeof k==="string"&&k.length<=24&&k.length>0&&typeof v==="string"&&v.length<=80&&v.length>0));
  }catch{return {}}
}
let customMappings=loadMappings();
function phraseEntries(){return Object.entries({...examples,...customMappings}).sort((a,b)=>b[0].length-a[0].length)}
function encode(input,mode){
 return NihonPronunciation.forward(input,mode,examples,customMappings);
}
function reverseEntries(){return phraseEntries().sort((a,b)=>b[1].length-a[1].length)}
const syllables=Object.entries(hanPinyin).map(([ch,p])=>[pinyinToHira(p),ch]).filter(([k])=>k).sort((a,b)=>b[0].length-a[0].length);
function decode(input){
 let out="",unknown=0;
 input=hira(input);
 const history=loadHistory();
 if(Object.prototype.hasOwnProperty.call(history,input))return {text:history[input],unknown:0,restored:true};
 for(let i=0;i<input.length;){
   const phrase=reverseEntries().find(([,kana])=>input.startsWith(hira(kana),i));
   if(phrase){out+=phrase[0];i+=hira(phrase[1]).length;continue}
   const c=input[i];
   if(punctuation[c]!==undefined){out+=c;i++;continue}
   const match=syllables.find(([kana])=>input.startsWith(kana,i));
   if(match){out+=match[1];i+=match[0].length;continue}
   if(/[\u3040-\u30ff]/.test(c)){unknown++;out+="〔"+c+"〕"}else out+=c;
   i++;
 }
 return {text:out,unknown,restored:false};
}
const HISTORY_KEY="nihonhuayu-conversions-v1";
function loadHistory(){try{return JSON.parse(localStorage.getItem(HISTORY_KEY)||"{}")}catch{return {}}}
function remember(source,converted){
 try{const saved=loadHistory();saved[hira(converted)]=source;const keys=Object.keys(saved);if(keys.length>100)delete saved[keys[0]];localStorage.setItem(HISTORY_KEY,JSON.stringify(saved))}catch{}
}
let reverse=false,reverseMode="sound",mode="mixed",last="",speechText="";
const EMPTY_RESULT="ここに出るよ ♡";
const setText=(value)=>{$("source").value=value;$("counter").textContent=[...value].length+" / 280";};
function redraw(){
 $("fromLang").textContent=reverse?(reverseMode==="sound"?"日文":"假日文"):"中文";
 $("toLang").textContent=reverse?(reverseMode==="sound"?"諧音中文":"中文"):"假日文";
 $("fromLang").classList.add("active");$("toLang").classList.remove("active");
 $("source").placeholder=reverse?(reverseMode==="sound"?"例如：ありがとう！":"例如：しぇんまやんで弁当？"):"例如：什麼樣的便當？";
 $("hint").textContent=reverse?(reverseMode==="sound"?"假名讀音 → 搞笑中文":"盡力還原，可能有歧義"):"越短越有梗！";
 setCat($("inputCat"),reverse?"2":"1");
 setCat($("outputCat"),reverse?"1":"2");
 $("resultLanguage").textContent=reverse?(reverseMode==="sound"?"貓咪一號 · 諧音中文":"貓咪一號 · 中文"):"貓咪二號 · 假日文";
 $("source").lang=reverse?"ja":"zh-Hant";
 $("output").lang=reverse?"zh-Hant":"ja";
 $("speechHelp").textContent=reverse?(reverseMode==="sound"?"用中文語音唸諧音字，模仿日文聲音；不是意思翻譯。":"中文結果使用中文語音朗讀。"):"日文朗讀使用泡泡內小字的片假名讀音，仍是趣味近似中文發音。";
 renderVoiceOptions();
 document.querySelector(".modebar").hidden=reverse;
 $("reverseModes").hidden=!reverse;
 document.querySelectorAll("[data-reverse-mode]").forEach(b=>{b.classList.toggle("selected",b.dataset.reverseMode===reverseMode);b.setAttribute("aria-pressed",String(b.dataset.reverseMode===reverseMode))});
 $("chineseExamples").hidden=reverse;$("japaneseExamples").hidden=!reverse;
 $("note").textContent=reverse?(reverseMode==="sound"?"用中文諧音模仿日文，不是意思翻譯。":"貼上假日文就能試著還原中文。"):"輸入一句中文試試看！";
}
function convert(silent=false){
 stopSpeaking();
 const source=$("source").value.trim();
 $("kanaReading").hidden=true;$("kanaReading").textContent="";speechText="";
 if(!source){last="";$("output").textContent=reverse?"中文會出現在這裡 ♡":EMPTY_RESULT;$("resultBadge").textContent="等你開口…";$("note").textContent=reverse?(reverseMode==="sound"?"輸入日文假名，試試搞笑中文諧音！":"反向轉換可能有多種結果，僅供參考。"):"輸入一句中文試試看！";return}
 const result=reverse?(reverseMode==="sound"?NihonPronunciation.funnyChinese(source):decode(source)):encode(source,mode);
 last=result.text;
 if(reverse)speechText=result.speechText??last;
 else{
  speechText=result.speechText;
  $("kanaReading").textContent="朗讀："+result.reading+(result.unknown?"（標示生字請自訂讀音）":"");
  $("kanaReading").hidden=false;
 }
 $("output").textContent=last||"（沒有結果）";
 $("resultBadge").textContent="即時更新 ✓";
 $("note").textContent=reverse?(reverseMode==="sound"?(result.unknown?"諧音近似，沒有翻譯意思。〔括號〕內的日文漢字或符號請改用假名；朗讀會略過。":"中文諧音近似日文聲音，沒有翻譯意思，也不會還原原句。"):(result.restored?"已從這部裝置的轉換紀錄還原；其他句子可能有歧義。":result.unknown?"反向轉換不保證正確；無法辨識的音節已加括號。":"反向轉換依讀音猜測，可能有多種原句。")):(result.degraded?"讀音字典未載入，請重新整理；目前只能轉換範例及自訂詞。":result.unknown?"部分生字未收錄，已保留原字；請在自訂讀音輸入假名，補齊朗讀。":"可愛度 +100 ✿ 這不是正式日文喔！");
 if(!reverse)remember(source,last);
 if(!silent && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) $("output").animate?.([{transform:"translateY(6px)",opacity:.3},{transform:"translateY(0)",opacity:1}],{duration:260,easing:"ease-out"});
}
let toastTimer;
const catArt={"1":["./Cat%201.png","./Cat%201%20-2.png"],"2":["./Cat%202.png","./Cat%202%20-2.png"]};
const catButtons=[...document.querySelectorAll(".cat-button")];
const MASCOT_KEY="nihonhuayu-hero-cat-v1";
let heroChoice="1";
try{if(localStorage.getItem(MASCOT_KEY)==="2")heroChoice="2"}catch{}
// Preload and decode alternatives so expression changes do not start a fetch.
const catPreloads=Object.values(catArt).flat().map(src=>{const img=new Image();img.src=src;img.decode().catch(()=>{});return img});
const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
let talkingTimer,talkingFrame=false,talking=false;
function renderCat(button){
 const speaking=talking&&(button.id==="outputCat"||button.classList.contains("hero-cat"));
 const open=button.dataset.pressed==="true"||(speaking&&talkingFrame);
 button.querySelector("img").src=catArt[button.dataset.cat][open?1:0];
 button.classList.toggle("talking",speaking);
}
function setCat(button,cat){
 button.dataset.cat=cat;
 button.setAttribute("aria-label","逗逗說"+(cat==="1"?"中文":"假日文")+"的貓咪");
 renderCat(button);
}
function selectHeroCat(cat){
 heroChoice=cat;
 $("heroCat").dataset.pressed="false";
 setCat($("heroCat"),cat);
 $("heroCat").setAttribute("aria-label","逗逗貓咪"+(cat==="1"?"一號":"二號"));
 $("swapMascot").setAttribute("aria-label","切換主角為貓咪"+(cat==="1"?"二號":"一號"));
}
$("swapMascot").addEventListener("click",()=>{
 selectHeroCat(heroChoice==="1"?"2":"1");
 try{localStorage.setItem(MASCOT_KEY,heroChoice)}catch{}
});
function stopTalking(){
 clearInterval(talkingTimer);talking=false;talkingFrame=false;catButtons.forEach(renderCat);
}
function startTalking(){
 stopTalking();talking=true;talkingFrame=true;catButtons.forEach(renderCat);
 if(!reducedMotion.matches)talkingTimer=setInterval(()=>{talkingFrame=!talkingFrame;catButtons.forEach(renderCat)},220);
}
reducedMotion.addEventListener("change",()=>{if(talking)startTalking()});
catButtons.forEach(button=>{
 const press=()=>{button.dataset.pressed="true";renderCat(button)};
 const release=()=>{button.dataset.pressed="false";renderCat(button)};
 button.addEventListener("pointerdown",e=>{if(!e.isPrimary||e.button!==0)return;press();button.setPointerCapture(e.pointerId)});
 for(const name of ["pointerup","pointercancel","lostpointercapture","blur"])button.addEventListener(name,release);
 button.addEventListener("keydown",e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();press()}});
 button.addEventListener("keyup",e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();release()}});
});
function releaseCats(){catButtons.forEach(b=>{b.dataset.pressed="false";renderCat(b)})}
window.addEventListener("blur",releaseCats);
const canSpeak="speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
let activeSpeech=null, speechTimer, voices=[];
const voiceChoices={"ja-JP":"","zh-TW":""};
function renderVoiceOptions(){
 const lang=reverse?"zh-TW":"ja-JP",select=$("speechVoice");
 select.replaceChildren(new Option("自動選擇（Safari 建議）",""));
 for(const voice of voices.filter(v=>v.lang.split(/[-_]/)[0]===lang.split("-")[0])){
  select.add(new Option(voice.name+" · "+voice.lang,voice.voiceURI));
 }
 select.value=voiceChoices[lang];
}
function refreshVoices(){
 try{voices=window.speechSynthesis.getVoices()}catch{voices=[]}
 renderVoiceOptions();
}
function speechState(playing,message=""){
 const b=$("speak");
 b.textContent=playing?"■ 停止":"🔊 朗讀";
 b.setAttribute("aria-label",playing?"停止朗讀":"朗讀結果");
 b.setAttribute("aria-pressed",String(playing));
 $("speechStatus").textContent=message||(!canSpeak?"這個瀏覽器不支援語音朗讀。":"");
}
function stopSpeaking(cancel=true){
 // Invalidate callbacks before cancel(), which may fire an error synchronously.
 const hadSpeech=!!activeSpeech;
 activeSpeech=null;
 clearTimeout(speechTimer);
 stopTalking();
 speechState(false);
 // Do not cancel an idle synthesizer on every keystroke or just before speak().
 // Older WebKit versions have had cancel/next-utterance races.
 if(canSpeak&&cancel){try{if(hadSpeech||window.speechSynthesis.speaking||window.speechSynthesis.pending)window.speechSynthesis.cancel()}catch{}}
}
function speakResult(){
 if(!last){notify("先輸入一句話吧！");return}
 if(!canSpeak){notify("這個瀏覽器不支援語音朗讀");return}
 if(activeSpeech){stopSpeaking();return}
 if(!speechText.trim()){speechState(false,"這句話沒有可朗讀的讀音，請新增自訂讀音後重試。");return}
 stopSpeaking();
 refreshVoices();
 let utterance;
 try{utterance=new SpeechSynthesisUtterance(speechText)}catch{speechState(false,"無法啟動朗讀，請檢查裝置語音設定。");return}
 utterance.lang=reverse?"zh-TW":"ja-JP";
 // Safari can speak a language even when getVoices omits its system voice.
 // Default to lang-only resolution; bind a voice only after explicit selection.
 const voice=voices.find(v=>v.voiceURI===voiceChoices[utterance.lang]&&voiceChoices[utterance.lang]);
 if(voice)utterance.voice=voice;
 utterance.rate=.9;
 utterance.volume=1;
 // These timers only recover missing native callbacks; they never delay speak().
 const watchdog=(ms,message)=>{
  clearTimeout(speechTimer);
  speechTimer=setTimeout(()=>{if(activeSpeech===utterance){stopSpeaking();speechState(false,message)}},ms);
 };
 utterance.onstart=()=>{if(activeSpeech===utterance){speechState(true,"朗讀中…");startTalking();watchdog(Math.max(30000,[...speechText].length*1500),"朗讀已逾時停止，可再點一次朗讀。")}};
 utterance.onend=()=>{if(activeSpeech===utterance)stopSpeaking(false)};
 utterance.onerror=e=>{if(activeSpeech===utterance){
  stopSpeaking();
  if(e.error!=="canceled"&&e.error!=="interrupted"){
   const message=e.error==="not-allowed"?"Safari 未允許播放，請直接再點一次朗讀。":/voice|language/.test(e.error)?"找不到所需語音，請展開語音設定選其他聲音或下載日文／中文語音。":"朗讀失敗，請檢查媒體音量，或在語音設定切換聲音後重試。";
   speechState(false,message);
  }
 }};
 activeSpeech=utterance;
 speechState(true,"正在啟動朗讀…");
 watchdog(10000,"語音未能啟動，請展開語音設定選其他聲音，並檢查 iPhone 媒體音量後再點朗讀。");
 try{
  // Keep both operations in the original click stack for iOS user activation.
  if(window.speechSynthesis.paused)window.speechSynthesis.resume();
  window.speechSynthesis.speak(utterance);
 }catch{stopSpeaking();speechState(false,"無法啟動朗讀，請檢查裝置語音設定。")}
}
if(canSpeak){refreshVoices();window.speechSynthesis.addEventListener("voiceschanged",refreshVoices)}
else{$("speak").setAttribute("aria-disabled","true");$("speechStatus").textContent="這個瀏覽器不支援語音朗讀。"}
$("speak").addEventListener("click",speakResult);
$("speechVoice").addEventListener("change",()=>{stopSpeaking();voiceChoices[reverse?"zh-TW":"ja-JP"]=$("speechVoice").value});
document.addEventListener("visibilitychange",()=>{if(document.hidden){releaseCats();stopSpeaking()}});
function notify(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2100)}
$("source").addEventListener("input",()=>{$("counter").textContent=[...$("source").value].length+" / 280";convert(true)});
$("clear").addEventListener("click",()=>{setText("");convert(true);$("source").focus()});
$("swap").addEventListener("click",()=>{const prior=$("source").value;if(last&&prior.trim())setText(last);reverse=!reverse;last="";redraw();convert(true)});
document.querySelectorAll("[data-reverse-mode]").forEach(b=>b.addEventListener("click",()=>{reverseMode=b.dataset.reverseMode;redraw();convert(true)}));
document.querySelectorAll(".modes button").forEach(b=>b.addEventListener("click",()=>{mode=b.dataset.mode;document.querySelectorAll(".modes button").forEach(x=>x.classList.toggle("selected",x===b));if($("source").value.trim()&&!reverse)convert(true)}));
document.querySelectorAll("[data-example]").forEach(b=>b.addEventListener("click",()=>{reverse=false;redraw();setText(b.dataset.example);convert(true);document.querySelector(".workspace").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})}));
document.querySelectorAll("[data-japanese-example]").forEach(b=>b.addEventListener("click",()=>{reverse=true;reverseMode="sound";redraw();setText(b.dataset.japaneseExample);convert(true);document.querySelector(".workspace").scrollIntoView({behavior:reducedMotion.matches?"auto":"smooth",block:"start"})}));
$("copy").addEventListener("click",async()=>{if(!last){notify("先輸入一句話吧！");return}try{await navigator.clipboard.writeText(last);notify("複製成功！♡")}catch{notify("請長按結果來複製")}});
$("share").addEventListener("click",async()=>{if(!last){notify("先輸入一句話吧！");return}if(navigator.share){try{await navigator.share({text:last})}catch(e){if(e.name!=="AbortError")notify("分享失敗，請使用複製結果")}}else{try{await navigator.clipboard.writeText(last);notify("已複製，可貼到聊天裡 ✿")}catch{notify("請長按結果來分享")}}});
function renderMappings(){
 const list=$("mappingList");list.replaceChildren();
 for(const [ch,jp] of Object.entries(customMappings).sort(([a],[b])=>a.localeCompare(b))){
  const li=document.createElement("li"),pair=document.createElement("span"),remove=document.createElement("button");
  pair.textContent=ch+" → "+jp;
  remove.type="button";remove.textContent="刪除";remove.setAttribute("aria-label","刪除 "+ch);
  remove.addEventListener("click",()=>{delete customMappings[ch];persistMappings();renderMappings();convert(true)});
  li.append(pair,remove);list.append(li);
 }
 if(!list.children.length){const li=document.createElement("li");li.className="empty";li.textContent="尚未新增自訂讀音";list.append(li)}
}
function persistMappings(){try{localStorage.setItem(MAPPING_KEY,JSON.stringify(customMappings))}catch{notify("此瀏覽器無法儲存設定")}}
$("mappingForm").addEventListener("submit",e=>{
 e.preventDefault();
 const ch=$("mappingChinese").value.trim(),jp=$("mappingJapanese").value.trim();
 if(!ch||!jp)return;
 customMappings[ch]=jp;persistMappings();renderMappings();convert(true);
 $("mappingForm").reset();notify("自訂讀音已儲存 ♡");
});
$("resetMappings").addEventListener("click",()=>{
 if(!Object.keys(customMappings).length)return;
 if(!confirm("確定清除所有自訂讀音？"))return;
 customMappings={};persistMappings();renderMappings();convert(true);notify("已清除自訂讀音");
});
$("fromLang").addEventListener("click",()=>{if(reverse)$("swap").click()});
$("toLang").addEventListener("click",()=>{if(!reverse)$("swap").click()});
selectHeroCat(heroChoice);
renderMappings();
redraw();
