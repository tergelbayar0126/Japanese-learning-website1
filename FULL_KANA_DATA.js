// ===== Voicing Utility =====

// small double-tick dakuten mark
const DAKUTEN = [
  "M130 34 L138 34",
  "M145 34 L153 34"
];

// small circle handakuten mark
const HANDAKUTEN = [
  "M142 30 C148 30 150 34 148 38 C146 42 140 42 138 38 C136 34 138 30 142 30"
];

// build voiced kana from base kana
function voiced(baseKana, newKana, type = "dakuten") {
  const base = window.FULL_KANA_DATA[baseKana];
  if (!base) return;
  
  window.FULL_KANA_DATA[newKana] = {
    strokes: [
      ...base.strokes,
      ...(type === "dakuten" ? DAKUTEN : HANDAKUTEN)
    ]
  };
}

window.FULL_KANA_DATA = {
  // -------- Missing Hiragana (わ/を/ん) --------
  "わ": {
    strokes: [
      "M25 20 C50 15 75 15 90 25",      // top arc
      "M55 25 C50 55 45 80 40 95"       // right vertical
    ]
  },
  
  "を": {
    strokes: [
      "M20 20 C40 15 65 15 80 25",      // top arc
      "M45 25 C40 55 35 80 30 95",      // left vertical
      "M30 95 C50 90 70 90 85 85"       // bottom curve
    ]
  },
  
  "ん": {
    strokes: [
      "M30 25 C30 55 30 75 30 90",      // vertical line
      "M30 55 C50 50 70 50 85 60"       // right curve
    ]
  },
  "あ": { strokes: ["M10 20 C5 35 5 60 20 80","M30 20 C45 35 45 60 30 80","M15 65 C25 60 40 60 45 65"] },
  "い": { strokes: ["M20 20 C22 35 22 60 20 80","M40 20 C38 35 38 60 40 80"] },
  "う": { strokes: ["M20 15 C15 30 25 45 20 60","M35 60 C28 70 45 80 40 90"] },
  "え": { strokes: ["M15 20 C30 10 45 10 60 20","M20 50 C30 45 50 45 55 60","M30 15 C30 45 30 70 30 90"] },
  "お": { strokes: ["M20 15 C10 35 10 60 20 80","M40 15 C60 35 60 60 40 80","M20 50 C30 45 45 45 55 50","M60 10 L60 90"] },
  "か": { strokes: ["M20 20 L20 90","M40 35 C60 40 60 80 40 90","M40 65 C55 60 70 60 75 65"] },
  "き": { strokes: ["M10 30 C35 10 50 10 70 30","M25 60 C50 50 60 50 80 60","M15 10 L15 90","M45 10 L45 90"] },
  "く": { strokes: ["M70 20 C45 25 30 40 20 70"] },
  "け": { strokes: ["M20 15 L20 90","M40 15 C55 30 55 60 40 80","M40 50 C60 45 70 45 75 50"] },
  "こ": { strokes: ["M10 30 L80 30","M10 70 L80 70"] },
  // -------- Hiragana さ → そ --------

"さ": {
  strokes: [
    "M20 20 C40 10 60 10 80 25",
    "M25 45 C45 40 60 40 75 50",
    "M35 65 C25 80 45 80 55 75"
  ]
},

"し": {
  strokes: [
    "M60 15 C45 35 40 60 45 75 C50 90 70 90 85 80"
  ]
},

"す": {
  strokes: [
    "M20 25 C40 15 60 15 80 25",
    "M25 55 C55 45 75 50 82 62",
    "M55 30 C58 55 52 75 40 90"
  ]
},

"せ": {
  strokes: [
    "M20 15 L20 85",
    "M40 40 C60 30 80 30 95 45",
    "M40 60 C60 55 80 55 95 65"
  ]
},

"そ": {
  strokes: [
    "M25 25 C45 10 65 15 85 30",
    "M55 35 C45 65 55 85 75 90"
  ]
},
// -------- Hiragana た → と --------

"た": {
  strokes: [
    "M30 15 C30 35 28 55 25 85",
    "M45 30 C65 20 85 20 95 30",
    "M45 55 C65 45 80 45 95 55",
    "M55 70 C45 90 70 95 85 85"
  ]
},

"ち": {
  strokes: [
    "M25 25 C45 15 70 15 90 25",
    "M48 35 C53 55 45 85 25 95"
  ]
},

"つ": {
  strokes: [
    "M35 35 C30 60 35 80 60 90 C80 85 85 65 80 50"
  ]
},

"て": {
  strokes: [
    "M20 25 C45 15 75 15 100 25",
    "M60 35 C55 60 65 80 90 95"
  ]
},

"と": {
  strokes: [
    "M30 20 C30 40 30 60 30 85",
    "M35 55 C45 45 75 55 90 75"
  ]
}, // -------- Hiragana な → の --------

"な": {
  strokes: [
    "M30 20 C55 10 80 10 100 20",          // sweep top
    "M55 20 C50 45 45 60 40 90",           // vertical
    "M40 60 C55 75 75 80 95 75"            // right hook curve
  ]
},

"に": {
  strokes: [
    "M25 30 C25 55 25 70 25 95",           // vertical
    "M45 60 C70 55 90 55 100 60"           // horizontal
  ]
},

"ぬ": {
  strokes: [
    "M30 20 C45 10 75 10 95 20",            // top sweep
    "M55 20 C40 55 30 80 55 95 C80 90 80 65 65 55",
    "M65 55 C75 50 85 55 90 65"             // terminal loop flick
  ]
},

"ね": {
  strokes: [
    "M30 15 C30 40 30 55 30 85",            // vertical
    "M30 45 C50 35 70 35 90 45",            // short cross sweep
    "M60 45 C60 65 75 85 95 90"             // hooked tail
  ]
},

"の": {
  strokes: [
    "M75 30 C45 35 25 70 40 90 C60 105 95 80 90 50 C88 35 85 30 75 30"
  ]
},// -------- Hiragana は → ほ (Dakuten / Handakuten included) --------

// は / ば / ぱ
"は": {
  strokes: [
    "M30 20 C30 45 30 65 30 95",        // first vertical
    "M60 20 C55 60 55 90 65 110",       // curved second stroke downward
    "M65 70 C85 65 95 70 100 80"        // finishing flick
  ]
},
"ば": {
  strokes: [
    "M30 20 C30 45 30 65 30 95",
    "M60 20 C55 60 55 90 65 110",
    "M65 70 C85 65 95 70 100 80",
    "M108 20 L113 25",                 // dakuten dot 1
    "M114 20 L119 25"                  // dakuten dot 2
  ]
},
"ぱ": {
  strokes: [
    "M30 20 C30 45 30 65 30 95",
    "M60 20 C55 60 55 90 65 110",
    "M65 70 C85 65 95 70 100 80",
    "M114 24 C118 24 122 28 118 32 C114 32 112 28 114 24" // handakuten loop
  ]
},

// ひ / び / ぴ
"ひ": {
  strokes: [
    "M30 30 C65 20 90 25 105 35",
    "M45 35 C30 60 40 90 85 100"
  ]
},
"び": {
  strokes: [
    "M30 30 C65 20 90 25 105 35",
    "M45 35 C30 60 40 90 85 100",
    "M108 20 L113 25",
    "M114 20 L119 25"
  ]
},
"ぴ": {
  strokes: [
    "M30 30 C65 20 90 25 105 35",
    "M45 35 C30 60 40 90 85 100",
    "M114 24 C118 24 122 28 118 32 C114 32 112 28 114 24"
  ]
},

// ふ / ぶ / ぷ
"ふ": {
  strokes: [
    "M60 20 C50 45 45 55 45 65",
    "M45 65 C45 90 80 100 95 80",
    "M95 80 C110 60 95 45 75 40"
  ]
},
"ぶ": {
  strokes: [
    "M60 20 C50 45 45 55 45 65",
    "M45 65 C45 90 80 100 95 80",
    "M95 80 C110 60 95 45 75 40",
    "M108 20 L113 25",
    "M114 20 L119 25"
  ]
},
"ぷ": {
  strokes: [
    "M60 20 C50 45 45 55 45 65",
    "M45 65 C45 90 80 100 95 80",
    "M95 80 C110 60 95 45 75 40",
    "M114 24 C118 24 122 28 118 32 C114 32 112 28 114 24"
  ]
},

// へ / べ / ぺ
"へ": {
  strokes: [
    "M35 60 C55 35 85 35 105 60"
  ]
},
"べ": {
  strokes: [
    "M35 60 C55 35 85 35 105 60",
    "M108 20 L113 25",
    "M114 20 L119 25"
  ]
},
"ぺ": {
  strokes: [
    "M35 60 C55 35 85 35 105 60",
    "M114 24 C118 24 122 28 118 32 C114 32 112 28 114 24"
  ]
},

// ほ / ぼ / ぽ
"ほ": {
  strokes: [
    "M30 20 C30 45 30 65 30 100",
    "M60 25 C55 60 55 95 65 110",
    "M55 55 C75 50 95 50 105 55",
    "M65 80 C85 75 100 80 105 95"
  ]
},
"ぼ": {
  strokes: [
    "M30 20 C30 45 30 65 30 100",
    "M60 25 C55 60 55 95 65 110",
    "M55 55 C75 50 95 50 105 55",
    "M65 80 C85 75 100 80 105 95",
    "M108 20 L113 25",
    "M114 20 L119 25"
  ]
},
"ぽ": {
  strokes: [
    "M30 20 C30 45 30 65 30 100",
    "M60 25 C55 60 55 95 65 110",
    "M55 55 C75 50 95 50 105 55",
    "M65 80 C85 75 100 80 105 95",
    "M114 24 C118 24 122 28 118 32 C114 32 112 28 114 24"
  ]
},
// -------- Hiragana ま → も --------

// ま
"ま": {
  strokes: [
    "M30 35 C50 25 80 25 105 35",          // top horizontal curve
    "M35 55 C55 50 85 50 105 55",          // middle horizontal curve
    "M32 75 C55 72 85 72 110 75",          // lower horizontal curve
    "M75 40 C72 75 72 95 80 110"           // vertical finishing drop
  ]
},

// み
"み": {
  strokes: [
    "M40 35 C55 25 90 25 110 35",         // top sweeping curve
    "M48 60 C38 82 60 95 90 90",          // loop body
    "M90 90 C118 85 110 55 85 55"          // closing tail flick
  ]
},

// む
"む": {
  strokes: [
    "M40 30 C60 20 95 20 115 35",          // entry sweep
    "M48 35 C40 70 48 95 85 105",          // looping down curve
    "M85 105 C120 110 112 55 78 65"        // final tail curl upward
  ]
},

// め
"め": {
  strokes: [
    "M45 30 C60 18 90 18 110 30",
    "M58 40 C40 65 52 90 85 100",
    "M85 100 C118 92 110 55 80 60"
  ]
},

// も
"も": {
  strokes: [
    "M30 28 C55 22 82 22 110 28",          // top bar
    "M35 55 C55 48 88 48 110 55",          // middle bar
    "M75 30 C75 70 75 98 82 110",          // central drop
    "M80 110 C110 115 118 90 100 78"       // finishing curve tail
  ]
}, // -------- Hiragana や → よ --------

// や
"や": {
  strokes: [
    "M35 35 C55 22 90 22 115 35",          // light entry curve (small top)
    "M45 55 C38 85 60 105 95 112",         // long left-side sweep body
    "M80 45 C88 70 90 95 88 115"           // right downward finishing stroke
  ]
},

// ゆ
"ゆ": {
  strokes: [
    "M40 30 C60 22 95 22 115 35",          // top sweeping intro
    "M55 38 C38 65 42 95 78 110",          // left looping curve
    "M78 50 C98 62 108 82 100 110"         // inner right curve tail
  ]
},

// よ
"よ": {
  strokes: [
    "M50 30 C70 22 95 22 115 35",          // short top sweep
    "M78 40 C78 75 78 100 90 110",         // main vertical drop
    "M88 110 C115 118 120 95 105 78"       // outward finishing hook
  ]
}, // -------- Hiragana ら → ろ --------

// ら
"ら": {
  strokes: [
    "M45 28 C70 22 98 22 120 36",      // light top sweep
    "M65 50 C45 78 55 102 85 112 C110 120 125 102 118 85"
  ]
},

// り
"り": {
  strokes: [
    "M48 35 C45 65 47 95 65 112",      // long left drop
    "M92 35 C92 68 90 92 78 116"       // right controlled descend
  ]
},

// る
"る": {
  strokes: [
    "M55 30 C80 22 110 24 125 38",     // entry arc
    "M60 42 C40 72 44 92 80 108 C110 122 126 96 102 78",
    "M95 75 C126 92 120 126 88 124"   // circular close loop
  ]
},

// れ
"れ": {
  strokes: [
    "M42 32 C42 75 42 108 60 116",     // vertical sweep start
    "M58 58 C82 55 102 44 120 30",
    "M95 32 C78 78 80 108 98 120"      // tail flick
  ]
},

// ろ
"ろ": {
  strokes: [
    "M48 32 C75 22 112 30 122 42",
    "M120 45 C122 90 82 112 58 102"
  ]
},

// ===== KATAKANA =====
// ア row
"ア": { strokes: ["M30 20 L70 90","M10 50 L90 50"] },
"イ": { strokes: ["M20 20 L20 90","M50 30 L70 85"] },
"ウ": { strokes: ["M10 20 L70 20","M40 20 L40 65","M20 65 C40 75 60 75 80 65"] },
"エ": { strokes: ["M10 20 L80 20","M10 50 L80 50","M10 80 L80 80"] },
"オ": { strokes: ["M10 20 L80 20","M45 20 L45 90","M10 55 L80 55"] },

// カ row
"カ": { strokes: ["M10 20 L80 20","M40 20 L20 70","M60 35 L85 85"] },
"キ": { strokes: ["M10 20 L80 20","M10 50 L80 50","M45 20 L45 90"] },
"ク": { strokes: ["M10 20 L45 30","M70 30 L30 90"] },
"ケ": { strokes: ["M10 20 L80 20","M10 50 L80 50","M75 50 L40 90"] },
"コ": { strokes: ["M20 20 L80 20","M20 90 L80 90"] },

// サ row
"サ": { strokes: ["M10 20 L80 20","M45 20 L45 60","M20 60 L70 60"] },
"シ": { strokes: ["M20 20 L30 50","M45 15 L55 50","M70 10 L80 50"] },
"ス": { strokes: ["M10 20 L70 20","M60 30 C50 50 40 70 30 90"] },
"セ": { strokes: ["M10 30 L80 30","M40 30 L20 75"] },
"ソ": { strokes: ["M20 25 L30 50","M50 20 L60 50"] },

// タ row
"タ": { strokes: ["M10 20 L80 20","M45 20 L45 90"] },
"チ": { strokes: ["M10 30 L80 30","M65 30 L50 90"] },
"ツ": { strokes: ["M20 30 L30 55","M50 25 L60 55"] },
"テ": { strokes: ["M10 20 L80 20","M45 20 L20 75"] },
"ト": { strokes: ["M45 15 L45 70","M20 70 L70 70"] },

// ナ row
"ナ": { strokes: ["M10 20 L70 20","M45 20 L20 90","M70 35 L70 90"] },
"ニ": { strokes: ["M10 30 L80 30","M10 70 L80 70"] },
"ヌ": { strokes: ["M20 20 L50 25","M70 25 C55 50 45 70 40 90"] },
"ネ": { strokes: ["M10 20 L70 20","M45 20 L25 60","M70 35 L25 75"] },
"ノ": { strokes: ["M20 20 L70 90"] },

// ハ row
"ハ": { strokes: ["M20 25 L30 60","M70 25 L60 60"] },
"ヒ": { strokes: ["M20 20 L20 90","M20 55 L80 55"] },
"フ": { strokes: ["M10 30 L70 30","M50 30 C40 55 35 75 35 90"] },
"ヘ": { strokes: ["M10 40 L80 60"] },
"ホ": { strokes: ["M10 20 L80 20","M45 20 L45 90","M10 55 L80 55"] },

// マ row
"マ": { strokes: ["M10 20 L80 20","M10 20 L10 70","M10 70 L80 90"] },
"ミ": { strokes: ["M20 25 L70 25","M20 50 L70 50","M20 75 L70 75"] },
"ム": { strokes: ["M20 20 L40 85","M40 85 L80 20"] },
"メ": { strokes: ["M20 20 L70 85","M70 20 L20 70"] },
"モ": { strokes: ["M10 20 L80 20","M10 50 L80 50","M45 50 L20 90"] },

// ヤ row
"ヤ": { strokes: ["M10 20 L70 20","M45 20 L15 70","M70 35 L30 90"] },
"ユ": { strokes: ["M10 30 L70 30","M20 30 L40 80 C50 90 70 90 80 80"] },
"ヨ": { strokes: ["M10 20 L80 20","M10 50 L80 50","M10 80 L80 80"] },

// ラ row
"ラ": { strokes: ["M10 20 L70 20","M45 20 L20 75"] },
"リ": { strokes: ["M20 20 L20 90","M60 30 L60 85"] },
"ル": { strokes: ["M30 20 L50 30","M70 30 L40 90"] },
"レ": { strokes: ["M20 20 L70 85"] },
"ロ": { strokes: ["M20 20 L80 20","M20 20 L20 90","M20 90 L80 90","M80 20 L80 90"] },

// ワ row
"ワ": { strokes: ["M10 20 L80 20","M45 20 L20 75"] },
"ヲ": { strokes: ["M10 20 L70 20","M45 20 L20 60","M70 35 L30 90"] },
"ン": { strokes: ["M20 25 L50 40","M70 40 L40 85"] }

};

