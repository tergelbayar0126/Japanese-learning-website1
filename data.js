
// ----------------- Kana Data (Hiragana + Katakana + Dakuten/Handakuten) -----------------
const KanaData = {
  // --- Hiragana Basic ---
  "あ":[{start:{x:120,y:40},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:200,y:60},end:{x:160,y:200}}],
  "い":[{start:{x:110,y:60},end:{x:110,y:200}},{start:{x:170,y:40},end:{x:200,y:200}}],
  "う":[{start:{x:100,y:50},end:{x:180,y:50}},{start:{x:140,y:50},end:{x:140,y:200}}],
  "え":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}}],
  "お":[{start:{x:120,y:40},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:200,y:60},end:{x:160,y:200}}],
  "か":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "き":[{start:{x:80,y:50},end:{x:200,y:50}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "く":[{start:{x:100,y:60},end:{x:180,y:180}}],
  "け":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "こ":[{start:{x:80,y:60},end:{x:200,y:60}},{start:{x:80,y:120},end:{x:200,y:120}}],
  "さ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "し":[{start:{x:120,y:50},end:{x:120,y:200}}],
  "す":[{start:{x:100,y:50},end:{x:200,y:100}},{start:{x:200,y:100},end:{x:120,y:200}}],
  "せ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "そ":[{start:{x:100,y:50},end:{x:200,y:150}},{start:{x:200,y:150},end:{x:120,y:200}}],
  "た":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:80,y:120},end:{x:200,y:120}}],
  "ち":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}}],
  "つ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}}],
  "て":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:200},end:{x:200,y:200}}],
  "と":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "な":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "に":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}}],
  "ぬ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}}],
  "ね":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "の":[{start:{x:100,y:60},end:{x:180,y:140}}],
  "は":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:80,y:120},end:{x:200,y:120}}],
  "ひ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}}],
  "ふ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}}],
  "へ":[{start:{x:80,y:40},end:{x:200,y:40}}],
  "ほ":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "ま":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "み":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}}],
  "む":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}}],
  "め":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}}],
  "も":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "や":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:80,y:120},end:{x:200,y:120}}],
  "ゆ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}}],
  "よ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}}],
  "ら":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "り":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}}],
  "る":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}}],
  "れ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}}],
  "ろ":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "わ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "を":[{start:{x:100,y:50},end:{x:200,y:100}},{start:{x:200,y:100},end:{x:120,y:200}}],
  "ん":[{start:{x:120,y:50},end:{x:120,y:200}}],

  // --- Hiragana Dakuten / Handakuten ---
  "が":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ぎ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ぐ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "げ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ご":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ざ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "じ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ず":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ぜ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ぞ":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "だ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ぢ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "づ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "で":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ど":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ば":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "び":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ぶ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "べ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ぼ":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ぱ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:180,y:10},end:{x:180,y:30}}],
  "ぴ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:180,y:10},end:{x:180,y:30}}],
  "ぷ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}},{start:{x:180,y:10},end:{x:180,y:30}}],
  "ぺ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:10},end:{x:180,y:30}}],
  "ぽ":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:10},end:{x:180,y:30}}],

