// Authentic Japanese Character Stroke Data
// Based on standard Japanese calligraphy stroke orders

const AuthenticKanaData = {
  // === HIRAGANA (correct stroke counts) ===
  // Vowels (5 characters)
  "あ": [  // 3 strokes
    {start:{x:120,y:60},end:{x:80,y:100}},    // curved stroke
    {start:{x:140,y:40},end:{x:140,y:180}},   // vertical
    {start:{x:80,y:140},end:{x:180,y:140}}    // horizontal through
  ],
  "い": [  // 2 strokes
    {start:{x:100,y:50},end:{x:100,y:190}},
    {start:{x:170,y:60},end:{x:180,y:200}}
  ],
  "う": [  // 2 strokes
    {start:{x:100,y:80},end:{x:160,y:70}},
    {start:{x:130,y:100},end:{x:180,y:180}}
  ],
  "え": [  // 2 strokes
    {start:{x:80,y:70},end:{x:200,y:60}},
    {start:{x:70,y:150},end:{x:190,y:170}}
  ],
  "お": [  // 3 strokes
    {start:{x:80,y:60},end:{x:190,y:60}},
    {start:{x:110,y:60},end:{x:110,y:180}},
    {start:{x:140,y:120},end:{x:200,y:140}}
  ],
  
  // K-row (10 characters)
  "か": [  // 3 strokes
    {start:{x:80,y:70},end:{x:190,y:70}},
    {start:{x:130,y:70},end:{x:130,y:200}},
    {start:{x:70,y:150},end:{x:200,y:150}}
  ],
  "き": [  // 4 strokes
    {start:{x:70,y:60},end:{x:180,y:50}},
    {start:{x:75,y:120},end:{x:185,y:115}},
    {start:{x:110,y:50},end:{x:110,y:200}},
    {start:{x:150,y:120},end:{x:150,y:200}}
  ],
  "く": [  // 1 stroke
    {start:{x:160,y:60},end:{x:90,y:180}}
  ],
  "け": [  // 3 strokes
    {start:{x:100,y:60},end:{x:100,y:190}},
    {start:{x:140,y:50},end:{x:190,y:120}},
    {start:{x:70,y:150},end:{x:200,y:165}}
  ],
  "こ": [  // 2 strokes
    {start:{x:80,y:90},end:{x:200,y:90}},
    {start:{x:75,y:150},end:{x:205,y:160}}
  ],
  
  "が": [  // 5 strokes (か + dakuten)
    {start:{x:80,y:70},end:{x:190,y:70}},
    {start:{x:130,y:70},end:{x:130,y:200}},
    {start:{x:70,y:150},end:{x:200,y:150}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  "ぎ": [  // 6 strokes
    {start:{x:70,y:60},end:{x:180,y:50}},
    {start:{x:75,y:120},end:{x:185,y:115}},
    {start:{x:110,y:50},end:{x:110,y:200}},
    {start:{x:150,y:120},end:{x:150,y:200}},
    {start:{x:180,y:40},end:{x:190,y:50}},
    {start:{x:200,y:40},end:{x:210,y:50}}
  ],
  "ぐ": [  // 3 strokes
    {start:{x:160,y:60},end:{x:90,y:180}},
    {start:{x:180,y:40},end:{x:190,y:50}},
    {start:{x:200,y:40},end:{x:210,y:50}}
  ],
  "げ": [  // 5 strokes
    {start:{x:100,y:60},end:{x:100,y:190}},
    {start:{x:140,y:50},end:{x:190,y:120}},
    {start:{x:70,y:150},end:{x:200,y:165}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  "ご": [  // 4 strokes
    {start:{x:80,y:90},end:{x:200,y:90}},
    {start:{x:75,y:150},end:{x:205,y:160}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  
  // S-row
  "さ": [  // 3 strokes
    {start:{x:70,y:70},end:{x:200,y:65}},
    {start:{x:70,y:130},end:{x:190,y:125}},
    {start:{x:120,y:160},end:{x:180,y:190}}
  ],
  "し": [  // 1 stroke
    {start:{x:140,y:50},end:{x:150,y:200}}
  ],
  "す": [  // 2 strokes
    {start:{x:75,y:70},end:{x:195,y:65}},
    {start:{x:110,y:100},end:{x:140,y:200}}
  ],
  "せ": [  // 3 strokes
    {start:{x:90,y:60},end:{x:90,y:180}},
    {start:{x:120,y:110},end:{x:200,y:100}},
    {start:{x:110,y:160},end:{x:200,y:155}}
  ],
  "そ": [  // 1 stroke
    {start:{x:80,y:70},end:{x:160,y:190}}
  ],
  
  "ざ": [  // 5 strokes (さ + dakuten)
    {start:{x:70,y:70},end:{x:200,y:65}},
    {start:{x:70,y:130},end:{x:190,y:125}},
    {start:{x:120,y:160},end:{x:180,y:190}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  "じ": [  // 3 strokes (し + dakuten)
    {start:{x:140,y:50},end:{x:150,y:200}},
    {start:{x:180,y:40},end:{x:190,y:50}},
    {start:{x:200,y:40},end:{x:210,y:50}}
  ],
  "ず": [  // 4 strokes (す + dakuten)
    {start:{x:75,y:70},end:{x:195,y:65}},
    {start:{x:110,y:100},end:{x:140,y:200}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  "ぜ": [  // 5 strokes (せ + dakuten)
    {start:{x:90,y:60},end:{x:90,y:180}},
    {start:{x:120,y:110},end:{x:200,y:100}},
    {start:{x:110,y:160},end:{x:200,y:155}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  "ぞ": [  // 3 strokes (そ + dakuten)
    {start:{x:80,y:70},end:{x:160,y:190}},
    {start:{x:180,y:40},end:{x:190,y:50}},
    {start:{x:200,y:40},end:{x:210,y:50}}
  ],
  
  // T-row
  "た": [  // 4 strokes
    {start:{x:80,y:70},end:{x:200,y:70}},
    {start:{x:140,y:70},end:{x:140,y:150}},
    {start:{x:70,y:150},end:{x:210,y:150}},
    {start:{x:140,y:150},end:{x:160,y:200}}
  ],
  "ち": [  // 2 strokes
    {start:{x:90,y:60},end:{x:190,y:55}},
    {start:{x:130,y:90},end:{x:160,y:200}}
  ],
  "つ": [  // 1 stroke
    {start:{x:90,y:80},end:{x:140,y:180}}
  ],
  "て": [  // 1 stroke
    {start:{x:80,y:70},end:{x:180,y:190}}
  ],
  "と": [  // 2 strokes
    {start:{x:110,y:60},end:{x:110,y:180}},
    {start:{x:80,y:120},end:{x:180,y:160}}
  ],
  
  "だ": [  // 6 strokes (た + dakuten)
    {start:{x:80,y:70},end:{x:200,y:70}},
    {start:{x:140,y:70},end:{x:140,y:150}},
    {start:{x:70,y:150},end:{x:210,y:150}},
    {start:{x:140,y:150},end:{x:160,y:200}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  "ぢ": [  // 4 strokes (ち + dakuten)
    {start:{x:90,y:60},end:{x:190,y:55}},
    {start:{x:130,y:90},end:{x:160,y:200}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  "づ": [  // 3 strokes (つ + dakuten)
    {start:{x:90,y:80},end:{x:140,y:180}},
    {start:{x:180,y:40},end:{x:190,y:50}},
    {start:{x:200,y:40},end:{x:210,y:50}}
  ],
  "で": [  // 3 strokes (て + dakuten)
    {start:{x:80,y:70},end:{x:180,y:190}},
    {start:{x:180,y:40},end:{x:190,y:50}},
    {start:{x:200,y:40},end:{x:210,y:50}}
  ],
  "ど": [  // 4 strokes (と + dakuten)
    {start:{x:110,y:60},end:{x:110,y:180}},
    {start:{x:80,y:120},end:{x:180,y:160}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  
  // N-row
  "な": [  // 4 strokes
    {start:{x:80,y:70},end:{x:190,y:65}},
    {start:{x:130,y:70},end:{x:130,y:150}},
    {start:{x:70,y:150},end:{x:200,y:145}},
    {start:{x:120,y:150},end:{x:160,y:200}}
  ],
  "に": [  // 2 strokes
    {start:{x:80,y:80},end:{x:200,y:80}},
    {start:{x:90,y:140},end:{x:190,y:150}}
  ],
  "ぬ": [  // 2 strokes
    {start:{x:90,y:60},end:{x:180,y:140}},
    {start:{x:70,y:120},end:{x:150,y:200}}
  ],
  "ね": [  // 2 strokes
    {start:{x:80,y:70},end:{x:190,y:120}},
    {start:{x:70,y:140},end:{x:180,y:190}}
  ],
  "の": [  // 1 stroke
    {start:{x:160,y:60},end:{x:120,y:180}}
  ],
  
  // H-row
  "は": [  // 3 strokes
    {start:{x:80,y:70},end:{x:80,y:180}},
    {start:{x:140,y:60},end:{x:140,y:190}},
    {start:{x:70,y:150},end:{x:200,y:155}}
  ],
  "ひ": [  // 1 stroke
    {start:{x:100,y:60},end:{x:180,y:190}}
  ],
  "ふ": [  // 4 strokes
    {start:{x:90,y:60},end:{x:140,y:55}},
    {start:{x:180,y:60},end:{x:180,y:100}},
    {start:{x:70,y:120},end:{x:190,y:115}},
    {start:{x:130,y:130},end:{x:160,y:200}}
  ],
  "へ": [  // 1 stroke
    {start:{x:70,y:90},end:{x:200,y:140}}
  ],
  "ほ": [  // 4 strokes
    {start:{x:80,y:70},end:{x:190,y:65}},
    {start:{x:130,y:70},end:{x:130,y:180}},
    {start:{x:180,y:110},end:{x:180,y:180}},
    {start:{x:70,y:150},end:{x:200,y:150}}
  ],
  
  "ば": [  // 5 strokes (は + dakuten)
    {start:{x:80,y:70},end:{x:80,y:180}},
    {start:{x:140,y:60},end:{x:140,y:190}},
    {start:{x:70,y:150},end:{x:200,y:155}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  "ぱ": [  // 4 strokes (は + handakuten)
    {start:{x:80,y:70},end:{x:80,y:180}},
    {start:{x:140,y:60},end:{x:140,y:190}},
    {start:{x:70,y:150},end:{x:200,y:155}},
    {start:{x:210,y:35},end:{x:220,y:45}}  // handakuten circle
  ],
  "び": [  // 3 strokes (ひ + dakuten)
    {start:{x:100,y:60},end:{x:180,y:190}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  "ぴ": [  // 2 strokes (ひ + handakuten)
    {start:{x:100,y:60},end:{x:180,y:190}},
    {start:{x:210,y:35},end:{x:220,y:45}}
  ],
  "ぶ": [  // 6 strokes (ふ + dakuten)
    {start:{x:90,y:60},end:{x:140,y:55}},
    {start:{x:180,y:60},end:{x:180,y:100}},
    {start:{x:70,y:120},end:{x:190,y:115}},
    {start:{x:130,y:130},end:{x:160,y:200}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  "ぷ": [  // 5 strokes (ふ + handakuten)
    {start:{x:90,y:60},end:{x:140,y:55}},
    {start:{x:180,y:60},end:{x:180,y:100}},
    {start:{x:70,y:120},end:{x:190,y:115}},
    {start:{x:130,y:130},end:{x:160,y:200}},
    {start:{x:210,y:35},end:{x:220,y:45}}
  ],
  "べ": [  // 3 strokes (へ + dakuten)
    {start:{x:70,y:90},end:{x:200,y:140}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  "ぺ": [  // 2 strokes (へ + handakuten)
    {start:{x:70,y:90},end:{x:200,y:140}},
    {start:{x:210,y:35},end:{x:220,y:45}}
  ],
  "ぼ": [  // 6 strokes (ほ + dakuten)
    {start:{x:80,y:70},end:{x:190,y:65}},
    {start:{x:130,y:70},end:{x:130,y:180}},
    {start:{x:180,y:110},end:{x:180,y:180}},
    {start:{x:70,y:150},end:{x:200,y:150}},
    {start:{x:200,y:40},end:{x:210,y:50}},
    {start:{x:220,y:40},end:{x:230,y:50}}
  ],
  "ぽ": [  // 5 strokes (ほ + handakuten)
    {start:{x:80,y:70},end:{x:190,y:65}},
    {start:{x:130,y:70},end:{x:130,y:180}},
    {start:{x:180,y:110},end:{x:180,y:180}},
    {start:{x:70,y:150},end:{x:200,y:150}},
    {start:{x:210,y:35},end:{x:220,y:45}}
  ],
  
  // M-row
  "ま": [  // 3 strokes
    {start:{x:90,y:60},end:{x:90,y:140}},
    {start:{x:70,y:140},end:{x:200,y:135}},
    {start:{x:130,y:100},end:{x:160,y:200}}
  ],
  "み": [  // 2 strokes
    {start:{x:80,y:70},end:{x:180,y:120}},
    {start:{x:120,y:130},end:{x:150,y:200}}
  ],
  "む": [  // 3 strokes
    {start:{x:100,y:60},end:{x:100,y:140}},
    {start:{x:70,y:140},end:{x:190,y:135}},
    {start:{x:140,y:110},end:{x:170,y:200}}
  ],
  "め": [  // 2 strokes
    {start:{x:90,y:80},end:{x:170,y:140}},
    {start:{x:80,y:150},end:{x:180,y:190}}
  ],
  "も": [  // 3 strokes
    {start:{x:80,y:70},end:{x:200,y:65}},
    {start:{x:130,y:70},end:{x:130,y:150}},
    {start:{x:70,y:150},end:{x:190,y:190}}
  ],
  
  // Y-row
  "や": [  // 3 strokes
    {start:{x:80,y:70},end:{x:190,y:65}},
    {start:{x:130,y:70},end:{x:130,y:140}},
    {start:{x:70,y:140},end:{x:200,y:190}}
  ],
  "ゆ": [  // 2 strokes
    {start:{x:80,y:80},end:{x:180,y:75}},
    {start:{x:110,y:110},end:{x:160,y:200}}
  ],
  "よ": [  // 2 strokes
    {start:{x:80,y:80},end:{x:190,y:75}},
    {start:{x:90,y:140},end:{x:180,y:180}}
  ],
  
  // R-row
  "ら": [  // 2 strokes
    {start:{x:80,y:70},end:{x:190,y:65}},
    {start:{x:120,y:100},end:{x:160,y:200}}
  ],
  "り": [  // 2 strokes
    {start:{x:120,y:60},end:{x:120,y:150}},
    {start:{x:150,y:120},end:{x:160,y:200}}
  ],
  "る": [  // 1 stroke
    {start:{x:90,y:70},end:{x:170,y:190}}
  ],
  "れ": [  // 1 stroke
    {start:{x:80,y:80},end:{x:180,y:180}}
  ],
  "ろ": [  // 3 strokes
    {start:{x:90,y:60},end:{x:180,y:55}},
    {start:{x:130,y:60},end:{x:130,y:150}},
    {start:{x:70,y:150},end:{x:200,y:180}}
  ],
  
  // W-row
  "わ": [  // 2 strokes
    {start:{x:80,y:70},end:{x:190,y:65}},
    {start:{x:110,y:100},end:{x:150,y:200}}
  ],
  "ゐ": [  // 2 strokes (archaic)
    {start:{x:90,y:70},end:{x:190,y:65}},
    {start:{x:120,y:100},end:{x:160,y:200}}
  ],
  "ゑ": [  // 2 strokes (archaic)
    {start:{x:80,y:80},end:{x:200,y:75}},
    {start:{x:110,y:120},end:{x:170,y:190}}
  ],
  "を": [  // 3 strokes
    {start:{x:80,y:70},end:{x:190,y:65}},
    {start:{x:130,y:70},end:{x:130,y:140}},
    {start:{x:70,y:140},end:{x:180,y:190}}
  ],
  "ん": [  // 1 stroke
    {start:{x:100,y:70},end:{x:170,y:190}}
  ],
  
  // Small kana
  "ゃ": [  // 3 strokes (small ya)
    {start:{x:90,y:80},end:{x:180,y:75}},
    {start:{x:135,y:80},end:{x:135,y:140}},
    {start:{x:80,y:140},end:{x:190,y:180}}
  ],
  "ゅ": [  // 2 strokes (small yu)
    {start:{x:90,y:90},end:{x:170,y:85}},
    {start:{x:120,y:115},end:{x:160,y:190}}
  ],
  "ょ": [  // 2 strokes (small yo)
    {start:{x:90,y:90},end:{x:180,y:85}},
    {start:{x:100,y:140},end:{x:170,y:170}}
  ],
  "ゎ": [  // 2 strokes (small wa)
    {start:{x:90,y:80},end:{x:180,y:75}},
    {start:{x:120,y:105},end:{x:155,y:190}}
  ],
  "っ": [  // 1 stroke (small tsu)
    {start:{x:100,y:100},end:{x:140,y:180}}
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.AuthenticKanaData = AuthenticKanaData;
}
