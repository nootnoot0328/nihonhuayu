const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const crypto=require('node:crypto');
for(const [file,sha] of [['pinyin-pro-3.29.5.js','a488173470768ace074c3c4fffbb880e83523b3aa9598a8147c930e7f2d5c7dc'],['opencc-t2cn-1.4.2.js','5009384a6bdc904babee967a8bb9928e3c92288ec8a89ed036d53257e74cd8ab']]){
 const bytes=fs.readFileSync(require.resolve('../vendor/'+file));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),sha,file);
}
global.pinyinPro=require('../vendor/pinyin-pro-3.29.5.js');
global.OpenCC=require('../vendor/opencc-t2cn-1.4.2.js');
const engine=require('../pronunciation.js');

// Exhaust all readings present in the vendor's BMP Han dictionary, including
// polyphones, so an unsupported syllable cannot silently become an empty sound.
let chars='';for(let i=0x3400;i<=0x9fff;i++)chars+=String.fromCodePoint(i);
const readings=new Set(pinyinPro.polyphonic(chars,{type:'array',toneType:'none',v:true,traditional:true}).flat().filter(p=>/^[a-zê]+$/.test(p)));
for(const p of readings)assert.match(engine.pinyinToHira(p)||'',/^[ぁ-ゖー]+$/,p);
assert(readings.size>=400);
assert.equal(engine.pinyinToHira('bi'),'び');
assert.equal(engine.pinyinToHira('xue'),'しゅえ');
assert.equal(engine.pinyinToHira('lv'),'りゅ');

// Context must survive Traditional Chinese normalization.
assert.deepEqual(engine.mandarinTokens('銀行行長重慶音樂快樂').tokens.map(t=>t.pinyin),['yin','hang','hang','zhang','chong','qing','yin','yue','kuai','le']);
assert.deepEqual(engine.mandarinTokens('银行行长重庆音乐快乐').tokens.map(t=>t.pinyin),['yin','hang','hang','zhang','chong','qing','yin','yue','kuai','le']);
for(const input of ['圖書館裡的鬱金香綻放了','銀行行長喜歡重慶的音樂','臺灣的鳳梨酥和珍珠奶茶','憂鬱的烏龜正在曬太陽','女兒穿著綠色裙子去旅行','这是一个测试']){
 const result=engine.forward(input,'kata');assert.equal(result.unknown,0,input);assert.doesNotMatch(result.text,/\p{Script=Han}/u);assert.equal(result.text,result.reading);assert.equal(result.text,result.speechText);
}
const examples={'什麼樣的便當':'しぇんまやんで弁当','便當':'弁当'};
const mixed=engine.forward('什麼樣的便當？','mixed',examples);
assert.equal(mixed.text,'しぇんまやんで弁当？');assert.equal(mixed.speechText,'シェンマヤンデベンダン？');
assert.equal(engine.forward('什麼樣的便當？','hira',examples).text,'しぇんまやんでべんだん？');
const personal=engine.forward('什麼樣的便當？','mixed',examples,{'便當':'べんとう'});
assert.match(personal.text,/べんとう？$/,'personal phrase inside a built-in must win');
const rare=engine.forward('𠮷','mixed');assert.equal(rare.text,'𠮷');assert.equal(rare.unknown,1);assert.equal(rare.speechText.trim(),'');
assert.equal(engine.forward('𠮷','kata',{}, {'𠮷':'よし'}).speechText,'ヨシ');
assert.equal(engine.forward('奶茶','kata',{}, {'奶茶':'弁当龘'}).speechText,'ベンダンダ');
assert.equal(engine.forward('你好🙂 A!\n','kata').speechText,'ニハオ🙂 A！\n');
assert.equal(engine.forward('<script>alert(1)</script>','mixed').text,'<script>alert(1)</script>');

for(const [input,expected] of [['ありがとう！','阿哩嘎多！'],['アリガトウ','阿哩嘎多'],['ｱﾘｶﾞﾄｳ','阿哩嘎多'],['こんにちは','空尼七哇'],['コンニチハ','空尼七哇'],['おはよう','喔哈唷'],['すみません','蘇米媽森'],['きゃ','恰'],['ティ','踢'],['コーヒー','摳喔希伊'],['日本語が好き！','尼吼恩狗嘎蘇奇！'],['か\u3099','嘎'],['ｷｬｯﾄ','恰·多']]){
 const result=engine.funnyChinese(input);assert.equal(result.text,expected,input);assert.equal(result.unknown,0);assert.doesNotMatch(result.speechText,/[ぁ-ゖァ-ヶ]/u);
}
assert.equal(engine.funnyChinese('がっこう').speechText,'嘎，摳烏');
const unknownJP=engine.funnyChinese('未知漢字🙂');assert.equal(unknownJP.unknown,4);assert.equal(unknownJP.speechText.trim(),'🙂');assert.match(unknownJP.text,/〔漢〕/);
const fallback=vm.createContext({});vm.runInContext(fs.readFileSync(require.resolve('../pronunciation.js'),'utf8'),fallback);
const unloaded=fallback.NihonPronunciation.forward('中文','kata');assert.equal(unloaded.degraded,true);assert.equal(unloaded.text,'中文');assert.equal(unloaded.unknown,2);
console.log(`PASS: all ${readings.size} vendor syllables, Traditional/Simplified context, novel sentences, custom precedence, rare-character correction, text safety, Japanese kana/kanji phrases and dictionary-load fallback`);
