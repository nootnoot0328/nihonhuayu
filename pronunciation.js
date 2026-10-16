/* Local phonetic approximations, not meaning translation. Vendor dictionaries
 * supply Mandarin readings; kana/Chinese spellings below are editorial choices. */
(function(root){
 "use strict";
 const hira=s=>s.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96));
 const kata=s=>s.replace(/[ぁ-ゖ]/g,c=>String.fromCharCode(c.charCodeAt(0)+96));
 const han=/\p{Script=Han}/u;
 const punctuation={"?":"？","!":"！",",":"、","，":"、","~":"〜","～":"〜",":":"："};
 const punct=c=>punctuation[c]??c;

 // Explicit syllables avoid the old initial+final concatenation (e.g. b+i
 // becoming bu-i). ü uses v, matching pinyin-pro's tone-free output.
 const rows=[
  "a:あ ai:あい an:あん ang:あん ao:あお e:え ei:えい en:えん eng:えん er:ある o:お ou:おう ê:え m:む n:ん ng:ん hm:ふむ hng:ふん",
  "ba:ば bai:ばい ban:ばん bang:ばん bao:ばお bei:べい ben:べん beng:ぼん bi:び bian:びえん biao:びゃお bie:びえ bin:びん bing:びん bo:ぼ bu:ぶ",
  "pa:ぱ pai:ぱい pan:ぱん pang:ぱん pao:ぱお pei:ぺい pen:ぺん peng:ぽん pi:ぴ pian:ぴえん piao:ぴゃお pie:ぴえ pin:ぴん ping:ぴん po:ぽ pou:ぽう pu:ぷ",
  "ma:ま mai:まい man:まん mang:まん mao:まお me:ま mei:めい men:めん meng:もん mi:み mian:みえん miao:みゃお mie:みえ min:みん ming:みん miu:みょう mo:も mou:もう mu:む",
  "fa:ふぁ fan:ふぁん fang:ふぁん fei:ふぇい fen:ふぇん feng:ふぉん fo:ふぉ fou:ふぉう fu:ふー",
  "da:だ dai:だい dan:だん dang:だん dao:だお de:で dei:でい den:でん deng:どん di:でぃ dia:でぃあ dian:でぃえん diao:でぃあお die:でぃえ ding:でぃん diu:でぃょう dong:どん dou:どう du:どぅ duan:どぅわん dui:どぅい dun:どぅん duo:どぅお",
  "ta:た tai:たい tan:たん tang:たん tao:たお te:て teng:とん ti:てぃ tian:てぃえん tiao:てぃあお tie:てぃえ ting:てぃん tong:とん tou:とう tu:とぅ tuan:とぅわん tui:とぅい tun:とぅん tuo:とぅお",
  "na:な nai:ない nan:なん nang:なん nao:なお ne:ね nei:ねい nen:ねん neng:のん ni:に nian:にえん niang:にゃん niao:にゃお nie:にえ nin:にん ning:にん niu:にょう nong:のん nou:のう nu:ぬ nuan:ぬわん nun:ぬん nuo:ぬお nv:にゅ nve:にゅえ",
  "la:ら lai:らい lan:らん lang:らん lao:らお le:ら lei:れい leng:ろん li:り lia:りゃ lian:りえん liang:りゃん liao:りゃお lie:りえ lin:りん ling:りん liu:りょう lo:ろ long:ろん lou:ろう lu:る luan:るわん lun:るん luo:るお lv:りゅ lve:りゅえ",
  "ga:が gai:がい gan:がん gang:がん gao:がお ge:ぐー gei:げい gen:げん geng:ごん gong:ごん gou:ごう gu:ぐ gua:ぐわ guai:ぐわい guan:ぐわん guang:ぐわん gui:ぐい gun:ぐん guo:ぐぉ",
  "ka:か kai:かい kan:かん kang:かん kao:かお ke:くー kei:けい ken:けん keng:こん kong:こん kou:こう ku:く kua:くわ kuai:くわい kuan:くわん kuang:くわん kui:くい kun:くん kuo:くぉ",
  "ha:は hai:はい han:はん hang:はん hao:はお he:ほー hei:へい hen:へん heng:ほん hong:ほん hou:ほう hu:ふ hua:ふぁ huai:ふぁい huan:ふぁん huang:ふぁん hui:ふい hun:ふん huo:ふぉ",
  "ji:じ jia:じゃ jian:じえん jiang:じゃん jiao:じゃお jie:じえ jin:じん jing:じん jiong:じょん jiu:じょう ju:じゅ juan:じゅえん jue:じゅえ jun:じゅん",
  "qi:ち qia:ちゃ qian:ちえん qiang:ちゃん qiao:ちゃお qie:ちえ qin:ちん qing:ちん qiong:ちょん qiu:ちょう qu:ちゅ quan:ちゅえん que:ちゅえ qun:ちゅん",
  "xi:し xia:しゃ xian:しえん xiang:しゃん xiao:しゃお xie:しぇ xin:しん xing:しん xiong:しょん xiu:しょう xu:しゅ xuan:しゅえん xue:しゅえ xun:しゅん",
  "zha:じゃ zhai:じゃい zhan:じゃん zhang:じゃん zhao:じゃお zhe:じぇ zhei:じぇい zhen:じぇん zheng:じょん zhi:じー zhong:じょん zhou:じょう zhu:じゅ zhua:じゅわ zhuai:じゅわい zhuan:じゅわん zhuang:じゅわん zhui:じゅい zhun:じゅん zhuo:じゅお",
  "cha:ちゃ chai:ちゃい chan:ちゃん chang:ちゃん chao:ちゃお che:ちぇ chen:ちぇん cheng:ちょん chi:ちー chong:ちょん chou:ちょう chu:ちゅ chua:ちゅわ chuai:ちゅわい chuan:ちゅわん chuang:ちゅわん chui:ちゅい chun:ちゅん chuo:ちゅお",
  "sha:しゃ shai:しゃい shan:しゃん shang:しゃん shao:しゃお she:しぇ shei:しぇい shen:しぇん sheng:しょん shi:し shou:しょう shu:しゅ shua:しゅわ shuai:しゅわい shuan:しゅわん shuang:しゅわん shui:しゅい shun:しゅん shuo:しゅお",
  "ran:らん rang:らん rao:らお re:るー ren:れん reng:ろん ri:りー rong:ろん rou:ろう ru:る ruan:るわん rui:るい run:るん ruo:るお",
  "za:ざ zai:ざい zan:ざん zang:ざん zao:ざお ze:ぜ zei:ぜい zen:ぜん zeng:ぞん zi:ずー zong:ぞん zou:ぞう zu:ず zuan:ずわん zui:ずい zun:ずん zuo:ずお",
  "ca:つぁ cai:つぁい can:つぁん cang:つぁん cao:つぁお ce:つぇ cen:つぇん ceng:つぉん ci:つー cong:つぉん cou:つぉう cu:つ cuan:つわん cui:つい cun:つん cuo:つぉ",
  "sa:さ sai:さい san:さん sang:さん sao:さお se:せ sen:せん seng:そん si:すー song:そん sou:そう su:す suan:すわん sui:すい sun:すん suo:すお",
  "ya:や yan:いえん yang:やん yao:やお ye:え yi:い yin:いん ying:いん yo:よ yong:よん you:よう yu:ゆ yuan:ゆえん yue:ゆえ yun:ゆん",
  "wa:わ wai:わい wan:わん wang:わん wei:うぇい wen:うぇん weng:うぉん wo:うぉ wu:うー",
  "biang:びゃん duang:どぅわん fiao:ふぃゃお cei:つぇい len:れん rua:るわ tei:てい din:でぃん nia:にゃ yai:やい"
 ];
 const syllables=Object.fromEntries(rows.flatMap(row=>row.split(" ").map(pair=>pair.split(":"))));
 function pinyinToHira(p){return syllables[p.toLowerCase().replace(/ü/g,"v")]||null}
 let simplify;
 function mandarinTokens(input){
  if(!root.pinyinPro||!root.OpenCC)return {tokens:[...input].map(origin=>({origin,kana:null})),degraded:true};
  simplify??=root.OpenCC.Converter({from:"t",to:"cn"});
  const originals=[...input],simplified=simplify(input);
  // Keep original text alignment even for an exceptional length-changing rewrite.
  const normalized=[...simplified].length===originals.length?simplified:originals.map(c=>{const s=simplify(c);return [...s].length===1?s:c}).join("");
  const readings=root.pinyinPro.pinyin(normalized,{type:"all",toneType:"none",v:true,traditional:true});
  return {tokens:readings.map((r,i)=>({origin:originals[i],pinyin:r.isZh?r.pinyin:null,kana:r.isZh?pinyinToHira(r.pinyin):null})),degraded:false};
 }
 function mappedReading(value){
  const expanded=hira(value).replace(/弁当/g,"べんだん").replace(/睡覚/g,"しゅいじあお");
  const result=mandarinTokens(expanded);
  let text="",reading="",speech="",unknown=0;
  for(const t of result.tokens){
   const c=t.kana||punct(t.origin);text+=c;
   if(han.test(c)){unknown++;reading+="〔"+c+"〕";speech+=" ";}else{reading+=c;speech+=c;}
  }
  return {text,reading,speech,unknown,degraded:result.degraded};
 }
 // Display accents only. The pronunciation always comes from the source tokens.
 const mixedWords=["珍珠奶茶","圖書館","图书馆","電腦","电脑","手機","手机","音樂","音乐","電影","电影","學校","学校","學生","学生","老師","老师","先生","朋友","家人","生日","週末","周末","今天","明天","昨天","晚上","早上","早餐","午餐","晚餐","奶茶","咖啡","蛋糕","布丁","拉麵","拉面","鳳梨","凤梨","水果","蘋果","苹果","西瓜","牛奶","餅乾","饼干","餃子","饺子","火鍋","火锅","臺灣","台灣","台湾","日本","東京","东京","大阪","中文","日文","漢字","汉字","天氣","天气","太陽","太阳","月亮","星星","花火","櫻花","樱花","可愛","可爱","開心","开心","快樂","快乐","工作","旅行","睡覺","睡觉","貓咪","猫咪","貓","猫","狗"].sort((a,b)=>b.length-a.length);
 function mixedAccents(input,tokens,customPairs){
  const accents=new Map(),protectedIndices=new Set();
  for(const [key] of customPairs){
   for(let at=input.indexOf(key);at!==-1;at=input.indexOf(key,at+1))for(let i=at;i<at+key.length;i++)protectedIndices.add(i);
  }
  let at=0;const positions=tokens.map(t=>{const p={...t,at};at+=t.origin.length;return p});
  const byIndex=new Map(positions.map(t=>[t.at,t]));
  for(let i=0;i<input.length;){
   const word=mixedWords.find(word=>input.startsWith(word,i)&&[...word].every((c,n)=>byIndex.get(i+n)?.kana&&!protectedIndices.has(i+n)));
   if(word){for(let n=0;n<word.length;n++)accents.set(i+n,input[i+n]);i+=word.length}
   else i+=String.fromCodePoint(input.codePointAt(i)).length;
  }
  // Give unfamiliar sentences the same mixed-script character. Retain about
  // one content character in four; avoid decorating particles and pronouns.
  const particles=new Set([..."我你他她它們们的得地是了嗎吗呢啊嘛不在和與与也就都又還还這这个那個"]);
  for(let i=0;i<positions.length;){
   if(!han.test(positions[i].origin)){i++;continue}
   let end=i;while(end<positions.length&&han.test(positions[end].origin))end++;
   const run=positions.slice(i,end),eligible=run.filter(t=>t.kana&&!protectedIndices.has(t.at)&&!particles.has(t.origin));
   for(let n=2;n<eligible.length;n+=4)if(!accents.has(eligible[n].at))accents.set(eligible[n].at,eligible[n].origin);
   if(run.length>=3&&!run.some(t=>accents.has(t.at))&&eligible.length)accents.set(eligible.at(-1).at,eligible.at(-1).origin);
   i=end;
  }
  return accents;
 }
 function forward(input,mode,examples={},custom={}){
  const customPairs=Object.entries(custom).sort((a,b)=>b[0].length-a[0].length);
  const builtins=Object.entries(examples).sort((a,b)=>b[0].length-a[0].length);
  const readings=mandarinTokens(input),byIndex=new Map();
  const accents=mode==="mixed"?mixedAccents(input,readings.tokens,customPairs):new Map();
  let offset=0;for(const token of readings.tokens){byIndex.set(offset,token);offset+=token.origin.length}
  let text="",reading="",speech="",unknown=0,degraded=readings.degraded;
  for(let i=0;i<input.length;){
   // A short personal mapping inside a curated phrase must still win.
   const match=customPairs.find(([ch])=>input.startsWith(ch,i))||builtins.find(([ch])=>input.startsWith(ch,i)&&!customPairs.some(([key])=>ch.includes(key)));
   if(match){
    const r=mappedReading(match[1]);
    text+=mode==="mixed"?match[1]:mode==="kata"?kata(r.text):r.text;
    reading+=kata(r.reading);speech+=kata(r.speech);unknown+=r.unknown;degraded||=r.degraded;i+=match[0].length;continue;
   }
   const token=byIndex.get(i),c=String.fromCodePoint(input.codePointAt(i));
   const value=token?.kana||punct(c);
   text+=mode==="mixed"?(accents.get(i)??value):mode==="kata"?kata(value):value;
   if(han.test(c)&&!token?.kana){unknown++;reading+="〔"+c+"〕";speech+=" ";}else{reading+=kata(value);speech+=kata(value);}
   i+=c.length;
  }
  return {text,reading,speechText:speech,unknown,degraded};
 }

 // A kana mora → a Mandarin-readable character (or characters). These choices
 // deliberately sound silly; they do not encode the meaning of Japanese words.
 const kanaRows=[
  "あ:阿 い:伊 う:烏 え:欸 お:喔 ぁ:阿 ぃ:伊 ぅ:烏 ぇ:欸 ぉ:喔",
  "か:咖 き:奇 く:庫 け:凱 こ:摳 が:嘎 ぎ:吉 ぐ:咕 げ:給 ご:狗",
  "さ:撒 し:西 す:蘇 せ:瑟 そ:搜 ざ:雜 じ:吉 ず:茲 ぜ:賊 ぞ:走",
  "た:塔 ち:七 つ:粗 て:貼 と:多 だ:打 ぢ:吉 づ:茲 で:爹 ど:多",
  "な:那 に:尼 ぬ:努 ね:捏 の:諾 は:哈 ひ:希 ふ:呼 へ:黑 ほ:吼",
  "ば:巴 び:比 ぶ:布 べ:貝 ぼ:波 ぱ:趴 ぴ:皮 ぷ:噗 ぺ:佩 ぽ:坡",
  "ま:嘛 み:米 む:姆 め:咩 も:摸 や:呀 ゆ:優 よ:唷 ゃ:呀 ゅ:優 ょ:唷",
  "ら:拉 り:哩 る:嚕 れ:雷 ろ:囉 わ:哇 ゐ:伊 ゑ:欸 を:喔 ん:恩 ゔ:芙 ゎ:哇 ゕ:咖 ゖ:凱",
  "きゃ:恰 きゅ:丘 きょ:秋 ぎゃ:嘎呀 ぎゅ:啾 ぎょ:久",
  "しゃ:蝦 しゅ:咻 しょ:秀 じゃ:加 じゅ:啾 じょ:啾",
  "ちゃ:恰 ちゅ:啾 ちょ:秋 にゃ:娘 にゅ:妞 にょ:扭",
  "ひゃ:蝦 ひゅ:咻 ひょ:秀 びゃ:比呀 びゅ:比優 びょ:比唷",
  "ぴゃ:皮呀 ぴゅ:皮優 ぴょ:皮唷 みゃ:米呀 みゅ:米優 みょ:米唷",
  "りゃ:哩呀 りゅ:溜 りょ:溜 ぢゃ:加 ぢゅ:啾 ぢょ:啾",
  "ふぁ:發 ふぃ:菲 ふぇ:非 ふぉ:佛 ふゅ:呼優 うぃ:威 うぇ:威 うぉ:窩",
  "てぃ:踢 でぃ:迪 とぅ:圖 どぅ:嘟 てゅ:踢優 でゅ:迪優",
  "しぇ:謝 じぇ:傑 ちぇ:切 いぇ:耶 つぁ:擦 つぃ:七 つぇ:切 つぉ:搓",
  "ゔぁ:哇 ゔぃ:威 ゔぇ:威 ゔぉ:窩 ゔゅ:芙優 くぁ:誇 くぃ:奎 くぇ:奎 くぉ:闊 ぐぁ:瓜 ぐぃ:歸 ぐぇ:歸 ぐぉ:郭"
 ];
 const kana=Object.fromEntries(kanaRows.flatMap(row=>row.split(" ").map(pair=>pair.split(":"))));
 const japaneseWords={"日本語":"にほんご","日本":"にほん","今日":"きょう","明日":"あした","昨日":"きのう","私":"わたし","学校":"がっこう","学生":"がくせい","先生":"せんせい","元気":"げんき","大丈夫":"だいじょうぶ","好き":"すき","東京":"とうきょう","大阪":"おおさか","猫":"ねこ","犬":"いぬ","弁当":"べんとう","可愛い":"かわいい","お早う":"おはよう","有難う":"ありがとう","有難い":"ありがたい"};
 const japanesePhrases={"ありがとうございます":"阿哩嘎多勾雜伊媽蘇","ありがとう":"阿哩嘎多","こんにちは":"空尼七哇","こんばんは":"空幫哇","おはよう":"喔哈唷","すみません":"蘇米媽森","よろしく":"唷囉西庫"};
 const longest=object=>Object.entries(object).sort((a,b)=>b[0].length-a[0].length);
 const wordPairs=longest(japaneseWords),phrasePairs=longest(japanesePhrases),kanaPairs=longest(kana);
 const vowelRows=["あぁかがさざただなはばぱまやゃらわゎ", "いぃきぎしじちぢにひびぴみりゐ", "うぅくぐすずつづぬふぶぷむゆゅるゔ", "えぇけげせぜてでねへべぺめれゑ", "おぉこごそぞとどのほぼぽもよょろを"];
 function funnyChinese(input){
  // NFKC covers half-width katakana, and NFC combines decomposed dakuten.
  let normalized=hira(input.normalize("NFKC").normalize("NFC"));
  for(const [word,reading] of wordPairs)normalized=normalized.split(word).join(reading);
  let text="",speech="",unknown=0,lastVowel="";
  for(let i=0;i<normalized.length;){
   const phrase=phrasePairs.find(([key])=>normalized.startsWith(key,i));
   if(phrase){text+=phrase[1];speech+=phrase[1];i+=phrase[0].length;lastVowel="";continue}
   const match=kanaPairs.find(([key])=>normalized.startsWith(key,i));
   if(match){
    text+=match[1];speech+=match[1];i+=match[0].length;
    const end=match[0].at(-1),vowel=vowelRows.findIndex(row=>row.includes(end));lastVowel=vowel>=0?["阿","伊","烏","欸","喔"][vowel]:"";continue;
   }
   const c=String.fromCodePoint(normalized.codePointAt(i));i+=c.length;
   if(c==="っ"){text+="·";speech+="，";lastVowel="";continue}
   if(c==="ー"){text+=lastVowel||"〜";speech+=lastVowel;continue}
   if(han.test(c)||/[\u3040-\u30ff]/u.test(c)&&c!=="・"){
    text+="〔"+c+"〕";speech+=" ";unknown++;lastVowel="";continue;
   }
   text+=punct(c);speech+=punct(c);lastVowel="";
  }
  return {text,speechText:speech,unknown,reading:normalized};
 }
 root.NihonPronunciation={forward,funnyChinese,mandarinTokens,pinyinToHira,syllables};
 if(typeof module!=="undefined"&&module.exports)module.exports=root.NihonPronunciation;
})(globalThis);