// --- Katakana Basic ---
  "ア":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "イ":[{start:{x:110,y:60},end:{x:110,y:200}},{start:{x:170,y:40},end:{x:200,y:200}}],
  "ウ":[{start:{x:100,y:50},end:{x:180,y:50}},{start:{x:140,y:50},end:{x:140,y:200}}],
  "エ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}}],
  "オ":[{start:{x:120,y:40},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:200,y:60},end:{x:160,y:200}}],
  "カ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "キ":[{start:{x:80,y:50},end:{x:200,y:50}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "ク":[{start:{x:100,y:60},end:{x:180,y:180}}],
  "ケ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "コ":[{start:{x:80,y:60},end:{x:200,y:60}},{start:{x:80,y:120},end:{x:200,y:120}}],
  "サ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "シ":[{start:{x:120,y:50},end:{x:120,y:200}}],
  "ス":[{start:{x:100,y:50},end:{x:200,y:100}},{start:{x:200,y:100},end:{x:120,y:200}}],
  "セ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "ソ":[{start:{x:100,y:50},end:{x:200,y:150}},{start:{x:200,y:150},end:{x:120,y:200}}],
  "タ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:80,y:120},end:{x:200,y:120}}],
  "チ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}}],
  "ツ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}}],
  "テ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:200},end:{x:200,y:200}}],
  "ト":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "ナ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "ニ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}}],
  "ヌ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}}],
  "ネ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "ノ":[{start:{x:100,y:60},end:{x:180,y:140}}],
  "ハ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:80,y:120},end:{x:200,y:120}}],
  "ヒ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}}],
  "フ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}}],
  "ヘ":[{start:{x:80,y:40},end:{x:200,y:40}}],
  "ホ":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "マ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "ミ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}}],
  "ム":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}}],
  "メ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}}],
  "モ":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "ヤ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:80,y:120},end:{x:200,y:120}}],
  "ユ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}}],
  "ヨ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}}],
  "ラ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "リ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}}],
  "ル":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}}],
  "レ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}}],
  "ロ":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "ワ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}}],
  "ヲ":[{start:{x:100,y:50},end:{x:200,y:100}},{start:{x:200,y:100},end:{x:120,y:200}}],
  "ン":[{start:{x:120,y:50},end:{x:120,y:200}}],

  // Katakana Dakuten/Handakuten examples
  "ガ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ギ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "グ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ゲ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ゴ":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ザ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ジ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ズ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ゼ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ゾ":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ダ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ヂ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ヅ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "デ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ド":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "バ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ビ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ブ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ベ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "ボ":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:20},end:{x:180,y:40}}],
  "パ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:180,y:10},end:{x:180,y:30}}],
  "ピ":[{start:{x:120,y:50},end:{x:120,y:200}},{start:{x:80,y:150},end:{x:200,y:150}},{start:{x:180,y:10},end:{x:180,y:30}}],
  "プ":[{start:{x:100,y:50},end:{x:200,y:50}},{start:{x:150,y:50},end:{x:150,y:200}},{start:{x:180,y:10},end:{x:180,y:30}}],
  "ペ":[{start:{x:80,y:40},end:{x:200,y:40}},{start:{x:80,y:120},end:{x:200,y:120}},{start:{x:80,y:200},end:{x:200,y:200}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:10},end:{x:180,y:30}}],
  "ポ":[{start:{x:100,y:60},end:{x:180,y:60}},{start:{x:140,y:40},end:{x:140,y:200}},{start:{x:180,y:10},end:{x:180,y:30}}]
};

// Minimal KanjiData stub so script.js can safely reference it
// You can later extend this with real kanji stroke data if desired.
const KanjiData = {};