// ===== Dakuten & Handakuten Hiragana =====
voiced("か", "が");
voiced("き", "ぎ");
voiced("く", "ぐ");
voiced("け", "げ");
voiced("こ", "ご");

voiced("さ", "ざ");
voiced("し", "じ");
voiced("す", "ず");
voiced("せ", "ぜ");
voiced("そ", "ぞ");

voiced("た", "だ");
voiced("ち", "ぢ");
voiced("つ", "づ");
voiced("て", "で");
voiced("と", "ど");

voiced("は", "ば");
voiced("ひ", "び");
voiced("ふ", "ぶ");
voiced("へ", "べ");
voiced("ほ", "ぼ");

voiced("は", "ぱ", "handakuten");
voiced("ひ", "ぴ", "handakuten");
voiced("ふ", "ぷ", "handakuten");
voiced("へ", "ぺ", "handakuten");
voiced("ほ", "ぽ", "handakuten");

// ===== Dakuten Katakana =====
voiced("カ", "ガ");
voiced("キ", "ギ");
voiced("ク", "グ");
voiced("ケ", "ゲ");
voiced("コ", "ゴ");

voiced("サ", "ザ");
voiced("シ", "ジ");
voiced("ス", "ズ");
voiced("セ", "ゼ");
voiced("ソ", "ゾ");

voiced("タ", "ダ");
voiced("チ", "ヂ");
voiced("ツ", "ヅ");
voiced("テ", "デ");
voiced("ト", "ド");

voiced("ハ", "バ");
voiced("ヒ", "ビ");
voiced("フ", "ブ");
voiced("ヘ", "ベ");
voiced("ホ", "ボ");

// ===== Handakuten Katakana =====
voiced("ハ", "パ", "handakuten");
voiced("ヒ", "ピ", "handakuten");
voiced("フ", "プ", "handakuten");
voiced("ヘ", "ペ", "handakuten");
voiced("ホ", "ポ", "handakuten");
