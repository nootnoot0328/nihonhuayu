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
  "我很餓":"うぉへんうぉ",
  "不知道":"ぶーじーだお",
  "便當":"弁当"
};
const hanPinyin = {
 我:"wo",你:"ni",他:"ta",她:"ta",它:"ta",們:"men",是:"shi",不:"bu",知:"zhi",道:"dao",想:"xiang",要:"yao",吃:"chi",喝:"he",嗎:"ma",嘛:"ma",呢:"ne",啊:"a",啦:"la",耶:"ye",喔:"o",哦:"o",了:"le",的:"de",得:"de",地:"de",好:"hao",很:"hen",太:"tai",真:"zhen",假:"jia",什:"shen",麼:"me",樣:"yang",便:"bian",當:"dang",飯:"fan",在:"zai",幹:"gan",做:"zuo",事:"shi",情:"qing",睡:"shui",覺:"jiao",起:"qi",床:"chuang",早:"zao",晚:"wan",安:"an",謝:"xie",對:"dui",沒:"mei",有:"you",問:"wen",題:"ti",愛:"ai",喜:"xi",歡:"huan",可:"ke",以:"yi",會:"hui",能:"neng",跟:"gen",和:"he",但:"dan",就:"jiu",都:"dou",也:"ye",還:"hai",這:"zhe",那:"na",個:"ge",一:"yi",二:"er",三:"san",四:"si",五:"wu",六:"liu",七:"qi",八:"ba",九:"jiu",十:"shi",多:"duo",少:"shao",大:"da",小:"xiao",今:"jin",天:"tian",明:"ming",昨:"zuo",後:"hou",前:"qian",午:"wu",上:"shang",下:"xia",中:"zhong",午:"wu",夜:"ye",點:"dian",分:"fen",鐘:"zhong",小:"xiao",時:"shi",秒:"miao",又:"you",再:"zai",見:"jian",回:"hui",來:"lai",去:"qu",出:"chu",門:"men",家:"jia",裡:"li",外:"wai",面:"mian",樓:"lou",台:"tai",灣:"wan",臺:"tai",日:"ri",本:"ben",中:"zhong",國:"guo",人:"ren",誰:"shei",怎:"zen",為:"wei",何:"he",哪:"na",裡:"li",什:"shen",麼:"me",買:"mai",賣:"mai",錢:"qian",貴:"gui",便:"bian",宜:"yi",便:"bian",當:"dang",蛋:"dan",餅:"bing",麵:"mian",包:"bao",菜:"cai",魚:"yu",肉:"rou",雞:"ji",牛:"niu",豬:"zhu",奶:"nai",茶:"cha",咖:"ka",啡:"fei",水:"shui",冰:"bing",熱:"re",冷:"leng",甜:"tian",辣:"la",酸:"suan",苦:"ku",香:"xiang",快:"kuai",慢:"man",高:"gao",興:"xing",心:"xin",難:"nan",過:"guo",累:"lei",忙:"mang",餓:"e",飽:"bao",漂:"piao",亮:"liang",帥:"shuai",美:"mei",醜:"chou",棒:"bang",強:"qiang",弱:"ruo",胖:"pang",瘦:"shou",貓:"mao",狗:"gou",花:"hua",草:"cao",星:"xing",月:"yue",陽:"yang",雨:"yu",風:"feng",雪:"xue",火:"huo",山:"shan",海:"hai",車:"che",路:"lu",走:"zou",跑:"pao",跳:"tiao",玩:"wan",笑:"xiao",哭:"ku",說:"shuo",話:"hua",聽:"ting",看:"kan",讀:"du",寫:"xie",打:"da",開:"kai",關:"guan",電:"dian",腦:"nao",手:"shou",機:"ji",照:"zhao",片:"pian",照:"zhao",顧:"gu",朋:"peng",友:"you",老:"lao",師:"shi",同:"tong",學:"xue",工:"gong",作:"zuo",班:"ban",休:"xiu",息:"xi",請:"qing",給:"gei",謝:"xie",抱:"bao",歉:"qian",沒:"mei",關:"guan",係:"xi",馬:"ma",上:"shang",等:"deng",等:"deng",先:"xian",只:"zhi",都:"dou",每:"mei",次:"ci",讓:"rang",叫:"jiao",名:"ming",字:"zi",新:"xin",舊:"jiu",長:"chang",短:"duan",黑:"hei",白:"bai",紅:"hong",藍:"lan",綠:"lv",黃:"huang",粉:"fen",紫:"zi",橙:"cheng",灰:"hui",色:"se",女:"nv",男:"nan",孩:"hai",子:"zi",爸:"ba",媽:"ma",哥:"ge",姐:"jie",弟:"di",妹:"mei",公:"gong",司:"si",店:"dian",餐:"can",廳:"ting",超:"chao",市:"shi",場:"chang",生:"sheng",活:"huo",世:"shi",界:"jie",完:"wan",全:"quan",正:"zheng",確:"que",錯:"cuo",棒:"bang",得:"de",非:"fei",常:"chang",可:"ke",怕:"pa",樂:"le",玩:"wan",物:"wu",東:"dong",西:"xi",另:"ling",別:"bie",所:"suo",樣:"yang",故:"gu",意:"yi",思:"si",因:"yin",果:"guo",所:"suo",以:"yi",然:"ran",後:"hou",如:"ru",果:"guo",或:"huo",者:"zhe",跟:"gen",比:"bi",較:"jiao",最:"zui",第:"di",快:"kuai",點:"dian",啦:"la",呀:"ya",哇:"wa",欸:"ei",欸:"ei",吼:"hou",嗯:"en",唉:"ai",噢:"o",哈:"ha",嘿:"hei",嘻:"xi",嘿:"hei",啦:"la",嘞:"le",噠:"da",萌:"meng",的:"de",咧:"lie",哩:"li"
};
const initialMap = [["zh","じ"],["ch","ち"],["sh","し"],["x","し"],["q","ち"],["j","じ"],["z","ず"],["c","つ"],["s","す"],["r","ら"],["b","ぶ"],["p","ぷ"],["m","ま"],["f","ふ"],["d","で"],["t","た"],["n","な"],["l","ら"],["g","ぐ"],["k","く"],["h","は"]];
const finals = {a:"あ",ai:"あい",ao:"あお",an:"あん",ang:"あん",e:"え",ei:"えい",en:"えん",eng:"えん",er:"ある",o:"お",ou:"おう",ong:"おん",u:"う",ua:"わ",uai:"わい",uan:"わん",uang:"わん",ui:"うい",un:"うん",uo:"うぉ",ue:"うえ",ueng:"うん",i:"い",ia:"や",ian:"えん",iang:"やん",iao:"やお",ie:"え",in:"いん",ing:"いん",iong:"よん",iu:"よう",ian:"えん",v:"ゆ",ve:"ゆえ",van:"ゆえん",vn:"ゆん"};
const syllableSpecial = {wo:"うぉ",ni:"に",ta:"た",men:"めん",shi:"し",zhi:"じー",chi:"ちー",hao:"はお",de:"で",ma:"ま",shen:"しぇん",me:"ま",yang:"やん",bian:"べん",dang:"だん",zai:"ざい",gan:"がん",jiao:"じあお",zhen:"じぇん",jia:"じあ",dao:"だお",bu:"ぶー",le:"ら",ai:"あい",xie:"しぇ",dui:"どぅい",xi:"し",huan:"ふぁん",fan:"ふぁん",la:"ら",o:"お",ye:"え",yao:"やお",hen:"へん",e:"うぉ",wan:"わん",an:"あん",zao:"ざお",ke:"くー",na:"な",zen:"ぜん",guo:"ぐぉ",mei:"めい",you:"よう",zhe:"じぇ",yi:"い",ru:"る"};
function pinyinToHira(p){
  if(syllableSpecial[p]) return syllableSpecial[p];
  if(p==="yu"||p==="yue") return p==="yu"?"ゆ":"ゆえ";
  const ini=initialMap.find(([k])=>p.startsWith(k));
  if(!ini)return finals[p] || p.replace(/[^a-z]/g,"") || "";
  const tail=p.slice(ini[0].length);
  return ini[1]+(finals[tail]||finals[tail.replace(/^y/,"i")]||"");
}
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
const phrasePairs = phraseEntries();
function encode(input,mode){
  let out="",unknown=0;
  for(let i=0;i<input.length;){
    const match=phraseEntries().find(([ch])=>input.startsWith(ch,i));
    if(match){
      const value=mode==="mixed"?match[1]:hira(match[1]).replace(/弁当/g,"べんだん").replace(/睡覚/g,"しゅいじあお");
      out+=mode==="kata"?kata(value):value;i+=match[0].length;continue;
    }
    const c=input[i++];
    if(punctuation[c]!==undefined){out+=punctuation[c];continue}
    if(hanPinyin[c]){let v=pinyinToHira(hanPinyin[c]);out+=mode==="kata"?kata(v):v;continue}
    if(/[\u3400-\u9fff]/u.test(c)){out+=c;unknown++;continue}
    out+=c;
  }
  return {text:out,unknown};
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
let reverse=false,mode="mixed",last="";
const EMPTY_RESULT="ここに出るよ ♡";
const setText=(value)=>{$("source").value=value;$("counter").textContent=[...value].length+" / 280";};
function redraw(){
 $("fromLang").textContent=reverse?"假日文":"中文";
 $("toLang").textContent=reverse?"中文":"假日文";
 $("fromLang").classList.add("active");$("toLang").classList.remove("active");
 $("source").placeholder=reverse?"例如：しぇんまやんで弁当？":"例如：什麼樣的便當？";
 $("hint").textContent=reverse?"辨識貼上的假日文（盡力還原）":"越短越有梗！";
 $("convert").innerHTML=(reverse?"🔎 解碼！":"✨ 變身！")+'<span class="arrow">↗</span>';
 document.querySelector(".modebar").hidden=reverse;
 $("note").textContent=reverse?"貼上假日文就能試著還原中文。":"輸入一句中文試試看！";
}
function convert(silent=false){
 const source=$("source").value.trim();
 if(!source){last="";$("output").textContent=EMPTY_RESULT;$("resultBadge").textContent="等待施法中…";$("note").textContent=reverse?"反向轉換可能有多種結果，僅供參考。":"輸入一句中文試試看！";if(!silent)notify("先輸入一句話吧 ♡");return}
 const result=reverse?decode(source):encode(source,mode);
 last=result.text;
 $("output").textContent=last||"（沒有結果）";
 $("resultBadge").textContent=reverse?"解碼完成 ✓":"變身成功 ✨";
 $("note").textContent=reverse?(result.restored?"已從這部裝置的轉換紀錄還原；其他句子可能有歧義。":result.unknown?"反向轉換不保證正確；無法辨識的音節已加括號。":"反向轉換依讀音猜測，可能有多種原句。"):(result.unknown?"部分生字未收錄，已保留原字。":"可愛度 +100 ✿ 這不是正式日文喔！");
 if(!reverse)remember(source,last);
 if(!silent && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) $("output").animate?.([{transform:"translateY(6px)",opacity:.3},{transform:"translateY(0)",opacity:1}],{duration:260,easing:"ease-out"});
}
let toastTimer;
function notify(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2100)}
$("source").addEventListener("input",()=>{$("counter").textContent=[...$("source").value].length+" / 280";convert(true)});
$("convert").addEventListener("click",()=>convert(false));
$("clear").addEventListener("click",()=>{setText("");last="";$("output").textContent="ここに出るよ ♡";$("resultBadge").textContent="等待施法中…";$("source").focus()});
$("swap").addEventListener("click",()=>{const prior=$("source").value;if(last&&prior.trim())setText(last);reverse=!reverse;last="";redraw();convert(true)});
document.querySelectorAll(".modes button").forEach(b=>b.addEventListener("click",()=>{mode=b.dataset.mode;document.querySelectorAll(".modes button").forEach(x=>x.classList.toggle("selected",x===b));if($("source").value.trim()&&!reverse)convert(true)}));
document.querySelectorAll("[data-example]").forEach(b=>b.addEventListener("click",()=>{reverse=false;redraw();setText(b.dataset.example);convert(true);document.querySelector(".workspace").scrollIntoView({behavior:"smooth",block:"start"})}));
$("copy").addEventListener("click",async()=>{if(!last){notify("先變身一下吧！");return}try{await navigator.clipboard.writeText(last);notify("複製成功！♡")}catch{notify("請長按結果來複製")}});
$("share").addEventListener("click",async()=>{if(!last){notify("先變身一下吧！");return}if(navigator.share){try{await navigator.share({text:last})}catch{}}else{try{await navigator.clipboard.writeText(last);notify("已複製，可貼到聊天裡 ✿")}catch{notify("請長按結果來分享")}}});
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
renderMappings();
redraw();
