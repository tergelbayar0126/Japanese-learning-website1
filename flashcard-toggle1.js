// -----------------------------
// Flashcards Toggle System
// -----------------------------
const FlashcardToggle1 = {
    currentMode: 'hiragana',

    scriptData: {
        hiragana: [ 
             { char: 'あ', romaji: 'a', meaning: 'vowel sound "ah"', examples: ['愛 (ai) - love', 'ある (aru) - to exist'] },
            { char: 'い', romaji: 'i', meaning: 'vowel sound "ee"', examples: ['いい (ii) - good', '犬 (inu) - dog'] },
            { char: 'う', romaji: 'u', meaning: 'vowel sound "oo"', examples: ['海 (umi) - sea', '馬 (uma) - horse'] },
            { char: 'え', romaji: 'e', meaning: 'vowel sound "eh"', examples: ['絵 (e) - picture', '駅 (eki) - station'] },
            { char: 'お', romaji: 'o', meaning: 'vowel sound "oh"', examples: ['音 (oto) - sound', 'おもしろい (omoshiroi) - interesting'] },
            { char: 'か', romaji: 'ka', meaning: 'ka sound', examples: ['家 (ie/ka) - house', '火 (hi/ka) - fire'] },
            { char: 'き', romaji: 'ki', meaning: 'ki sound', examples: ['木 (ki) - tree', '黄色 (kiiro) - yellow'] },
            { char: 'く', romaji: 'ku', meaning: 'ku sound', examples: ['口 (kuchi) - mouth', '雲 (kumo) - cloud'] },
            { char: 'け', romaji: 'ke', meaning: 'ke sound', examples: ['毛 (ke) - hair', '怪我 (kega) - injury'] },
            { char: 'こ', romaji: 'ko', meaning: 'ko sound', examples: ['子 (ko) - child', 'ここ (koko) - here'] },
            { char: 'さ', romaji: 'sa', meaning: 'sa sound', examples: ['魚 (sakana) - fish', '桜 (sakura) - cherry blossom'] },
            { char: 'し', romaji: 'shi', meaning: 'shi sound', examples: ['白 (shiro) - white', '塩 (shio) - salt'] },
            { char: 'す', romaji: 'su', meaning: 'su sound', examples: ['寿司 (sushi) - sushi', '好き (suki) - like'] },
            { char: 'せ', romaji: 'se', meaning: 'se sound', examples: ['世界 (sekai) - world', '先生 (sensei) - teacher'] },
            { char: 'そ', romaji: 'so', meaning: 'so sound', examples: ['空 (sora) - sky', 'その (sono) - that'] },
            { char: 'た', romaji: 'ta', meaning: 'ta sound', examples: ['食べる (taberu) - to eat', '高い (takai) - tall/expensive'] },
            { char: 'ち', romaji: 'chi', meaning: 'chi sound', examples: ['血 (chi) - blood', '小さい (chiisai) - small'] },
            { char: 'つ', romaji: 'tsu', meaning: 'tsu sound', examples: ['月 (tsuki) - moon', '机 (tsukue) - desk'] },
            { char: 'て', romaji: 'te', meaning: 'te sound', examples: ['手 (te) - hand', 'テスト (tesuto) - test'] },
            { char: 'と', romaji: 'to', meaning: 'to sound', examples: ['時 (toki) - time', '友達 (tomodachi) - friend'] },
            { char: 'な', romaji: 'na', meaning: 'na sound', examples: ['名前 (namae) - name', '夏 (natsu) - summer'] },
            { char: 'に', romaji: 'ni', meaning: 'ni sound', examples: ['肉 (niku) - meat', '日本 (nihon) - Japan'] },
            { char: 'ぬ', romaji: 'nu', meaning: 'nu sound', examples: ['犬 (inu) - dog', '布 (nuno) - cloth'] },
            { char: 'ね', romaji: 'ne', meaning: 'ne sound', examples: ['猫 (neko) - cat', '寝る (neru) - to sleep'] },
            { char: 'の', romaji: 'no', meaning: 'no sound', examples: ['飲む (nomu) - to drink', 'この (kono) - this'] },
            { char: 'は', romaji: 'ha', meaning: 'ha sound', examples: ['花 (hana) - flower', '橋 (hashi) - bridge'] },
            { char: 'ひ', romaji: 'hi', meaning: 'hi sound', examples: ['火 (hi) - fire', '光 (hikari) - light'] },
            { char: 'ふ', romaji: 'fu', meaning: 'fu sound', examples: ['冬 (fuyu) - winter', '船 (fune) - ship'] },
            { char: 'へ', romaji: 'he', meaning: 'he sound', examples: ['部屋 (heya) - room', 'へそ (heso) - belly button'] },
            { char: 'ほ', romaji: 'ho', meaning: 'ho sound', examples: ['本 (hon) - book', '星 (hoshi) - star'] },
            { char: 'ま', romaji: 'ma', meaning: 'ma sound', examples: ['町 (machi) - town', '窓 (mado) - window'] },
            { char: 'み', romaji: 'mi', meaning: 'mi sound', examples: ['水 (mizu) - water', '道 (michi) - road'] },
            { char: 'む', romaji: 'mu', meaning: 'mu sound', examples: ['虫 (mushi) - insect', '六 (mu) - six'] },
            { char: 'め', romaji: 'me', meaning: 'me sound', examples: ['目 (me) - eye', 'めがね (megane) - glasses'] },
            { char: 'も', romaji: 'mo', meaning: 'mo sound', examples: ['森 (mori) - forest', 'もっと (motto) - more'] },
            { char: 'や', romaji: 'ya', meaning: 'ya sound', examples: ['山 (yama) - mountain', '夜 (yoru) - night'] },
            { char: 'ゆ', romaji: 'yu', meaning: 'yu sound', examples: ['雪 (yuki) - snow', '指 (yubi) - finger'] },
            { char: 'よ', romaji: 'yo', meaning: 'yo sound', examples: ['夜 (yoru) - night', '四 (yo) - four'] },
            { char: 'ら', romaji: 'ra', meaning: 'ra sound', examples: ['来る (kuru/ra) - to come', 'ら (ra) - them'] },
            { char: 'り', romaji: 'ri', meaning: 'ri sound', examples: ['りんご (ringo) - apple', '料理 (ryouri) - cooking'] },
            { char: 'る', romaji: 'ru', meaning: 'ru sound', examples: ['る (ru) - verb ending', 'する (suru) - to do'] },
            { char: 'れ', romaji: 're', meaning: 're sound', examples: ['冷蔵庫 (reizouko) - refrigerator', 'これ (kore) - this'] },
            { char: 'ろ', romaji: 'ro', meaning: 'ro sound', examples: ['ろうそく (rousoku) - candle', '六 (roku) - six'] },
            { char: 'わ', romaji: 'wa', meaning: 'wa sound', examples: ['私 (watashi) - I', 'わに (wani) - crocodile'] },
            { char: 'を', romaji: 'wo', meaning: 'wo sound (particle)', examples: ['を (wo) - object particle', '本を (hon wo) - book (obj)'] },
            { char: 'ん', romaji: 'n', meaning: 'n sound', examples: ['ほん (hon) - book', 'さん (san) - honorific'] },
            { char: 'が', romaji: 'ga', meaning: 'ga sound', examples: ['学校 (gakkou) - school', '画像 (gazou) - image'] },
            { char: 'ぎ', romaji: 'gi', meaning: 'gi sound', examples: ['ぎゅうにゅう (gyuunyuu) - milk', '技術 (gijutsu) - technology'] },
            { char: 'ぐ', romaji: 'gu', meaning: 'gu sound', examples: ['ぐり (guri) - chestnut', 'ぐあい (guai) - condition'] },
            { char: 'げ', romaji: 'ge', meaning: 'ge sound', examples: ['下 (ge) - under', '芸術 (geijutsu) - art'] },
            { char: 'ご', romaji: 'go', meaning: 'go sound', examples: ['ご飯 (gohan) - rice/meal', '語 (go) - language'] },
            { char: 'ざ', romaji: 'za', meaning: 'za sound', examples: ['雑誌 (zasshi) - magazine', '座る (suwaru/za) - to sit'] },
            { char: 'じ', romaji: 'ji', meaning: 'ji sound', examples: ['時間 (jikan) - time', '字 (ji) - letter'] },
            { char: 'ず', romaji: 'zu', meaning: 'zu sound', examples: ['ずっと (zutto) - all along', '図 (zu) - diagram'] },
            { char: 'ぜ', romaji: 'ze', meaning: 'ze sound', examples: ['絶対 (zettai) - absolutely', 'ぜひ (zehi) - by all means'] },
            { char: 'ぞ', romaji: 'zo', meaning: 'zo sound', examples: ['象 (zou) - elephant', 'ぞう (zou) - elephant'] },
            { char: 'だ', romaji: 'da', meaning: 'da sound', examples: ['だれ (dare) - who', '大学 (daigaku) - university'] },
            { char: 'ぢ', romaji: 'ji', meaning: 'ji sound (rare)', examples: ['鼻血 (hanaji) - nosebleed', 'ぢ (ji) - rarely used'] },
            { char: 'づ', romaji: 'zu', meaning: 'zu sound (rare)', examples: ['続く (tsuzuku) - to continue', 'づら (zura) - wig'] },
            { char: 'で', romaji: 'de', meaning: 'de sound', examples: ['です (desu) - is', 'で (de) - at/by'] },
            { char: 'ど', romaji: 'do', meaning: 'do sound', examples: ['どこ (doko) - where', 'どうも (doumo) - thank you'] },
            { char: 'ば', romaji: 'ba', meaning: 'ba sound', examples: ['場所 (basho) - place', 'ば (ba) - if'] },
            { char: 'び', romaji: 'bi', meaning: 'bi sound', examples: ['美しい (utsukushii) - beautiful', 'びっくり (bikkuri) - surprised'] },
            { char: 'ぶ', romaji: 'bu', meaning: 'bu sound', examples: ['部屋 (heya/bu) - room', 'ぶた (buta) - pig'] },
            { char: 'べ', romaji: 'be', meaning: 'be sound', examples: ['勉強 (benkyou) - study', 'べんり (benri) - convenient'] },
            { char: 'ぼ', romaji: 'bo', meaning: 'bo sound', examples: ['帽子 (boushi) - hat', 'ぼく (boku) - I (male)'] },
            { char: 'ぱ', romaji: 'pa', meaning: 'pa sound', examples: ['パン (pan) - bread', 'ぱんだ (panda) - panda'] },
            { char: 'ぴ', romaji: 'pi', meaning: 'pi sound', examples: ['ぴあの (piano) - piano', 'ぴんく (pinku) - pink'] },
            { char: 'ぷ', romaji: 'pu', meaning: 'pu sound', examples: ['ぷーる (puuru) - pool', 'ぷりん (purin) - pudding'] },
            { char: 'ぺ', romaji: 'pe', meaning: 'pe sound', examples: ['ぺん (pen) - pen', 'ぺっと (petto) - pet'] },
            { char: 'ぽ', romaji: 'po', meaning: 'po sound', examples: ['ぽけっと (poketto) - pocket', 'ぽすと (posuto) - post'] }],
        katakana: [ 

    { char: 'ア', romaji: 'a', meaning: 'vowel sound "ah"', examples: ['アメリカ (amerika) - America', 'アイス (aisu) - ice cream', 'アニメ (anime) - animation'] },
    { char: 'イ', romaji: 'i', meaning: 'vowel sound "ee"', examples: ['イタリア (itaria) - Italy', 'インド (indo) - India', 'イス (isu) - chair'] },
    { char: 'ウ', romaji: 'u', meaning: 'vowel sound "oo"', examples: ['ウイルス (uirusu) - virus', 'ウール (uuru) - wool', 'ウサギ (usagi) - rabbit'] },
    { char: 'エ', romaji: 'e', meaning: 'vowel sound "eh"', examples: ['エレベーター (erebeetaa) - elevator', 'エンジン (enjin) - engine', 'エアコン (eakon) - air conditioner'] },
    { char: 'オ', romaji: 'o', meaning: 'vowel sound "oh"', examples: ['オレンジ (orenji) - orange', 'オフィス (ofisu) - office', 'オペラ (opera) - opera'] },

    // Ka-row
    { char: 'カ', romaji: 'ka', meaning: 'ka sound', examples: ['カメラ (kamera) - camera', 'カフェ (kafe) - cafe', 'カレー (karee) - curry'] },
    { char: 'キ', romaji: 'ki', meaning: 'ki sound', examples: ['キーボード (kiboodo) - keyboard', 'キス (kisu) - kiss', 'キッチン (kicchin) - kitchen'] },
    { char: 'ク', romaji: 'ku', meaning: 'ku sound', examples: ['クッキー (kukkii) - cookie', 'クラス (kurasu) - class', 'クリーム (kuriimu) - cream'] },
    { char: 'ケ', romaji: 'ke', meaning: 'ke sound', examples: ['ケーキ (keeki) - cake', 'ケータイ (keetai) - mobile phone', 'ケチャップ (kechappu) - ketchup'] },
    { char: 'コ', romaji: 'ko', meaning: 'ko sound', examples: ['コーヒー (koohii) - coffee', 'コンピューター (konpyuutaa) - computer', 'コップ (koppu) - cup'] },

    // Ga-row (with dakuten)
    { char: 'ガ', romaji: 'ga', meaning: 'ga sound', examples: ['ガラス (garasu) - glass', 'ガス (gasu) - gas', 'ガム (gamu) - gum'] },
    { char: 'ギ', romaji: 'gi', meaning: 'gi sound', examples: ['ギター (gitaa) - guitar', 'ギリシャ (girisha) - Greece', 'ギャング (gyangu) - gang'] },
    { char: 'グ', romaji: 'gu', meaning: 'gu sound', examples: ['グループ (guruupu) - group', 'グラス (gurasu) - glass (drinking)', 'グリーン (guriin) - green'] },
    { char: 'ゲ', romaji: 'ge', meaning: 'ge sound', examples: ['ゲーム (geemu) - game', 'ゲート (geeto) - gate', 'ゲスト (gesuto) - guest'] },
    { char: 'ゴ', romaji: 'go', meaning: 'go sound', examples: ['ゴルフ (gorufu) - golf', 'ゴム (gomu) - rubber', 'ゴール (gooru) - goal'] },

    // Sa-row
    { char: 'サ', romaji: 'sa', meaning: 'sa sound', examples: ['サッカー (sakkaa) - soccer', 'サンドイッチ (sandoitchi) - sandwich', 'サイズ (saizu) - size'] },
    { char: 'シ', romaji: 'shi', meaning: 'shi sound', examples: ['シャツ (shatsu) - shirt', 'システム (shisutemu) - system', 'シーズン (shiizun) - season'] },
    { char: 'ス', romaji: 'su', meaning: 'su sound', examples: ['スポーツ (supootsu) - sports', 'スープ (suupu) - soup', 'スキー (sukii) - skiing'] },
    { char: 'セ', romaji: 'se', meaning: 'se sound', examples: ['セーター (seetaa) - sweater', 'センター (sentaa) - center', 'セット (setto) - set'] },
    { char: 'ソ', romaji: 'so', meaning: 'so sound', examples: ['ソファ (sofa) - sofa', 'ソース (soosu) - sauce', 'ソフト (sofuto) - soft'] },

    // Za-row (with dakuten)
    { char: 'ザ', romaji: 'za', meaning: 'za sound', examples: ['ザリガニ (zarigani) - crayfish', 'ザル (zaru) - strainer', 'ザッカー (zakkaa) - miscellaneous goods'] },
    { char: 'ジ', romaji: 'ji', meaning: 'ji sound', examples: ['ジュース (juusu) - juice', 'ジャケット (jaketto) - jacket', 'ジム (jimu) - gym'] },
    { char: 'ズ', romaji: 'zu', meaning: 'zu sound', examples: ['ズボン (zubon) - trousers', 'ズーム (zuumu) - zoom', 'ズル (zuru) - cheat'] },
    { char: 'ゼ', romaji: 'ze', meaning: 'ze sound', examples: ['ゼロ (zero) - zero', 'ゼリー (zerii) - jelly', 'ゼミ (zemi) - seminar'] },
    { char: 'ゾ', romaji: 'zo', meaning: 'zo sound', examples: ['ゾウ (zou) - elephant', 'ゾーン (zoon) - zone', 'ゾンビ (zonbi) - zombie'] },

    // Ta-row
    { char: 'タ', romaji: 'ta', meaning: 'ta sound', examples: ['タクシー (takushii) - taxi', 'タオル (taoru) - towel', 'タイヤ (taiya) - tire'] },
    { char: 'チ', romaji: 'chi', meaning: 'chi sound', examples: ['チーズ (chiizu) - cheese', 'チケット (chiketto) - ticket', 'チーム (chiimu) - team'] },
    { char: 'ツ', romaji: 'tsu', meaning: 'tsu sound', examples: ['ツアー (tsuaa) - tour', 'ツール (tsuuru) - tool', 'ツナ (tsuna) - tuna'] },
    { char: 'テ', romaji: 'te', meaning: 'te sound', examples: ['テレビ (terebi) - television', 'テーブル (teeburu) - table', 'テスト (tesuto) - test'] },
    { char: 'ト', romaji: 'to', meaning: 'to sound', examples: ['トイレ (toire) - toilet', 'トマト (tomato) - tomato', 'トラック (torakku) - truck'] },

    // Da-row (with dakuten)
    { char: 'ダ', romaji: 'da', meaning: 'da sound', examples: ['ダンス (dansu) - dance', 'ダイヤ (daiya) - diamond', 'ダム (damu) - dam'] },
    { char: 'ヂ', romaji: 'ji', meaning: 'ji sound (rare)', examples: ['ヂ (ji) - rarely used', 'ハナヂ (hanaji) - nosebleed'] },
    { char: 'ヅ', romaji: 'zu', meaning: 'zu sound (rare)', examples: ['ヅラ (zura) - wig', 'ミヅ (mizu) - water (archaic)'] },
    { char: 'デ', romaji: 'de', meaning: 'de sound', examples: ['デザート (dezaato) - dessert', 'デパート (depaato) - department store', 'デモ (demo) - demonstration'] },
    { char: 'ド', romaji: 'do', meaning: 'do sound', examples: ['ドア (doa) - door', 'ドラマ (dorama) - drama', 'ドクター (dokutaa) - doctor'] },

    // Na-row
    { char: 'ナ', romaji: 'na', meaning: 'na sound', examples: ['ナイフ (naifu) - knife', 'ナプキン (napukin) - napkin', 'ナース (naasu) - nurse'] },
    { char: 'ニ', romaji: 'ni', meaning: 'ni sound', examples: ['ニュース (nyuusu) - news', 'ニンジン (ninjin) - carrot', 'ニット (nitto) - knit'] },
    { char: 'ヌ', romaji: 'nu', meaning: 'nu sound', examples: ['ヌードル (nuudoru) - noodles', 'ヌード (nuudo) - nude', 'ヌルヌル (nurunuru) - slimy'] },
    { char: 'ネ', romaji: 'ne', meaning: 'ne sound', examples: ['ネクタイ (nekutai) - necktie', 'ネット (netto) - internet', 'ネズミ (nezumi) - mouse/rat'] },
    { char: 'ノ', romaji: 'no', meaning: 'no sound', examples: ['ノート (nooto) - notebook', 'ノック (nokku) - knock', 'ノーベル (nooberu) - Nobel'] },

    // Ha-row
    { char: 'ハ', romaji: 'ha', meaning: 'ha sound', examples: ['ハンバーガー (hanbaagaa) - hamburger', 'ハート (haato) - heart', 'ハム (hamu) - ham'] },
    { char: 'ヒ', romaji: 'hi', meaning: 'hi sound', examples: ['ヒーター (hiitaa) - heater', 'ヒント (hinto) - hint', 'ヒーロー (hiiroo) - hero'] },
    { char: 'フ', romaji: 'fu', meaning: 'fu sound', examples: ['フォーク (fooku) - fork', 'フィルム (firumu) - film', 'フルーツ (furuutsu) - fruits'] },
    { char: 'ヘ', romaji: 'he', meaning: 'he sound', examples: ['ヘルメット (herumetto) - helmet', 'ヘリコプター (herikoputaa) - helicopter', 'ヘア (hea) - hair'] },
    { char: 'ホ', romaji: 'ho', meaning: 'ho sound', examples: ['ホテル (hoteru) - hotel', 'ホーム (hoomu) - home/platform', 'ホット (hotto) - hot'] },

    // Ba-row (with dakuten)
    { char: 'バ', romaji: 'ba', meaning: 'ba sound', examples: ['バス (basu) - bus', 'バナナ (banana) - banana', 'バター (bataa) - butter'] },
    { char: 'ビ', romaji: 'bi', meaning: 'bi sound', examples: ['ビール (biiru) - beer', 'ビデオ (bideo) - video', 'ビル (biru) - building'] },
    { char: 'ブ', romaji: 'bu', meaning: 'bu sound', examples: ['ブラシ (burashi) - brush', 'ブーツ (buutsu) - boots', 'ブログ (burogu) - blog'] },
    { char: 'ベ', romaji: 'be', meaning: 'be sound', examples: ['ベッド (beddo) - bed', 'ベルト (beruto) - belt', 'ベース (beesu) - base'] },
    { char: 'ボ', romaji: 'bo', meaning: 'bo sound', examples: ['ボール (booru) - ball', 'ボタン (botan) - button', 'ボックス (bokkusu) - box'] },

    // Pa-row (with handakuten)
    { char: 'パ', romaji: 'pa', meaning: 'pa sound', examples: ['パン (pan) - bread', 'パーティー (paatii) - party', 'パソコン (pasokon) - personal computer'] },
    { char: 'ピ', romaji: 'pi', meaning: 'pi sound', examples: ['ピザ (piza) - pizza', 'ピアノ (piano) - piano', 'ピンク (pinku) - pink'] },
    { char: 'プ', romaji: 'pu', meaning: 'pu sound', examples: ['プール (puuru) - pool', 'プレゼント (purezento) - present', 'プラス (purasu) - plus'] },
    { char: 'ペ', romaji: 'pe', meaning: 'pe sound', examples: ['ペン (pen) - pen', 'ペット (petto) - pet', 'ペーパー (peepaa) - paper'] },
    { char: 'ポ', romaji: 'po', meaning: 'po sound', examples: ['ポスト (posuto) - post', 'ポケット (poketto) - pocket', 'ポイント (pointo) - point'] },

    // Ya-row (Katakana - Ya, Yu, Yo only, no Yi or Ye)
    { char: 'ヤ', romaji: 'ya', meaning: 'ya sound', examples: ['ヤード (yaado) - yard', 'ヤング (yangu) - young', 'ヤクザ (yakuza) - yakuza'] },
    { char: 'ユ', romaji: 'yu', meaning: 'yu sound', examples: ['ユーザー (yuuzaa) - user', 'ユニーク (yuniiku) - unique', 'ユーモア (yuumoa) - humor'] },
    { char: 'ヨ', romaji: 'yo', meaning: 'yo sound', examples: ['ヨーロッパ (yooroppa) - Europe', 'ヨット (yotto) - yacht', 'ヨガ (yoga) - yoga'] },

    // Ra-row
    { char: 'ラ', romaji: 'ra', meaning: 'ra sound', examples: ['ラジオ (rajio) - radio', 'ラーメン (raamen) - ramen', 'ライオン (raion) - lion'] },
    { char: 'リ', romaji: 'ri', meaning: 'ri sound', examples: ['リモコン (rimokon) - remote control', 'リンゴ (ringo) - apple', 'リスト (risuto) - list'] },
    { char: 'ル', romaji: 'ru', meaning: 'ru sound', examples: ['ルール (ruuru) - rule', 'ルーム (ruumu) - room', 'ルート (ruuto) - route'] },
    { char: 'レ', romaji: 're', meaning: 're sound', examples: ['レストラン (resutoran) - restaurant', 'レモン (remon) - lemon', 'レベル (reberu) - level'] },
    { char: 'ロ', romaji: 'ro', meaning: 'ro sound', examples: ['ロボット (robotto) - robot', 'ロック (rokku) - rock', 'ローマ (rooma) - Rome'] },

    // Wa-row
    { char: 'ワ', romaji: 'wa', meaning: 'wa sound', examples: ['ワイン (wain) - wine', 'ワンピース (wanpiisu) - dress', 'ワード (waado) - word'] },
    { char: 'ヲ', romaji: 'wo', meaning: 'wo sound (particle)', examples: ['ヲタク (otaku) - otaku (geek)', 'カタカナヲ (katakanao) - katakana wo'] },

    // N sound
    { char: 'ン', romaji: 'n', meaning: 'n sound', examples: ['アンパン (anpan) - sweet bread', 'コンビニ (konbini) - convenience store', 'レストラン (resutoran) - restaurant'] },

    // Ma-row
    { char: 'マ', romaji: 'ma', meaning: 'ma sound', examples: ['マヨネーズ (mayoneezu) - mayonnaise', 'マウス (mausu) - mouse', 'マンション (manshon) - apartment'] },
    { char: 'ミ', romaji: 'mi', meaning: 'mi sound', examples: ['ミルク (miruku) - milk', 'ミニ (mini) - mini', 'ミックス (mikkusu) - mix'] },
    { char: 'ム', romaji: 'mu', meaning: 'mu sound', examples: ['ムービー (muubii) - movie', 'ムード (muudo) - mood', 'ムース (muusu) - mousse'] },
    { char: 'メ', romaji: 'me', meaning: 'me sound', examples: ['メール (meeru) - email', 'メモ (memo) - memo', 'メニュー (menyuu) - menu'] },
    { char: 'モ', romaji: 'mo', meaning: 'mo sound', examples: ['モーター (mootaa) - motor', 'モデル (moderu) - model', 'モバイル (mobairu) - mobile'] },

    // Ya-row
    { char: 'ヤ', romaji: 'ya', meaning: 'ya sound', examples: ['ヤード (yaado) - yard', 'ヤング (yangu) - young', 'ヤクザ (yakuza) - yakuza'] },
    { char: 'ユ', romaji: 'yu', meaning: 'yu sound', examples: ['ユーザー (yuuzaa) - user', 'ユニーク (yuniiku) - unique', 'ユーモア (yuumoa) - humor'] },
    { char: 'ヨ', romaji: 'yo', meaning: 'yo sound', examples: ['ヨーロッパ (yooroppa) - Europe', 'ヨット (yotto) - yacht', 'ヨガ (yoga) - yoga'] },

    // Ra-row
    { char: 'ラ', romaji: 'ra', meaning: 'ra sound', examples: ['ラジオ (rajio) - radio', 'ラーメン (raamen) - ramen', 'ライオン (raion) - lion'] },
    { char: 'リ', romaji: 'ri', meaning: 'ri sound', examples: ['リモコン (rimokon) - remote control', 'リンゴ (ringo) - apple', 'リスト (risuto) - list'] },
    { char: 'ル', romaji: 'ru', meaning: 'ru sound', examples: ['ルール (ruuru) - rule', 'ルーム (ruumu) - room', 'ルート (ruuto) - route'] },
    { char: 'レ', romaji: 're', meaning: 're sound', examples: ['レストラン (resutoran) - restaurant', 'レモン (remon) - lemon', 'レベル (reberu) - level'] },
    { char: 'ロ', romaji: 'ro', meaning: 'ro sound', examples: ['ロボット (robotto) - robot', 'ロック (rokku) - rock', 'ローマ (rooma) - Rome'] },

    // Wa-row
    { char: 'ワ', romaji: 'wa', meaning: 'wa sound', examples: ['ワイン (wain) - wine', 'ワンピース (wanpiisu) - dress', 'ワード (waado) - word'] },
    { char: 'ヲ', romaji: 'wo', meaning: 'wo sound (particle)', examples: ['ヲタク (otaku) - otaku (geek)', 'カタカナヲ (katakanao) - katakana wo'] },

    // N sound
    { char: 'ン', romaji: 'n', meaning: 'n sound', examples: ['アンパン (anpan) - sweet bread', 'コンビニ (konbini) - convenience store', 'レストラン (resutoran) - restaurant'] },

    // Long vowel mark
    { char: 'ー', romaji: '-', meaning: 'long vowel mark', examples: ['コーヒー (koohii) - coffee', 'ケーキ (keeki) - cake', 'ビール (biiru) - beer'] },

    // Small tsu (sokuon)
    { char: 'ッ', romaji: '(double consonant)', meaning: 'small tsu for double consonants', examples: ['カップ (kappu) - cup', 'サッカー (sakkaa) - soccer', 'キッチン (kicchin) - kitchen'] },

    // Additional katakana for foreign sounds
    { char: 'ヴ', romaji: 'vu', meaning: 'vu sound (foreign)', examples: ['ヴァイオリン (vaiorin) - violin', 'ヴィザ (viza) - visa', 'ヴェール (veeru) - veil'] },
    { char: 'ファ', romaji: 'fa', meaning: 'fa sound', examples: ['ファイル (fairu) - file', 'ファン (fan) - fan', 'ファミリー (famirii) - family'] },
    { char: 'フィ', romaji: 'fi', meaning: 'fi sound', examples: ['フィルム (firumu) - film', 'フィット (fitto) - fit', 'フィギュア (figyua) - figure'] },
    { char: 'フェ', romaji: 'fe', meaning: 'fe sound', examples: ['フェスタ (fesuta) - festival', 'フェリー (ferii) - ferry', 'フェア (fea) - fair'] },
    { char: 'フォ', romaji: 'fo', meaning: 'fo sound', examples: ['フォーク (fooku) - fork', 'フォト (foto) - photo', 'フォーム (foomu) - form'] },
    { char: 'ティ', romaji: 'ti', meaning: 'ti sound', examples: ['ティー (tii) - tea', 'パーティー (paatii) - party', 'セキュリティ (sekyuriti) - security'] },
    { char: 'ディ', romaji: 'di', meaning: 'di sound', examples: ['ディスク (disuku) - disk', 'スタディー (sutadii) - study', 'メロディー (merodii) - melody'] },
    { char: 'デュ', romaji: 'du', meaning: 'du sound', examples: ['プロデューサー (purodyuusaa) - producer', 'デュエット (dyuetto) - duet'] },
    { char: 'トゥ', romaji: 'tu', meaning: 'tu sound', examples: ['コンピューター (konpyuutaa) - computer', 'トゥース (tuusu) - tooth'] }
         ],
        combos:    [ 
            // Hiragana combinations
            { char: 'きゃ', romaji: 'kya', meaning: 'kya sound combination', examples: ['キャベツ (kyabetsu) - cabbage', '客 (kyaku) - guest', 'キャンプ (kyanpu) - camp'] },
            { char: 'きゅ', romaji: 'kyu', meaning: 'kyu sound combination', examples: ['牛乳 (gyuunyuu) - milk', '急 (kyuu) - sudden', 'キュート (kyuuto) - cute'] },
            { char: 'きょ', romaji: 'kyo', meaning: 'kyo sound combination', examples: ['今日 (kyou) - today', '教室 (kyoushitsu) - classroom', '京都 (kyouto) - Kyoto'] },
            { char: 'ぎゃ', romaji: 'gya', meaning: 'gya sound combination', examples: ['ギャング (gyangu) - gang', 'ギャラリー (gyararii) - gallery'] },
            { char: 'ぎゅ', romaji: 'gyu', meaning: 'gyu sound combination', examples: ['牛肉 (gyuuniku) - beef', 'ギュッと (gyutto) - tightly'] },
            { char: 'ぎょ', romaji: 'gyo', meaning: 'gyo sound combination', examples: ['魚 (sakana/gyo) - fish', '行列 (gyouretsu) - line/queue'] },
            { char: 'しゃ', romaji: 'sha', meaning: 'sha sound combination', examples: ['シャワー (shawaa) - shower', '写真 (shashin) - photograph', 'シャツ (shatsu) - shirt'] },
            { char: 'しゅ', romaji: 'shu', meaning: 'shu sound combination', examples: ['宿題 (shukudai) - homework', '手術 (shujutsu) - surgery', 'シュート (shuuto) - shoot'] },
            { char: 'しょ', romaji: 'sho', meaning: 'sho sound combination', examples: ['醤油 (shouyu) - soy sauce', '小学校 (shougakkou) - elementary school', 'ショー (shoo) - show'] },
            { char: 'じゃ', romaji: 'ja', meaning: 'ja sound combination', examples: ['ジャム (jamu) - jam', 'ジャケット (jaketto) - jacket', 'じゃあね (jaane) - see you'] },
            { char: 'じゅ', romaji: 'ju', meaning: 'ju sound combination', examples: ['ジュース (juusu) - juice', '授業 (jugyou) - class/lesson', 'じゅうたん (juutan) - carpet'] },
            { char: 'じょ', romaji: 'jo', meaning: 'jo sound combination', examples: ['情報 (jouhou) - information', '女性 (josei) - female', 'ジョーク (jooku) - joke'] },
            { char: 'ちゃ', romaji: 'cha', meaning: 'cha sound combination', examples: ['茶 (cha) - tea', 'お茶 (ocha) - green tea', 'チャンス (chansu) - chance'] },
            { char: 'ちゅ', romaji: 'chu', meaning: 'chu sound combination', examples: ['中学 (chuugaku) - middle school', '注意 (chuui) - caution', 'チューリップ (chuurippu) - tulip'] },
            { char: 'ちょ', romaji: 'cho', meaning: 'cho sound combination', examples: ['朝 (asa/chou) - morning', 'チョコレート (chokoreeto) - chocolate', 'ちょっと (chotto) - a little'] },
            { char: 'にゃ', romaji: 'nya', meaning: 'nya sound combination', examples: ['ニャンコ (nyanko) - kitty', 'にゃー (nyaa) - meow'] },
            { char: 'にゅ', romaji: 'nyu', meaning: 'nyu sound combination', examples: ['入学 (nyuugaku) - enrollment', 'ニュース (nyuusu) - news', '牛乳 (gyuunyuu) - milk'] },
            { char: 'にょ', romaji: 'nyo', meaning: 'nyo sound combination', examples: ['女 (onna/nyo) - woman', '尿 (nyou) - urine'] },
            { char: 'ひゃ', romaji: 'hya', meaning: 'hya sound combination', examples: ['百 (hyaku) - hundred', 'ヒャッハー (hyahhaa) - yahoo'] },
            { char: 'ひゅ', romaji: 'hyu', meaning: 'hyu sound combination', examples: ['ヒューマン (hyuuman) - human', 'ヒュー (hyuu) - whew'] },
            { char: 'ひょ', romaji: 'hyo', meaning: 'hyo sound combination', examples: ['表 (hyou) - table/chart', '病院 (byouin) - hospital'] },
            { char: 'びゃ', romaji: 'bya', meaning: 'bya sound combination', examples: ['百円 (hyakuen) - 100 yen', 'びゃあ (byaa) - exclamation'] },
            { char: 'びゅ', romaji: 'byu', meaning: 'byu sound combination', examples: ['ビュー (byuu) - view', 'びゅんびゅん (byunbyun) - whoosh'] },
            { char: 'びょ', romaji: 'byo', meaning: 'byo sound combination', examples: ['病気 (byouki) - illness', '秒 (byou) - second'] },
            { char: 'ぴゃ', romaji: 'pya', meaning: 'pya sound combination', examples: ['ぴゃあ (pyaa) - exclamation'] },
            { char: 'ぴゅ', romaji: 'pyu', meaning: 'pyu sound combination', examples: ['ピューマ (pyuuma) - puma', 'ぴゅー (pyuu) - whoosh'] },
            { char: 'ぴょ', romaji: 'pyo', meaning: 'pyo sound combination', examples: ['ぴょんぴょん (pyonpyon) - hop hop'] },
            { char: 'みゃ', romaji: 'mya', meaning: 'mya sound combination', examples: ['ミャンマー (myanmaa) - Myanmar', 'みゃあ (myaa) - meow'] },
            { char: 'みゅ', romaji: 'myu', meaning: 'myu sound combination', examples: ['ミュージック (myuujikku) - music', 'ミュージアム (myuujiamu) - museum'] },
            { char: 'みょ', romaji: 'myo', meaning: 'myo sound combination', examples: ['明日 (ashita/myou) - tomorrow', '名字 (myouji) - surname'] },
            { char: 'りゃ', romaji: 'rya', meaning: 'rya sound combination', examples: ['料理 (ryouri) - cooking', '旅館 (ryokan) - inn'] },
            { char: 'りゅ', romaji: 'ryu', meaning: 'ryu sound combination', examples: ['龍 (ryuu) - dragon', '留学 (ryuugaku) - study abroad', '流行 (ryuukou) - trend'] },
            { char: 'りょ', romaji: 'ryo', meaning: 'ryo sound combination', examples: ['料金 (ryoukin) - fee', '旅行 (ryokou) - travel', '両方 (ryouhou) - both'] },
            
            // Katakana combinations
            { char: 'キャ', romaji: 'kya', meaning: 'katakana kya sound', examples: ['キャンプ (kyanpu) - camp', 'キャベツ (kyabetsu) - cabbage', 'キャラクター (kyarakutaa) - character'] },
            { char: 'キュ', romaji: 'kyu', meaning: 'katakana kyu sound', examples: ['キュート (kyuuto) - cute', 'レスキュー (resukyuu) - rescue', 'キューバ (kyuuba) - Cuba'] },
            { char: 'キョ', romaji: 'kyo', meaning: 'katakana kyo sound', examples: ['東京 (toukyou) - Tokyo', 'キョロキョロ (kyorokyoro) - looking around'] },
            { char: 'ギャ', romaji: 'gya', meaning: 'katakana gya sound', examples: ['ギャング (gyangu) - gang', 'ギャラリー (gyararii) - gallery', 'ギャップ (gyappu) - gap'] },
            { char: 'ギュ', romaji: 'gyu', meaning: 'katakana gyu sound', examples: ['ギュッと (gyutto) - tightly', 'ギュウギュウ (gyuugyuu) - packed'] },
            { char: 'ギョ', romaji: 'gyo', meaning: 'katakana gyo sound', examples: ['ギョーザ (gyouza) - dumpling', 'ギョギョ (gyogyo) - surprised'] },
            { char: 'シャ', romaji: 'sha', meaning: 'katakana sha sound', examples: ['シャツ (shatsu) - shirt', 'シャワー (shawaa) - shower', 'シャンプー (shanpuu) - shampoo'] },
            { char: 'シュ', romaji: 'shu', meaning: 'katakana shu sound', examples: ['シュート (shuuto) - shoot', 'シュガー (shugaa) - sugar', 'シューズ (shuuzu) - shoes'] },
            { char: 'ショ', romaji: 'sho', meaning: 'katakana sho sound', examples: ['ショー (shoo) - show', 'ショップ (shoppu) - shop', 'ショック (shokku) - shock'] },
            { char: 'ジャ', romaji: 'ja', meaning: 'katakana ja sound', examples: ['ジャケット (jaketto) - jacket', 'ジャム (jamu) - jam', 'ジャンプ (janpu) - jump'] },
            { char: 'ジュ', romaji: 'ju', meaning: 'katakana ju sound', examples: ['ジュース (juusu) - juice', 'ジュエリー (juerii) - jewelry', 'ジューシー (juushii) - juicy'] },
            { char: 'ジョ', romaji: 'jo', meaning: 'katakana jo sound', examples: ['ジョーク (jooku) - joke', 'ジョブ (jobu) - job', 'ジョギング (jogingu) - jogging'] },
            { char: 'チャ', romaji: 'cha', meaning: 'katakana cha sound', examples: ['チャンス (chansu) - chance', 'チャレンジ (charenji) - challenge', 'チャンネル (channeru) - channel'] },
            { char: 'チュ', romaji: 'chu', meaning: 'katakana chu sound', examples: ['チューリップ (chuurippu) - tulip', 'チューブ (chuubu) - tube', 'ナチュラル (nachuraru) - natural'] },
            { char: 'チョ', romaji: 'cho', meaning: 'katakana cho sound', examples: ['チョコレート (chokoreeto) - chocolate', 'チョイス (choisu) - choice', 'チョーク (chooku) - chalk'] },
            { char: 'ニャ', romaji: 'nya', meaning: 'katakana nya sound', examples: ['ニャー (nyaa) - meow', 'ニャンコ (nyanko) - kitty'] },
            { char: 'ニュ', romaji: 'nyu', meaning: 'katakana nyu sound', examples: ['ニュース (nyuusu) - news', 'ニューヨーク (nyuuyooku) - New York', 'メニュー (menyuu) - menu'] },
            { char: 'ニョ', romaji: 'nyo', meaning: 'katakana nyo sound', examples: ['ニョキニョキ (nyokinyoki) - sprouting'] },
            { char: 'ヒャ', romaji: 'hya', meaning: 'katakana hya sound', examples: ['ヒャッハー (hyahhaa) - yahoo', 'ヒャクパーセント (hyakupaasento) - 100 percent'] },
            { char: 'ヒュ', romaji: 'hyu', meaning: 'katakana hyu sound', examples: ['ヒューマン (hyuuman) - human', 'ヒュー (hyuu) - whew', 'ヒューズ (hyuuzu) - fuse'] },
            { char: 'ヒョ', romaji: 'hyo', meaning: 'katakana hyo sound', examples: ['ヒョウ (hyou) - leopard', 'ヒョウタン (hyoutan) - gourd'] },
            { char: 'ビャ', romaji: 'bya', meaning: 'katakana bya sound', examples: ['ビャーッ (byaah) - exclamation'] },
            { char: 'ビュ', romaji: 'byu', meaning: 'katakana byu sound', examples: ['ビュー (byuu) - view', 'ビューティー (byuutii) - beauty', 'レビュー (rebyuu) - review'] },
            { char: 'ビョ', romaji: 'byo', meaning: 'katakana byo sound', examples: ['ビョーン (byoon) - boing'] },
            { char: 'ピャ', romaji: 'pya', meaning: 'katakana pya sound', examples: ['ピャー (pyaa) - exclamation'] },
            { char: 'ピュ', romaji: 'pyu', meaning: 'katakana pyu sound', examples: ['ピューマ (pyuuma) - puma', 'ピュア (pyua) - pure', 'コンピューター (konpyuutaa) - computer'] },
            { char: 'ピョ', romaji: 'pyo', meaning: 'katakana pyo sound', examples: ['ピョンピョン (pyonpyon) - hop hop', 'ピョン (pyon) - bounce'] },
            { char: 'ミャ', romaji: 'mya', meaning: 'katakana mya sound', examples: ['ミャンマー (myanmaa) - Myanmar', 'ミャー (myaa) - meow'] },
            { char: 'ミュ', romaji: 'myu', meaning: 'katakana myu sound', examples: ['ミュージック (myuujikku) - music', 'ミュージアム (myuujiamu) - museum', 'コミュニティ (komyunitii) - community'] },
            { char: 'ミョ', romaji: 'myo', meaning: 'katakana myo sound', examples: ['ミョウガ (myouga) - Japanese ginger'] },
            { char: 'リャ', romaji: 'rya', meaning: 'katakana rya sound', examples: ['リャマ (ryama) - llama'] },
            { char: 'リュ', romaji: 'ryu', meaning: 'katakana ryu sound', examples: ['リュック (ryukku) - backpack', 'リュウ (ryuu) - dragon', 'ボリューム (boryuumu) - volume'] },
            { char: 'リョ', romaji: 'ryo', meaning: 'katakana ryo sound', examples: ['リョウ (ryou) - dormitory', 'リョコウ (ryokou) - travel'] }
         ],

        // Beginner Kanji set used across Flashcards/Quiz/Curriculum
        kanji: [
            { char: '日', romaji: 'nichi', meaning: 'sun; day', examples: ['日本 (nihon) - Japan', '日曜日 (nichiyoubi) - Sunday', '今日 (kyou) - today'] },
            { char: '月', romaji: 'getsu', meaning: 'moon; month', examples: ['月 (tsuki) - moon', '月曜日 (getsuyoubi) - Monday', '一月 (ichigatsu) - January'] },
            { char: '火', romaji: 'ka', meaning: 'fire', examples: ['火山 (kazan) - volcano', '火曜日 (kayoubi) - Tuesday', '花火 (hanabi) - fireworks'] },
            { char: '水', romaji: 'sui', meaning: 'water', examples: ['水 (mizu) - water', '水曜日 (suiyoubi) - Wednesday', '水道 (suidou) - water supply'] },
            { char: '木', romaji: 'moku', meaning: 'tree; wood', examples: ['木 (ki) - tree', '木曜日 (mokuyoubi) - Thursday', '木材 (mokuzai) - lumber'] },
            { char: '金', romaji: 'kin', meaning: 'gold; money', examples: ['金曜日 (kinyoubi) - Friday', 'お金 (okane) - money', '金色 (kiniro) - golden'] },
            { char: '土', romaji: 'do', meaning: 'earth; soil', examples: ['土地 (tochi) - land', '土曜日 (doyoubi) - Saturday', '土 (tsuchi) - soil'] },
            { char: '本', romaji: 'hon', meaning: 'book; origin', examples: ['本 (hon) - book', '日本 (nihon) - Japan', '本屋 (honya) - bookstore'] },
            { char: '人', romaji: 'hito', meaning: 'person', examples: ['人 (hito) - person', '大人 (otona) - adult', '日本人 (nihonjin) - Japanese person'] },
            { char: '口', romaji: 'kuchi', meaning: 'mouth', examples: ['口 (kuchi) - mouth', '入口 (iriguchi) - entrance', '出口 (deguchi) - exit'] },
            { char: '山', romaji: 'yama', meaning: 'mountain', examples: ['山 (yama) - mountain', '火山 (kazan) - volcano', '富士山 (fujisan) - Mt. Fuji'] },
            { char: '川', romaji: 'kawa', meaning: 'river', examples: ['川 (kawa) - river', '川辺 (kawabe) - riverside', '河口 (kakou) - river mouth'] },
            { char: '田', romaji: 'ta', meaning: 'rice field', examples: ['田んぼ (tanbo) - rice field', '田舎 (inaka) - countryside', '田中 (tanaka) - Tanaka (surname)'] },
            { char: '中', romaji: 'naka', meaning: 'middle; inside', examples: ['中 (naka) - inside', '中国 (chuugoku) - China', '中央 (chuuou) - center'] },
            { char: '大', romaji: 'dai', meaning: 'big; large', examples: ['大きい (ookii) - big', '大学 (daigaku) - university', '大人 (otona) - adult'] },
            { char: '小', romaji: 'shou', meaning: 'small; little', examples: ['小さい (chiisai) - small', '小学校 (shougakkou) - elementary school', '大小 (daishou) - size'] },
            { char: '上', romaji: 'ue', meaning: 'up; above', examples: ['上 (ue) - above', '上手 (jouzu) - skilled', '屋上 (okujou) - rooftop'] },
            { char: '下', romaji: 'shita', meaning: 'down; below', examples: ['下 (shita) - below', '地下 (chika) - underground', '下手 (heta) - unskilled'] },
            { char: '左', romaji: 'hidari', meaning: 'left', examples: ['左 (hidari) - left', '左右 (sayuu) - left and right'] },
            { char: '右', romaji: 'migi', meaning: 'right', examples: ['右 (migi) - right', '左右 (sayuu) - left and right'] },
            { char: '名', romaji: 'na', meaning: 'name; fame', examples: ['名前 (namae) - name', '有名 (yuumei) - famous', '名人 (meijin) - expert'] },
            { char: '女', romaji: 'onna', meaning: 'woman; female', examples: ['女 (onna) - woman', '少女 (shoujo) - girl', '女性 (josei) - female'] },
            { char: '男', romaji: 'otoko', meaning: 'man; male', examples: ['男 (otoko) - man', '男子 (danshi) - boy/man', '男女 (danjo) - men and women'] },
            { char: '子', romaji: 'ko', meaning: 'child', examples: ['子供 (kodomo) - child', '女子 (joshi) - girl', '男の子 (otokonoko) - boy'] },
            { char: '目', romaji: 'me', meaning: 'eye', examples: ['目 (me) - eye', '目的 (mokuteki) - purpose', '目標 (mokuhyou) - goal'] },
            { char: '耳', romaji: 'mimi', meaning: 'ear', examples: ['耳 (mimi) - ear', '耳鼻科 (jibika) - ENT clinic'] },

            // New additions
            { char: '手', romaji: 'te', meaning: 'hand', examples: ['手 (te) - hand', '上手 (jouzu) - skilled', '手紙 (tegami) - letter'] },
            { char: '心', romaji: 'kokoro', meaning: 'heart; mind', examples: ['心 (kokoro) - heart', '安心 (anshin) - relief', '心配 (shinpai) - worry'] },
            { char: '学', romaji: 'gaku', meaning: 'study; learning', examples: ['学生 (gakusei) - student', '学校 (gakkou) - school', '学ぶ (manabu) - to learn'] },
            { char: '校', romaji: 'kou', meaning: 'school', examples: ['学校 (gakkou) - school', '高校 (koukou) - high school', '校長 (kouchou) - principal'] },
            { char: '生', romaji: 'sei', meaning: 'life; student', examples: ['学生 (gakusei) - student', '先生 (sensei) - teacher', '生活 (seikatsu) - life'] },
            { char: '先', romaji: 'sen', meaning: 'ahead; previous', examples: ['先生 (sensei) - teacher', '先週 (senshuu) - last week', '先に (sakini) - ahead'] },
            { char: '年', romaji: 'nen', meaning: 'year', examples: ['一年 (ichinen) - one year', '今年 (kotoshi) - this year', '来年 (rainen) - next year'] },
            { char: '時', romaji: 'ji', meaning: 'time; hour', examples: ['時間 (jikan) - time', '時計 (tokei) - clock', '時々 (tokidoki) - sometimes'] },
            { char: '車', romaji: 'kuruma', meaning: 'car; vehicle', examples: ['車 (kuruma) - car', '電車 (densha) - train', '自転車 (jitensha) - bicycle'] },
            { char: '電', romaji: 'den', meaning: 'electricity', examples: ['電気 (denki) - electricity', '電話 (denwa) - phone', '電車 (densha) - train'] },
            { char: '天', romaji: 'ten', meaning: 'heaven; sky', examples: ['天気 (tenki) - weather', '天国 (tengoku) - heaven', '天才 (tensai) - genius'] },
            { char: '気', romaji: 'ki', meaning: 'spirit; energy', examples: ['元気 (genki) - healthy', '天気 (tenki) - weather', '気持ち (kimochi) - feeling'] },
            { char: '王', romaji: 'ou', meaning: 'king', examples: ['王 (ou) - king', '王子 (ouji) - prince', '女王 (joou) - queen'] },
            { char: '玉', romaji: 'tama', meaning: 'ball; jewel', examples: ['玉 (tama) - ball', '王玉 (ougyoku) - royal jewel', '玉ねぎ (tamanegi) - onion'] }
        ]
    },

    init() {
        this.bindToggleButtons();
        this.setMode('hiragana');
    },

    dedupeData(list) {
        const seen = new Set();
        return list.filter(entry => {
            const key = typeof entry === 'string' ? entry : (entry.char || entry.kana || '');
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    },

    bindToggleButtons() {
        const hiraganaBtn = document.getElementById('flashHiraganaBtn') ||
            this.createToggleButton('flashHiraganaBtn', 'ひらがな Hiragana', 'hiragana');

        const katakanaBtn = document.getElementById('flashKatakanaBtn') ||
            this.createToggleButton('flashKatakanaBtn', 'カタカナ Katakana', 'katakana');

        const kanjiBtn = document.getElementById('flashKanjiBtn') ||
            this.createToggleButton('flashKanjiBtn', '漢字 Kanji', 'kanji');

        const combosBtn = document.getElementById('flashCombosBtn') ||
            this.createToggleButton('flashCombosBtn', 'きゃ Combos', 'combos');

        const allBtn = document.getElementById('flashAllBtn') ||
            this.createToggleButton('flashAllBtn', 'All', 'all');

        hiraganaBtn.onclick = () => this.setMode('hiragana');
        katakanaBtn.onclick = () => this.setMode('katakana');
        kanjiBtn.onclick    = () => this.setMode('kanji');
        combosBtn.onclick   = () => this.setMode('combos');
        allBtn.onclick      = () => this.setMode('all');
    },

    createToggleButton(id, text, mode) {
        const flashcardsSection = document.getElementById('flashcards');
        if (!flashcardsSection) return document.createElement('button');

        let toggleContainer =
            flashcardsSection.querySelector('.flashcard-toggle-container');

        if (!toggleContainer) {
            toggleContainer = document.createElement('div');
            toggleContainer.className = 'flashcard-toggle-container';
            toggleContainer.style.cssText = `
                display:flex;
                justify-content:center;
                gap:10px;
                margin:20px 0;
                flex-wrap:wrap;
            `;

            const h2 = flashcardsSection.querySelector('h2');
            h2?.after(toggleContainer);
        }

        const btn = document.createElement('button');
        btn.id = id;
        btn.textContent = text;
        btn.className = 'toggle-btn';
        btn.onclick = () => this.setMode(mode);

        toggleContainer.appendChild(btn);
        return btn;
    },

    setMode(mode) {
        this.currentMode = mode;
        this.updateToggleButtons();
        this.updateFlashcardData();
    },

    updateToggleButtons() {
        const ids = [
            'flashHiraganaBtn','flashKatakanaBtn','flashKanjiBtn',
            'flashCombosBtn','flashAllBtn'
        ];
        const modes = ['hiragana','katakana','kanji','combos','all'];

        ids.forEach((id, i) => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.classList.toggle('active', modes[i] === this.currentMode);
        });
    },

    updateFlashcardData() {
        let data;

        switch (this.currentMode) {
            case 'hiragana': data = this.scriptData.hiragana; break;
            case 'katakana': data = this.scriptData.katakana; break;
            case 'kanji':    data = this.scriptData.kanji;    break;
            case 'combos':   data = this.scriptData.combos;   break;
            case 'all':
                data = this.dedupeData([
                    ...this.scriptData.hiragana,
                    ...this.scriptData.katakana,
                    ...this.scriptData.kanji,
                    ...this.scriptData.combos
                ]);
                break;
        }

        // Use refreshFromToggle to properly update Flashcards
        if (typeof Flashcards !== 'undefined' && Flashcards.refreshFromToggle) {
            Flashcards.refreshFromToggle();
        }
    },

    getCurrentData() {
        if (this.currentMode === 'all') {
            return this.dedupeData([
                ...this.scriptData.hiragana,
                ...this.scriptData.katakana,
                ...this.scriptData.kanji,
                ...this.scriptData.combos
            ]);
        }
        return this.scriptData[this.currentMode];
    }
};
// Expose the toggle and its data for the main app to use.
if (typeof window !== 'undefined') {
    window.FlashcardToggle = FlashcardToggle1;
}

// Auto-init the toggle when the flashcards section is present
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('flashcards')) {
        try { FlashcardToggle1.init(); } catch(e) { if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('FlashcardToggle1.init error', e); }
    }
});

