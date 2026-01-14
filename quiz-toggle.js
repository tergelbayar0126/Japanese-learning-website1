 //Quiz Toggle System
const QuizToggle = {
    currentMode: 'hiragana',
    lessonChars: [],
    lessonRomaji: null,
    
    // Character sets for different modes
    characterSets: {
        hiragana: [
            // Basic Hiragana
            'あ', 'い', 'う', 'え', 'お',
            'か', 'き', 'く', 'け', 'こ',
            'が', 'ぎ', 'ぐ', 'げ', 'ご',
            'さ', 'し', 'す', 'せ', 'そ',
            'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
            'た', 'ち', 'つ', 'て', 'と',
            'だ', 'ぢ', 'づ', 'で', 'ど',
            'な', 'に', 'ぬ', 'ね', 'の',
            'は', 'ひ', 'ふ', 'へ', 'ほ',
            'ば', 'び', 'ぶ', 'べ', 'ぼ',
            'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
            'ま', 'み', 'む', 'め', 'も',
            'や', 'ゆ', 'よ',
            'ら', 'り', 'る', 'れ', 'ろ',
            'わ', 'を', 'ん'
        ],
        
        katakana: [
            // Basic Katakana
            'ア', 'イ', 'ウ', 'エ', 'オ',
            'カ', 'キ', 'ク', 'ケ', 'コ',
            'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
            'サ', 'シ', 'ス', 'セ', 'ソ',
            'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
            'タ', 'チ', 'ツ', 'テ', 'ト',
            'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
            'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
            'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
            'バ', 'ビ', 'ブ', 'ベ', 'ボ',
            'パ', 'ピ', 'プ', 'ペ', 'ポ',
            'マ', 'ミ', 'ム', 'メ', 'モ',
            'ヤ', 'ユ', 'ヨ',
            'ラ', 'リ', 'ル', 'レ', 'ロ',
            'ワ', 'ヲ', 'ン'
        ],
        
        combos: [
            // Hiragana Combinations
            'きゃ', 'きゅ', 'きょ',
            'しゃ', 'しゅ', 'しょ',
            'ちゃ', 'ちゅ', 'ちょ',
            'にゃ', 'にゅ', 'にょ',
            'ひゃ', 'ひゅ', 'ひょ',
            'みゃ', 'みゅ', 'みょ',
            'りゃ', 'りゅ', 'りょ',
            'ぎゃ', 'ぎゅ', 'ぎょ',
            'じゃ', 'じゅ', 'じょ',
            'びゃ', 'びゅ', 'びょ',
            'ぴゃ', 'ぴゅ', 'ぴょ',
            // Katakana Combinations
            'キャ', 'キュ', 'キョ',
            'シャ', 'シュ', 'ショ',
            'チャ', 'チュ', 'チョ',
            'ニャ', 'ニュ', 'ニョ',
            'ヒャ', 'ヒュ', 'ヒョ',
            'ミャ', 'ミュ', 'ミョ',
            'リャ', 'リュ', 'リョ',
            'ギャ', 'ギュ', 'ギョ',
            'ジャ', 'ジュ', 'ジョ',
            'ビャ', 'ビュ', 'ビョ',
            'ピャ', 'ピュ', 'ピョ'
        ],

        kanji: [
            '日','月','火','水','木','金','土','本','人','口','山','川','田','中','大','小','上','下','左','右','名','女','男','子','目','耳',
            '手','心','学','校','生','先','年','時','車','電','天','気','王','玉'
        ]
    },

    // Romaji mapping for all characters
    romajiMap: {
        // Hiragana
        'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
        'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
        'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
        'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
        'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
        'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
        'だ': 'da', 'ぢ': 'di', 'づ': 'du', 'で': 'de', 'ど': 'do',
        'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
        'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
        'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
        'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
        'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
        'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
        'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
        'わ': 'wa', 'を': 'wo', 'ん': 'n',

        // Katakana
        'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
        'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
        'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
        'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
        'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
        'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
        'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
        'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
        'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
        'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
        'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
        'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
        'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
        'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
        'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',

        // Combinations
        'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
        'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
        'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
        'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
        'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
        'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
        'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
        'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
        'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
        'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
        'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
        'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
        'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
        'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
        'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
        'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
        'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
        'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',
        'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
        'ジャ': 'ja', 'ジュ': 'ju', 'ジョ': 'jo',
        'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
        'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',

        // Beginner Kanji readings
        '日': 'nichi', '月': 'getsu', '火': 'ka', '水': 'sui', '木': 'moku', '金': 'kin', '土': 'do',
        '本': 'hon', '人': 'hito', '口': 'kuchi', '山': 'yama', '川': 'kawa', '田': 'ta', '中': 'naka',
        '大': 'dai', '小': 'shou', '上': 'ue', '下': 'shita', '左': 'hidari', '右': 'migi', '名': 'na',
        '女': 'onna', '男': 'otoko', '子': 'ko', '目': 'me', '耳': 'mimi',
        '手': 'te', '心': 'kokoro', '学': 'gaku', '校': 'kou', '生': 'sei', '先': 'sen', '年': 'nen', '時': 'ji',
        '車': 'kuruma', '電': 'den', '天': 'ten', '気': 'ki', '王': 'ou', '玉': 'tama'
    },

    init() {
        this.bindToggleButtons();
        this.setMode('hiragana'); // Start with hiragana
    },

    dedupeCharacters(list) {
        return Array.from(new Set(list.filter(Boolean)));
    },

    bindToggleButtons() {
        const hiraganaBtn = document.getElementById('hiraganaBtn');
        const katakanaBtn = document.getElementById('katakanaBtn');
        const kanjiBtn = document.getElementById('kanjiBtn');
        const combosBtn = document.getElementById('combosBtn');
        const allBtn = document.getElementById('bothBtn'); // Note: ID is 'bothBtn' but represents 'All'

        if (hiraganaBtn) hiraganaBtn.addEventListener('click', () => this.setMode('hiragana'));
        if (katakanaBtn) katakanaBtn.addEventListener('click', () => this.setMode('katakana'));
        if (kanjiBtn) kanjiBtn.addEventListener('click', () => this.setMode('kanji'));
        if (combosBtn) combosBtn.addEventListener('click', () => this.setMode('combos'));
        if (allBtn) allBtn.addEventListener('click', () => this.setMode('all'));
    },

    setLesson(lesson) {
        if (!lesson || !Array.isArray(lesson.chars)) return;
        this.lessonChars = lesson.chars.slice();
        // build romaji map from global RomajiMap fallback to existing map
        const rm = (typeof RomajiMap !== 'undefined') ? RomajiMap : this.romajiMap;
        this.lessonRomaji = rm;
        this.setMode('lesson');
    },

    setMode(mode) {
        if (mode === 'both') mode = 'all';
        this.currentMode = mode;
        this.updateToggleButtons();
        this.updateQuizData();
        
        // Reset quiz if it exists
        if (window.Quiz) {
            window.Quiz.restart();
        }
    },

    updateToggleButtons() {
        const buttons = {
            'hiragana': document.getElementById('hiraganaBtn'),
            'katakana': document.getElementById('katakanaBtn'),
            'kanji': document.getElementById('kanjiBtn'),
            'combos': document.getElementById('combosBtn'),
            'all': document.getElementById('bothBtn')
        };
        
        // Remove active class from all buttons
        Object.values(buttons).forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
        
        // Add active class to current mode button
        const activeButton = buttons[this.currentMode];
        if (activeButton) {
            activeButton.classList.add('active');
        }
    },

    updateQuizData() {
        let characters = [];
        
        switch(this.currentMode) {
            case 'hiragana':
                characters = [...this.characterSets.hiragana];
                break;
            case 'katakana':
                characters = [...this.characterSets.katakana];
                break;
            case 'kanji':
                characters = [...this.characterSets.kanji];
                break;
            case 'combos':
                characters = [...this.characterSets.combos];
                break;
            case 'all':
                characters = this.dedupeCharacters([
                    ...this.characterSets.hiragana,
                    ...this.characterSets.katakana,
                    ...this.characterSets.kanji,
                    ...this.characterSets.combos
                ]);
                break;
            case 'lesson':
                characters = [...this.lessonChars];
                break;
        }
        
        // Update the Quiz object with new character data
        if (window.Quiz) {
            window.Quiz.characters = characters;
            window.Quiz.romajiMap = this.currentMode === 'lesson' && this.lessonRomaji ? this.lessonRomaji : this.romajiMap;
        }
    },
    getCurrentCharacters() {
        switch(this.currentMode) {
            case 'hiragana':
                return this.characterSets.hiragana;
            case 'katakana':
                return this.characterSets.katakana;
            case 'kanji':
                return this.characterSets.kanji;
            case 'combos':
                return this.characterSets.combos;
            case 'all':
                return this.dedupeCharacters([
                    ...this.characterSets.hiragana,
                    ...this.characterSets.katakana,
                    ...this.characterSets.kanji,
                    ...this.characterSets.combos
                ]);
            default:
                return this.characterSets.hiragana;
        }
    },

    getRomaji(character) {
        return this.romajiMap[character] || character;
    }
};