// Guided lessons used by the curriculum view
const Lessons = [
  {
    id: 'hiragana-vowels',
    title: 'Hiragana Vowels',
    description: 'Start with the five core sounds.',
    level: 'Beginner',
    estMinutes: 8,
    chars: ['あ','い','う','え','お'],
    vocab: ['あさ', 'いぬ', 'うみ', 'えき', 'おにぎり', 'アイス'],
    sentences: [
      { jp: 'あさ に おきます。', en: 'I wake up in the morning.' },
      { jp: 'いぬ が います。', en: 'There is a dog.' }
    ]
  },
  {
    id: 'hiragana-k-s',
    title: 'Hiragana K & S Rows',
    description: 'Build consonant + vowel patterns with か to そ.',
    level: 'Beginner',
    estMinutes: 12,
    chars: ['か','き','く','け','こ','さ','し','す','せ','そ'],
    vocab: ['かさ', 'きんぎょ', 'くるま', 'せんせい', 'そら', 'さくら'],
    sentences: [
      { jp: 'せんせい は きます。', en: 'The teacher is coming.' },
      { jp: 'そら が あおい。', en: 'The sky is blue.' }
    ]
  },
  {
    id: 'hiragana-t-n-h',
    title: 'Hiragana T / N / H Rows',
    description: 'Common syllables for everyday words.',
    level: 'Beginner',
    estMinutes: 15,
    chars: ['た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ'],
    vocab: ['たべる', 'つき', 'ねこ', 'はな', 'ふゆ', 'へや'],
    sentences: [
      { jp: 'ねこ が はこ に いる。', en: 'The cat is in the box.' },
      { jp: 'たべもの が すき。', en: 'I like food.' }
    ]
  },
  {
    id: 'hiragana-m-y-r-w',
    title: 'Hiragana M / Y / R / W',
    description: 'Round out the hiragana set before dakuten.',
    level: 'Beginner',
    estMinutes: 14,
    chars: ['ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん'],
    vocab: ['まち', 'ゆき', 'よる', 'りんご', 'わに', 'よむ'],
    sentences: [
      { jp: 'よる に ほん を よみます。', en: 'I read a book at night.' },
      { jp: 'まち は にぎやか です。', en: 'The town is lively.' }
    ]
  },
  {
    id: 'hiragana-dakuten',
    title: 'Hiragana Dakuten',
    description: 'Voiced sounds: が/ざ/だ/ば/ぱ rows.',
    level: 'Beginner',
    estMinutes: 16,
    chars: ['が','ぎ','ぐ','げ','ご','ざ','じ','ず','ぜ','ぞ','だ','ぢ','づ','で','ど','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ'],
    vocab: ['がっこう', 'ざっし', 'だいがく', 'ぶた', 'ぱんだ', 'でんしゃ'],
    sentences: [
      { jp: 'がっこう へ いきます。', en: 'I go to school.' },
      { jp: 'でんしゃ が きます。', en: 'The train is coming.' }
    ]
  },
  {
    id: 'katakana-core',
    title: 'Katakana Core',
    description: 'Loanwords and names with vowels, K and S rows.',
    level: 'Beginner',
    estMinutes: 14,
    chars: ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ'],
    vocab: ['アイス', 'コーヒー', 'タクシー', 'テレビ', 'ノート', 'ケーキ'],
    sentences: [
      { jp: 'コーヒー を のみます。', en: 'I drink coffee.' },
      { jp: 'タクシー に のる。', en: 'I take a taxi.' }
    ]
  },
  {
    id: 'kanji-basics-1',
    title: 'Kanji Basics 1',
    description: 'Weekdays and foundational nouns (no duplicates across sets).',
    level: 'Elementary',
    estMinutes: 18,
    chars: ['日','月','火','水','木','金','土','本','人','口','山','川','田','中','大','小','上','下','左','右','名','女','男','子','目','耳'],
    vocab: ['日本', '月曜日', '火山', '水道', '木の葉', '金曜日', '土曜日', '本屋', '人間', '入口', '山川', '田中', '中央', '大人', '小学生', '上下', '左右', '名前', '女の子', '男の子', '目薬', '耳鼻科'],
    sentences: [
      { jp: '日月火水木金土 の 七つの 漢字 を れんしゅうしましょう。', en: 'Let’s practice the seven weekday kanji.' },
      { jp: '山の上 から 川 と 田んぼ が 見える。', en: 'You can see the river and rice fields from the top of the mountain.' }
    ]
  },
  {
    id: 'kanji-basics-2',
    title: 'Kanji Basics 2',
    description: 'School life, time, and weather kanji.',
    level: 'Elementary',
    estMinutes: 18,
    chars: ['手','心','学','校','生','先','年','時','車','電','天','気','王','玉'],
    vocab: ['学生', '学校', '先生', '先週', '一年', '時間', '手紙', '安心', '電車', '天気', '元気', '王子', '玉ねぎ'],
    sentences: [
      { jp: '先生 と 学生 が 学校 で 勉強します。', en: 'Teachers and students study at school.' },
      { jp: '天気 が いい 日 に 電車 で 出かけよう。', en: 'Let’s go out by train on a nice weather day.' }
    ]
  },
  {
    id: 'hiragana-combos-ya',
    title: 'Hiragana Combos (ya/yu/yo)',
    description: 'Small ゃ/ゅ/ょ combinations for smoother reading.',
    level: 'Beginner',
    estMinutes: 10,
    chars: ['きゃ','きゅ','きょ','しゃ','しゅ','しょ','ちゃ','ちゅ','ちょ','にゃ','にゅ','にょ','ひゃ','ひゅ','ひょ','みゃ','みゅ','みょ','りゃ','りゅ','りょ'],
    vocab: ['きゃく', 'しゃしん', 'しゅくだい', 'ちょう', 'にゅうがく', 'ひょう', 'りょうり'],
    sentences: [
      { jp: 'きゃく が きました。', en: 'A guest arrived.' },
      { jp: 'しゅくだい を します。', en: 'I will do homework.' }
    ]
  },
  {
    id: 'katakana-voiced',
    title: 'Katakana Dakuten/Handakuten',
    description: 'Voiced and plosive katakana for loanwords.',
    level: 'Beginner',
    estMinutes: 12,
    chars: ['ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ'],
    vocab: ['ガム', 'ギター', 'ゲーム', 'ゴール', 'ザリガニ', 'ジム', 'ズーム', 'ゼロ', 'ゾウ', 'ダンス', 'デモ', 'ドア', 'バス', 'ビール', 'ブーツ', 'ベッド', 'ボール', 'パーティー', 'ピザ', 'プリン', 'ペン', 'ポスト'],
    sentences: [
      { jp: 'ゲーム を します。', en: 'I play a game.' },
      { jp: 'パーティー に いきます。', en: 'I am going to a party.' }
    ]
  },
  {
    id: 'katakana-extended',
    title: 'Katakana Extended Sounds',
    description: 'Foreign sounds and long vowels using small vowels.',
    level: 'Beginner',
    estMinutes: 10,
    chars: ['ファ','フィ','フェ','フォ','ティ','ディ','トゥ','チェ','シェ','ジェ','ウィ','ウェ','ウォ'],
    vocab: ['ファイル', 'フェリー', 'フィルム', 'フォーク', 'ティー', 'ディーゼル', 'トゥナイト', 'チェス', 'シェフ', 'ジェット', 'ウィング', 'ウェーブ', 'ウォーター'],
    sentences: [
      { jp: 'ジェット で ウィング を 見る。', en: 'See the wing on the jet.' },
      { jp: 'ティー を のみます。', en: 'I drink tea.' }
    ]
  },
  {
    id: 'kanji-basics-3',
    title: 'Kanji Basics 3',
    description: 'Numbers, directions, and common verbs.',
    level: 'Elementary',
    estMinutes: 16,
    chars: ['一','二','三','四','五','六','七','八','九','十','入','出','行','来','食','見','話','買','読','書'],
    vocab: ['三人', '五時', '八百', '入学', '出口', '旅行', '来年', '食事', '見本', '話題', '読書', '書店', '買い物'],
    sentences: [
      { jp: '三人 で 旅行 に 行きます。', en: 'Three people will go on a trip.' },
      { jp: '本 を 読んで から 寝ます。', en: 'I read a book before sleeping.' }
    ]
  },
  {
    id: 'katakana-combos',
    title: 'Katakana Combinations',
    description: 'Double consonants and ya/yu/yo combinations.',
    level: 'Beginner',
    estMinutes: 12,
    chars: ['キャ','キュ','キョ','シャ','シュ','ショ','チャ','チュ','チョ','ニャ','ニュ','ニョ','ヒャ','ヒュ','ヒョ','ミャ','ミュ','ミョ','リャ','リュ','リョ','ギャ','ギュ','ギョ'],
    vocab: ['キャンプ', 'キューピッド', 'ギャラリー', 'シャツ', 'シューズ', 'ショー', 'チャンス', 'チューブ', 'チョコ', 'ミュージック', 'リュック'],
    sentences: [
      { jp: 'キャンプ に 行きます。', en: 'I am going camping.' },
      { jp: 'チョコ が 好き です。', en: 'I like chocolate.' }
    ]
  },
  {
    id: 'kanji-time',
    title: 'Time & Calendar Kanji',
    description: 'Express dates, times, and seasons.',
    level: 'Elementary',
    estMinutes: 20,
    chars: ['春','夏','秋','冬','朝','昼','夜','今','昨','明','前','後','毎','分','半'],
    vocab: ['春休み', '夏休み', '秋分', '冬至', '朝食', '昼食', '夜景', '今日', '昨日', '明日', '午前', '午後', '毎日', '三十分', '半分'],
    sentences: [
      { jp: '今日 は 春分 の 日 です。', en: 'Today is the spring equinox.' },
      { jp: '毎日 朝 六時 に 起きます。', en: 'I wake up at 6 AM every day.' }
    ]
  },
  {
    id: 'kanji-family',
    title: 'Family & Relationships',
    description: 'Words for family members and social connections.',
    level: 'Elementary',
    estMinutes: 18,
    chars: ['父','母','兄','弟','姉','妹','祖','両','親','友','会','社'],
    vocab: ['お父さん', 'お母さん', 'お兄さん', '弟', 'お姉さん', '妹', '祖父', '祖母', '両親', '友達', '会社', '社会'],
    sentences: [
      { jp: '父 と 母 は 会社員 です。', en: 'My father and mother are office workers.' },
      { jp: '友達 と 遊びます。', en: 'I play with friends.' }
    ]
  },
  {
    id: 'kanji-verbs',
    title: 'Action Verbs in Kanji',
    description: 'Common action verbs used in daily life.',
    level: 'Elementary',
    estMinutes: 22,
    chars: ['立','座','歩','走','止','休','働','使','作','思','知','言','聞','持'],
    vocab: ['立つ', '座る', '歩く', '走る', '止まる', '休む', '働く', '使う', '作る', '思う', '知る', '言う', '聞く', '持つ'],
    sentences: [
      { jp: '毎日 歩いて 学校 に 行きます。', en: 'I walk to school every day.' },
      { jp: '日本語 を 勉強して 知識 を 作ります。', en: 'I study Japanese to build knowledge.' }
    ]
  },
  {
    id: 'kanji-places',
    title: 'Places & Locations',
    description: 'Navigate cities and describe locations.',
    level: 'Elementary',
    estMinutes: 20,
    chars: ['国','町','村','市','区','駅','店','道','家','室','所','地','場','外','内','門'],
    vocab: ['日本国', '町内', '村人', '市役所', '駅前', '本店', '道路', '家族', '教室', '場所', '地図', '外国', '国内', '門'],
    sentences: [
      { jp: '駅 の 前 に 店 が あります。', en: 'There is a shop in front of the station.' },
      { jp: '地図 を 見て 場所 を 探します。', en: 'I look at the map to find the place.' }
    ]
  },
  {
    id: 'kanji-nature',
    title: 'Nature & Weather',
    description: 'Describe the natural world and weather.',
    level: 'Elementary',
    estMinutes: 18,
    chars: ['雨','雪','雲','風','空','海','花','草','木','林','森','石','岩','土','音'],
    vocab: ['雨天', '雪だるま', '雲海', '風速', '青空', '海水', '花見', '草原', '木の実', '林道', '森林', '石橋', '岩場', '土地', '音楽'],
    sentences: [
      { jp: '春 に 桜 の 花 を 見ます。', en: 'I see cherry blossoms in spring.' },
      { jp: '雨 が 降って 草 が 育ちます。', en: 'Rain falls and grass grows.' }
    ]
  },
  {
    id: 'kanji-colors-adjectives',
    title: 'Colors & Descriptive Words',
    description: 'Express colors, qualities, and states.',
    level: 'Elementary',
    estMinutes: 16,
    chars: ['白','黒','赤','青','黄','色','新','古','長','短','高','低','強','弱','多','少','同','安','悪','良'],
    vocab: ['白い', '黒い', '赤い', '青い', '黄色', '色々', '新しい', '古い', '長い', '短い', '高い', '低い', '強い', '弱い', '多い', '少ない', '同じ', '安い', '悪い', '良い'],
    sentences: [
      { jp: '新しい 車 は 赤い 色 です。', en: 'The new car is red.' },
      { jp: '古い 本 は 安くて 良い です。', en: 'Old books are cheap and good.' }
    ]
  }
];

// Expose globally
window.Lessons = Lessons;
window.KanaData = KanaData;