// Enhanced Quiz System
const Quiz = {
    characters: [],
    romajiMap: {},
    currentChar: '',
    correctAnswer: '',
    choices: [],
    score: 0,
    totalQuestions: 0,
    streak: 0,
    difficulty: 'medium',
    lessonMode: false,
    currentLessonTitle: '',

    init() {
        // Initialize toggle system first
        QuizToggle.init();
        
        // Get initial character data
        this.characters = QuizToggle.getCurrentCharacters();
        this.romajiMap = QuizToggle.romajiMap;
        
        // Bind difficulty change
        const difficultySelect = document.getElementById('difficultySelect');
        if (difficultySelect) {
            difficultySelect.addEventListener('change', () => {
                this.difficulty = difficultySelect.value;
                this.generateQuestion();
            });
        }
        
        this.generateQuestion();
    },

    setMode(mode) {
        QuizToggle.setMode(mode);
        if (mode !== 'lesson') {
            this.lessonMode = false;
            this.updateLessonBanner();
        }
    },

    startLesson(lesson) {
        if (!lesson || typeof lesson !== 'object' || !lesson.id || !Array.isArray(lesson.chars) || lesson.chars.length === 0) {
            if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('Quiz.startLesson: invalid lesson', lesson);
            return;
        }
        // Ensure DOM is ready
        if (!document.getElementById('quizCharDisplay')) {
            if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('Quiz.startLesson: quiz section not in DOM yet');
            return;
        }
        if (typeof DEBUG !== 'undefined' && DEBUG) console.log('Quiz.startLesson called with:', lesson.title, lesson.chars);
        
        QuizToggle.setLesson(lesson);
        this.lessonMode = true;
        this.currentLessonTitle = lesson.title || 'Lesson';
        this.characters = lesson.chars.slice();
        const rm = (typeof RomajiMap !== 'undefined') ? RomajiMap : this.romajiMap;
        this.romajiMap = rm;
        this.score = 0;
        this.totalQuestions = 0;
        this.streak = 0;
        this.updateScore();
        this.updateLessonBanner();
        // Small delay to ensure DOM is stable
        setTimeout(() => {
            this.generateQuestion();
        }, 50);
    },

    clearLessonMode() {
        this.lessonMode = false;
        this.currentLessonTitle = '';
        this.updateLessonBanner();
        this.setMode('hiragana');
    },

    changeDifficulty() {
        const difficultySelect = document.getElementById('difficultySelect');
        if (difficultySelect) {
            this.difficulty = difficultySelect.value;
            this.generateQuestion();
        }
    },

    generateQuestion() {
        if (this.characters.length === 0) {
            if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('No characters available for current mode');
            return;
        }

        // Select random character
        this.currentChar = this.characters[Math.floor(Math.random() * this.characters.length)];
        this.correctAnswer = this.romajiMap[this.currentChar];

        // mark progress for exposure
        if (window.Progress && this.currentChar) {
            window.Progress.markSeen(this.currentChar);
        }
        
        // Generate choices based on difficulty
        this.generateChoices();
        
        // Update UI
        this.updateQuestionDisplay();
    },

    generateChoices() {
        const numChoices = this.getNumChoices();
        this.choices = [this.correctAnswer];
        
        // Generate wrong answers
        const allAnswers = Object.values(this.romajiMap);
        const availableWrong = allAnswers.filter(answer => answer !== this.correctAnswer);
        
        while (this.choices.length < numChoices && availableWrong.length > 0) {
            const randomAnswer = availableWrong[Math.floor(Math.random() * availableWrong.length)];
            if (!this.choices.includes(randomAnswer)) {
                this.choices.push(randomAnswer);
            }
        }
        
        // Shuffle choices
        this.choices = this.shuffleArray(this.choices);
    },

    getNumChoices() {
        switch(this.difficulty) {
            case 'easy': return 3;
            case 'medium': return 4;
            case 'hard': return 5;
            default: return 4;
        }
    },

    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },

    updateQuestionDisplay() {
        const questionElement = document.getElementById('quizQuestion');
        const choicesElement = document.getElementById('quizChoices');
        const resultElement = document.getElementById('quizResult');
        
        if (questionElement) {
            questionElement.textContent = this.currentChar;
            if (window.Progress && typeof window.Progress.applyCharStatus === 'function') {
                window.Progress.applyCharStatus(questionElement, this.currentChar);
            }
        }
        
        if (choicesElement) {
            choicesElement.innerHTML = '';
            this.choices.forEach((choice, index) => {
                const button = document.createElement('button');
                button.innerHTML = `
                    <span class="choice-index">${String.fromCharCode(65 + index)}</span>
                    <span class="choice-text">${choice}</span>
                `;
                button.onclick = () => this.selectAnswer(choice, button);
                choicesElement.appendChild(button);
            });
        }
        
        if (resultElement) {
            resultElement.textContent = '';
            resultElement.classList.remove('show');
        }
    },

    selectAnswer(selectedAnswer, buttonElement) {
        const resultElement = document.getElementById('quizResult');
        const choiceButtons = document.querySelectorAll('#quizChoices button');
        
        // Disable all buttons
        choiceButtons.forEach(btn => btn.disabled = true);
        
        if (selectedAnswer === this.correctAnswer) {
            // Correct answer
            buttonElement.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            buttonElement.style.color = 'white';
            
            this.score++;
            this.streak++;
            
            if (resultElement) {
                resultElement.textContent = `✅ Correct! ${this.currentChar} = ${this.correctAnswer}`;
                resultElement.style.color = '#4CAF50';
                resultElement.classList.add('show');
            }
            
            // Play success sound
            this.playSound('success');
            
        } else {
            // Wrong answer
            buttonElement.style.background = 'linear-gradient(135deg, #f44336, #da190b)';
            buttonElement.style.color = 'white';
            
            // Highlight correct answer
            choiceButtons.forEach(btn => {
                if (btn.querySelector('.choice-text').textContent === this.correctAnswer) {
                    btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                    btn.style.color = 'white';
                }
            });
            
            this.streak = 0;
            
            if (resultElement) {
                resultElement.textContent = `❌ Wrong! ${this.currentChar} = ${this.correctAnswer}`;
                resultElement.style.color = '#f44336';
                resultElement.classList.add('show');
            }
            
            // Play error sound
            this.playSound('error');
        }
        
        this.totalQuestions++;
        this.updateScore();
        
        // Generate next question after delay
        setTimeout(() => {
            this.generateQuestion();
        }, 2000);
    },

    updateScore() {
        const scoreElement = document.getElementById('quizScore');
        const totalElement = document.getElementById('quizTotal');
        const streakElement = document.getElementById('quizStreak');
        const progressBar = document.getElementById('quizProgressBar');
        
        if (scoreElement) scoreElement.textContent = this.score;
        if (totalElement) totalElement.textContent = this.totalQuestions;
        if (streakElement) streakElement.textContent = this.streak;
        
        if (progressBar && this.totalQuestions > 0) {
            const percentage = (this.score / this.totalQuestions) * 100;
            progressBar.style.width = `${percentage}%`;
        }
    },

    updateLessonBanner() {
        const banner = document.getElementById('quizLessonBanner');
        const text = document.getElementById('quizLessonText');
        if (!banner) return;
        if (this.lessonMode && this.currentLessonTitle) {
            banner.classList.remove('hidden');
            if (text) text.textContent = `Lesson: ${this.currentLessonTitle}`;
        } else {
            banner.classList.add('hidden');
        }
    },

    restart() {
        this.score = 0;
        this.totalQuestions = 0;
        this.streak = 0;
        this.updateScore();
        this.generateQuestion();
    },

    playSound(type) {
        // Use short UI cues; avoid character TTS to keep focus on pacing
        const map = {
            success: (Sounds && Sounds.quiz_correct) ? Sounds.quiz_correct : null,
            error: (Sounds && Sounds.quiz_wrong) ? Sounds.quiz_wrong : null
        };
        const sound = map[type];
        if (sound && typeof sound.play === 'function') {
            try { sound.play(); } catch (e) { /* ignore */ }
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quiz')) {
        Quiz.init();
    }
});

// Make Quiz available globally
window.Quiz = Quiz;
window.QuizToggle = QuizToggle;
