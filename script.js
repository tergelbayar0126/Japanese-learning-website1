// ============================================================
// 🌸 Japanese Learning Platform — script.js
// ============================================================

// ============ DATA LOADING GUARDS ============
// Ensure critical data is available and accessible
(function initializeData() {
  if (typeof window.FULL_KANA_DATA === 'undefined') {
    window.FULL_KANA_DATA = {};
  }
  
  if (typeof window.KanaData === 'undefined') {
    window.KanaData = {};
  }
  
  window.AllKanaData = { ...window.KanaData, ...window.FULL_KANA_DATA };
})();

// ============ SOUND PROXY ============
// Ensure `Sounds.*.play()` calls never crash if a sound is missing

// Ensure `Sounds.*.play()` calls never crash if a sound is missing
if (typeof Sounds === 'undefined') {
    window.Sounds = new Proxy({}, {
        get() { return { play: () => {} }; }
    });
} else {
    window.Sounds = new Proxy(Sounds, {
        get(target, prop) {
            if (prop in target) return target[prop];
            return { play: () => {} };
        }
    });
}

// ----------------- SAFE MODULE STUBS -----------------
// Provide minimal stubs so curriculum buttons navigate without throwing errors
if (!window.Flashcards) window.Flashcards = {};
if (typeof window.Flashcards.loadLesson !== 'function') {
    window.Flashcards.loadLesson = () => {};
}
if (!window.Quiz) window.Quiz = {};
if (typeof window.Quiz.startLesson !== 'function') {
    window.Quiz.startLesson = () => {};
}
if (!window.MiniGames) window.MiniGames = {};
if (typeof window.MiniGames.startStrokeChallenge !== 'function') {
    window.MiniGames.startStrokeChallenge = () => {};
}
if (typeof window.MiniGames.startQuickQuizLesson !== 'function') {
    window.MiniGames.startQuickQuizLesson = () => {};
}
if (!window.WritingPractice) window.WritingPractice = { loadCharacter: () => {} };

// ----------------- UI CONTROLLER -----------------
const UI = {
    sections: ["menu", "curriculum", "flashcards", "quiz", "game", "writing", "minigames"],
    currentSection: 'menu',
    history: [],
    maxHistory: 30,
    updateBackButton() {
        const btn = document.getElementById('navBackBtn');
        if (!btn) return;
        const hasHistory = this.history.length > 0;
        btn.disabled = !hasHistory;
        btn.classList.toggle('disabled', !hasHistory);
        btn.setAttribute('aria-disabled', (!hasHistory).toString());
    },
    showSection(name, options = {}) {
        console.log('UI.showSection called with:', name);
        const { skipHistory = false } = options;
        if (!skipHistory && this.currentSection && this.currentSection !== name) {
            this.history.push(this.currentSection);
            if (this.history.length > this.maxHistory) this.history.shift();
        }
        this.sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.classList.add("hidden");
        });
        const targetSection = document.getElementById(name);
        if (targetSection) {
            targetSection.classList.remove("hidden");
            this.currentSection = name;
            console.log('Section switched to:', name);
            
            // Trigger section-specific rendering when becoming visible
            setTimeout(() => {
                if (name === 'curriculum' && window.Progress && typeof window.Progress.renderCurriculum === 'function') {
                    window.Progress.renderCurriculum();
                    // Rebind controls after curriculum renders
                    if (typeof bindCurriculumControls === 'function') {
                        setTimeout(bindCurriculumControls, 50);
                    }
                }
                if (name === 'flashcards' && window.Flashcards) {
                    if (typeof window.Flashcards.reveal === 'function' && window.Flashcards.keys && window.Flashcards.keys.length > 0) {
                        window.Flashcards.reveal();
                    } else if (typeof window.Flashcards.refreshFromToggle === 'function') {
                        window.Flashcards.refreshFromToggle();
                    }
                }
                if (name === 'quiz' && window.Quiz && typeof window.Quiz.generateQuestion === 'function') {
                    if (!window.Quiz.currentChar) {
                        window.Quiz.generateQuestion();
                    }
                }
            }, 50);
        }
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (Sounds?.click) Sounds.click.play();
        this.updateBackButton();
    },
    goBack() {
        if (!this.history.length) {
            if (Sounds?.click) Sounds.click.play();
            return;
        }
        const prev = this.history.pop();
        this.showSection(prev, { skipHistory: true });
        this.updateBackButton();
    },
    getCurrentSection() {
        return this.currentSection;
    }
};

// Make UI globally available
window.UI = UI;

// ----------------- LESSON FALLBACK -----------------
// Provide minimal lesson data if none is loaded so curriculum buttons have content to act on.
if (!window.Lessons) {
    const sampleChars = ['あ','い','う','え','お','か','き','く','け','こ'];
    window.Lessons = [
        { id: 'intro-hira', title: 'Hiragana Intro', level: 'Beginner', estMinutes: 10, description: 'Meet your first hiragana characters.', chars: sampleChars.slice(0,5), vocab: ['あい','うえ','おか'] },
        { id: 'hira-ka', title: 'Hiragana KA line', level: 'Beginner', estMinutes: 12, description: 'Practice the KA row.', chars: sampleChars.slice(5,10), vocab: ['かき','きく','ここ'] }
    ];
}

// ----------------- LESSON ACTION HELPERS -----------------
const LessonActions = {
    toFlashcards(lesson) {
        if (!lesson || !lesson.id) {
            console.error('LessonActions.toFlashcards: Invalid lesson', lesson);
            return;
        }
        console.log('LessonActions.toFlashcards called with:', lesson.id, lesson.title);
        UI.showSection('flashcards');
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (window.Flashcards && typeof window.Flashcards.loadLesson === 'function') {
                    console.log('Loading flashcards for:', lesson.title);
                    window.Flashcards.loadLesson(lesson);
                } else {
                    console.warn('Flashcards.loadLesson not available');
                }
            }, 100);
        });
    },
    toQuiz(lesson) {
        if (!lesson || !lesson.id) {
            console.error('LessonActions.toQuiz: Invalid lesson', lesson);
            return;
        }
        console.log('LessonActions.toQuiz called with:', lesson.id, lesson.title);
        UI.showSection('quiz');
        // Ensure Quiz module is initialized and wait for DOM
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (window.Quiz?.startLesson) {
                    console.log('Starting quiz for:', lesson.title);
                    window.Quiz.startLesson(lesson);
                } else {
                    console.warn('Quiz.startLesson not available');
                }
            }, 100);
        });
    },
    toStroke(lesson) {
        if (!lesson || !lesson.id) {
            console.error('LessonActions.toStroke: Invalid lesson', lesson);
            return;
        }
        console.log('LessonActions.toStroke called with:', lesson.id, lesson.title);
        UI.showSection('minigames');
        // Wait for DOM and ensure canvas is ready
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (window.MiniGames?.startStrokeChallenge) {
                    console.log('Starting stroke challenge for:', lesson.title);
                    window.MiniGames.startStrokeChallenge(lesson);
                } else {
                    console.warn('MiniGames.startStrokeChallenge not available');
                }
            }, 100);
        });
    },
    toLightning(lesson) {
        if (!lesson || !lesson.id) {
            console.error('LessonActions.toLightning: Invalid lesson', lesson);
            return;
        }
        console.log('LessonActions.toLightning called with:', lesson.id, lesson.title);
        UI.showSection('minigames');
        // Wait for DOM to be ready
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (window.MiniGames?.startQuickQuizLesson) {
                    console.log('Starting lightning quiz for:', lesson.title);
                    window.MiniGames.startQuickQuizLesson(lesson);
                } else {
                    console.warn('MiniGames.startQuickQuizLesson not available');
                }
            }, 100);
        });
    },
    toWritingFirstChar(lesson) {
        if (!lesson || !lesson.id) {
            console.error('LessonActions.toWritingFirstChar: Invalid lesson', lesson);
            return;
        }
        console.log('LessonActions.toWritingFirstChar called with:', lesson.id, lesson.title);
        UI.showSection('writing');
        const firstChar = lesson?.chars?.[0];
        // Wait for DOM and writing module to be ready
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (firstChar && window.WritingPractice?.loadCharacter) {
                    console.log('Loading writing practice for character:', firstChar, 'from lesson:', lesson.title);
                    window.WritingPractice.loadCharacter(firstChar);
                } else {
                    console.warn('WritingPractice.loadCharacter not available or no character');
                }
            }, 100);
        });
    }
};

// Ensure curriculum initializes when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (window.Progress && typeof window.Progress.init === 'function') {
        window.Progress.init();
    }
    if (window.SRS && typeof window.SRS.init === 'function') {
        window.SRS.init();
    }
    if (window.UI && typeof window.UI.updateBackButton === 'function') {
        window.UI.updateBackButton();
    }
});

// ----------------- PROGRESS TRACKER -----------------
const Progress = {
    key: 'jpProgressV1',
    state: { lessons: {}, lastLessonId: null },
    curriculumFilter: 'all',
    curriculumSort: 'order',

    hasLessons() {
        return Array.isArray(window.Lessons) && window.Lessons.length > 0;
    },

    waitForLessons(attempt = 0) {
        if (this.hasLessons()) {
            // Rebuild merged data in case kana data loaded after boot
            try {
                window.AllKanaData = { ...(window.KanaData || {}), ...(window.FULL_KANA_DATA || {}) };
            } catch (e) { /* ignore */ }
            this.renderCurriculum();
            return true;
        }

        if (attempt >= 10) {
            const container = document.getElementById('curriculumList');
            if (container) {
                container.innerHTML = '<div class="keyboard-hint">Curriculum data not loaded. Check data.js.</div>';
            }
            return false;
        }

        setTimeout(() => this.waitForLessons(attempt + 1), 150);
        return false;
    },

    init() {
        try {
            const saved = localStorage.getItem(this.key);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Validate structure
                if (parsed && typeof parsed === 'object' && parsed.lessons && typeof parsed.lessons === 'object') {
                    this.state = parsed;
                } else {
                    // Invalid structure, reset
                    this.state = { lessons: {}, lastLessonId: null };
                    this.save();
                }
            }
        } catch (e) {
            // Corrupted data, reset
            this.state = { lessons: {}, lastLessonId: null };
            if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('Progress data corrupted, reset:', e);
        }
        this.waitForLessons();
        // Rebind controls after render
        if (typeof bindCurriculumControls === 'function') {
            setTimeout(bindCurriculumControls, 50);
        }
    },

    save() {
        try { localStorage.setItem(this.key, JSON.stringify(this.state)); } catch (e) { /* ignore quota */ }
    },
    ensureLesson(id) {
        if (!this.state.lessons[id]) this.state.lessons[id] = { seenChars: {} };
    },

    setLastLesson(id) {
        this.state.lastLessonId = id;
        this.save();
    },

    markSeen(char) {
        if (!window.Lessons || !Array.isArray(window.Lessons)) return;
        let touched = false;
        window.Lessons.forEach(lesson => {
            if (lesson.chars && lesson.chars.includes(char)) {
                this.ensureLesson(lesson.id);
                this.state.lessons[lesson.id].seenChars[char] = true;
                touched = true;
            }
        });
        if (touched) {
            this.save();
            this.renderCurriculum();
        }
    },

    isSeen(char) {
        return Object.values(this.state.lessons || {}).some(l => l.seenChars && l.seenChars[char]);
    },

    applyCharStatus(el, char) {
        if (!el) return;
        const seen = this.isSeen(char);
        el.classList.remove('char-seen', 'char-new');
        el.classList.add(seen ? 'char-seen' : 'char-new');
        el.dataset.charStatus = seen ? 'seen' : 'new';
    },

    getLessonProgress(lesson) {
        this.ensureLesson(lesson.id);
        const seen = Object.keys(this.state.lessons[lesson.id].seenChars || {}).length;
        const total = Math.max(1, (lesson.chars || []).length);
        const percent = Math.min(100, Math.round((seen / total) * 100));
        return { percent, seen, total };
    },

    getRecommendedLesson() {
        const lessons = Array.isArray(window.Lessons) ? window.Lessons : [];
        if (!lessons.length) return null;
        let best = null;
        let bestScore = Infinity;
        lessons.forEach(lesson => {
            const { percent } = this.getLessonProgress(lesson);
            // Lower score = higher priority. Favor in-progress, then new, then completed last.
            const bucket = percent >= 90 ? 3 : percent > 0 ? 0 : 1;
            const score = bucket * 100 + percent; // in-progress (bucket 0) wins, then new (1xx), then done (3xx)
            if (score < bestScore) {
                bestScore = score;
                best = lesson;
            }
        });
        return best;
    },

    getUnseenCount() {
        const lessons = Array.isArray(window.Lessons) ? window.Lessons : [];
        const pool = new Set();
        lessons.forEach(l => (l.chars || []).forEach(ch => pool.add(ch)));
        let seen = 0;
        pool.forEach(ch => { if (this.isSeen(ch)) seen++; });
        return Math.max(0, pool.size - seen);
    },

    renderShortcuts(filteredLessons) {
        const recBtn = document.getElementById('currShortcutNext');
        const recLabel = document.getElementById('currShortcutNextLabel');
        const gapLabel = document.getElementById('currShortcutGapLabel');
        const srsLabel = document.getElementById('currShortcutSrsLabel');

        const recommended = this.getRecommendedLesson();
        if (recLabel) {
            if (recommended) {
                const { percent } = this.getLessonProgress(recommended);
                recLabel.textContent = `${recommended.title || 'Lesson'} — ${percent}% done`;
                recLabel.dataset.lessonId = recommended.id;
            } else {
                recLabel.textContent = 'No lessons available';
            }
        }

        if (gapLabel) {
            const unseen = this.getUnseenCount();
            const inProgressCount = (Array.isArray(filteredLessons) ? filteredLessons : []).filter(l => {
                const { percent } = this.getLessonProgress(l);
                return percent > 0 && percent < 90;
            }).length;
            gapLabel.textContent = `${unseen} gaps • ${inProgressCount} active lessons`;
        }

        if (srsLabel) {
            let due = '--';
            if (window.SRS && typeof SRS.getDueCount === 'function') {
                due = SRS.getDueCount(SRS.getAvailableKeys());
            }
            srsLabel.textContent = typeof due === 'number' ? `${due} due now` : 'SRS not loaded';
        }

        if (recBtn && recommended) {
            recBtn.onclick = (e) => {
                e.preventDefault();
                this.setLastLesson(recommended.id);
                UI.showSection('flashcards');
                setTimeout(() => {
                    if (window.Flashcards && typeof window.Flashcards.loadLesson === 'function') {
                        window.Flashcards.loadLesson(recommended);
                    }
                }, 50);
            };
        }

        const gapBtn = document.getElementById('currShortcutGaps');
        if (gapBtn) {
            gapBtn.onclick = (e) => {
                e.preventDefault();
                const lesson = recommended || (Array.isArray(window.Lessons) ? window.Lessons[0] : null);
                if (!lesson) return;
                const unseenChar = (lesson?.chars || []).find(ch => !this.isSeen(ch));
                if (unseenChar && lesson.id) {
                    this.setLastLesson(lesson.id);
                    UI.showSection('writing');
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            if (window.WritingPractice && typeof window.WritingPractice.loadCharacter === 'function') {
                                window.WritingPractice.loadCharacter(unseenChar);
                            }
                        }, 100);
                    });
                } else {
                    this.reviewUnseen();
                }
            };
        }

        const srsBtn = document.getElementById('currShortcutSRS');
        if (srsBtn) {
            srsBtn.onclick = (e) => {
                e.preventDefault();
                if (window.SRS && typeof SRS.startSession === 'function') {
                    SRS.startSession();
                } else {
                    UI.showSection('flashcards');
                }
            };
        }
    },

    resumeLastLesson() {
        if (!window.Lessons || !Array.isArray(window.Lessons) || !window.Lessons.length) {
            alert('No lessons available yet.');
            return;
        }
        const lesson = this.state.lastLessonId ? 
            window.Lessons.find(l => l.id === this.state.lastLessonId) : null;
        const targetLesson = lesson || window.Lessons[0];
        if (!targetLesson) return;
        
        this.setLastLesson(targetLesson.id);
        UI.showSection('flashcards');
        if (window.Flashcards && typeof window.Flashcards.loadLesson === 'function') {
            window.Flashcards.loadLesson(targetLesson);
        }
    },

    reviewUnseen() {
        if (!window.Lessons || !Array.isArray(window.Lessons)) return;
        const unseen = [];
        window.Lessons.forEach(lesson => {
            (lesson.chars || []).forEach(c => {
                if (!this.isSeen(c) && !unseen.includes(c)) unseen.push(c);
            });
        });
        const pick = unseen[0];
        if (pick) {
            UI.showSection('writing');
            requestAnimationFrame(() => {
                setTimeout(() => {
                    if (window.WritingPractice && typeof window.WritingPractice.loadCharacter === 'function') {
                        window.WritingPractice.loadCharacter(pick);
                    }
                }, 100);
            });
        } else {
            alert('Nice! No unseen characters found.');
        }
    },

    renderCurriculum() {
        const container = document.getElementById('curriculumList');
        if (!container) return;

        if (!this.hasLessons()) {
            container.innerHTML = '<div class="keyboard-hint">Loading curriculum data…</div>';
            this.waitForLessons(1);
            return;
        }

        // Update overview stats
        try {
            const lessons = Array.isArray(window.Lessons) ? window.Lessons : [];
            const lessonCount = lessons.length;
            const uniqueChars = new Set();
            let vocabTotal = 0;
            lessons.forEach(l => {
                (l.chars || []).forEach(c => uniqueChars.add(c));
                if (Array.isArray(l.vocab)) vocabTotal += l.vocab.length;
            });
            const seenChars = Object.values(this.state.lessons || {}).reduce((acc, l) => acc + Object.keys(l.seenChars || {}).length, 0);
            const statMap = {
                currStatLessons: lessonCount,
                currStatChars: uniqueChars.size,
                currStatSeen: seenChars,
                currStatVocab: vocabTotal
            };
            Object.entries(statMap).forEach(([id, val]) => {
                const el = document.getElementById(id);
                if (el) el.textContent = val;
            });
        } catch (e) { /* ignore */ }

        container.innerHTML = '';

        // Continue banner if prior lesson exists
        if (this.state.lastLessonId) {
            const lesson = (window.Lessons || []).find(l => l.id === this.state.lastLessonId);
            if (lesson && lesson.title) {
                const banner = document.createElement('div');
                banner.className = 'flash-lesson-banner';
                const titleDiv = document.createElement('div');
                const strong = document.createElement('strong');
                strong.textContent = 'Continue:';
                titleDiv.appendChild(strong);
                titleDiv.appendChild(document.createTextNode(' ' + lesson.title));
                banner.appendChild(titleDiv);
                const btn = document.createElement('button');
                btn.textContent = 'Resume';
                btn.onclick = () => {
                    UI.showSection('flashcards');
                    if (window.Flashcards && typeof window.Flashcards.loadLesson === 'function') {
                        window.Flashcards.loadLesson(lesson);
                    }
                };
                banner.appendChild(btn);
                container.appendChild(banner);
            }
        }

        // Apply filter
        let filteredLessons = (window.Lessons || []).filter(lesson => {
            const safeChars = lesson.chars || [];
            const { percent } = this.getLessonProgress({ ...lesson, chars: safeChars });
            switch (this.curriculumFilter) {
                case 'in-progress': return percent > 0 && percent < 90;
                case 'not-started': return percent === 0;
                case 'completed': return percent >= 90;
                default: return true;
            }
        });

        // Apply sort
        filteredLessons = filteredLessons.slice().sort((a, b) => {
            const aChars = a.chars || [];
            const bChars = b.chars || [];
            const { percent: pa } = this.getLessonProgress({ ...a, chars: aChars });
            const { percent: pb } = this.getLessonProgress({ ...b, chars: bChars });
            switch (this.curriculumSort) {
                case 'progress-desc': return pb - pa;
                case 'progress-asc': return pa - pb;
                case 'alpha': return (a.title || '').localeCompare(b.title || '');
                default: return 0;
            }
        });

        filteredLessons.forEach((lesson, index) => {
            // Validate lesson data integrity
            if (!lesson || !lesson.id || !lesson.title) {
                console.warn('Invalid lesson at index', index, lesson);
                return;
            }
            
            const safeChars = lesson.chars || [];
            const vocabCount = Array.isArray(lesson.vocab) ? lesson.vocab.length : 0;
            const { percent, seen, total } = this.getLessonProgress({ ...lesson, chars: safeChars });

            const card = document.createElement('div');
            card.className = 'curriculum-card';
            
            // Escape strings for safety
            const escapeHtml = str => {
                const div = document.createElement('div');
                div.textContent = str;
                return div.innerHTML;
            };
            
            const levelTag = lesson.level ? `<span class="curriculum-badge level">${escapeHtml(lesson.level)}</span>` : '';
            const timeTag = lesson.estMinutes ? `<span class="curriculum-badge time">~${escapeHtml(String(lesson.estMinutes))} min</span>` : '';
            card.innerHTML = `
                            <div class="curriculum-header">
                                <div>
                                    <h3>${escapeHtml(lesson.title || 'Lesson')}</h3>
                                    <div class="curriculum-meta">
                                            ${levelTag}
                                            ${timeTag}
                                            <span class="curriculum-badge">${safeChars.length} chars</span>
                                            <span class="curriculum-badge" style="background: rgba(139,111,71,0.12);">${vocabCount} vocab</span>
                                            <span class="curriculum-badge status">${percent >= 90 ? 'Completed' : percent >= 50 ? 'In progress' : 'Start now'}</span>
                                    </div>
                                </div>
                                <button class="curriculum-primary" data-lesson="${lesson.id}" data-action="start">Start</button>
                            </div>
                            <div class="curriculum-desc">${escapeHtml(lesson.description || '')}</div>
                            <div class="curriculum-progress"><span style="width:${percent}%;"></span></div>
                            <div class="curriculum-progress-label"><span>${seen}/${total} covered</span><span>${percent}%</span></div>
                    `;

            // vocab preview
            if (vocabCount) {
                const vocabWrap = document.createElement('div');
                vocabWrap.className = 'curriculum-vocab';
                const preview = lesson.vocab.slice(0, 4).map(v => `<span class="chip">${escapeHtml(v)}</span>`).join('');
                vocabWrap.innerHTML = preview;
                card.appendChild(vocabWrap);
            }

            // sentence preview
            if (Array.isArray(lesson.sentences) && lesson.sentences.length) {
                const sentWrap = document.createElement('div');
                sentWrap.className = 'curriculum-sentences';
                const first = lesson.sentences[0];
                if (first && first.jp && first.en) {
                    sentWrap.innerHTML = `<div>${escapeHtml(first.jp)}</div><div style="color:#777;">${escapeHtml(first.en)}</div>`;
                    card.appendChild(sentWrap);
                }
            }

            const actions = document.createElement('div');
            actions.className = 'curriculum-actions';

            const flashBtn = document.createElement('button');
            flashBtn.textContent = 'Flashcards';
            flashBtn.dataset.action = 'flashcards';
            flashBtn.dataset.lesson = lesson.id;

            const quizBtn = document.createElement('button');
            quizBtn.textContent = 'Quiz';
            quizBtn.classList.add('secondary');
            quizBtn.dataset.action = 'quiz';
            quizBtn.dataset.lesson = lesson.id;

            const strokeBtn = document.createElement('button');
            strokeBtn.textContent = 'Stroke Master';
            strokeBtn.classList.add('secondary');
            strokeBtn.dataset.action = 'stroke';
            strokeBtn.dataset.lesson = lesson.id;

            const lightningBtn = document.createElement('button');
            lightningBtn.textContent = 'Lightning (Lesson)';
            lightningBtn.classList.add('secondary');
            lightningBtn.dataset.action = 'lightning';
            lightningBtn.dataset.lesson = lesson.id;

            const writingBtn = document.createElement('button');
            writingBtn.textContent = 'Writing';
            writingBtn.classList.add('secondary');
            writingBtn.dataset.action = 'writing';
            writingBtn.dataset.lesson = lesson.id;

            actions.appendChild(flashBtn);
            actions.appendChild(quizBtn);
            actions.appendChild(strokeBtn);
            actions.appendChild(lightningBtn);
            actions.appendChild(writingBtn);
            card.appendChild(actions);

            // Entire card click goes to flashcards as a default action
            card.style.cursor = 'pointer';
            card.dataset.lesson = lesson.id;
            card.dataset.action = 'flashcards';

            if (safeChars.length) {
                const row = document.createElement('div');
                row.className = 'curriculum-char-row';
                safeChars.slice(0, 28).forEach(ch => {
                    const chip = document.createElement('span');
                    chip.className = 'char-chip';
                    chip.textContent = ch;
                    if (typeof Progress.applyCharStatus === 'function') {
                        Progress.applyCharStatus(chip, ch);
                    }
                    chip.addEventListener('click', ((currentLesson, currentChar) => {
                        return (e) => {
                            e.stopPropagation();
                            Progress.setLastLesson(currentLesson.id);
                            if (window.CharacterLesson && typeof window.CharacterLesson.open === 'function') {
                                window.CharacterLesson.open(currentChar, currentLesson);
                            } else {
                                UI.showSection('writing');
                                if (window.WritingPractice && typeof window.WritingPractice.loadCharacter === 'function') {
                                    setTimeout(() => WritingPractice.loadCharacter(currentChar), 60);
                                }
                            }
                        };
                    })(lesson, ch));
                    row.appendChild(chip);
                });
                card.appendChild(row);
            }

            const unseen = safeChars.filter(ch => !this.isSeen(ch));
            if (unseen.length) {
                const gapRow = document.createElement('div');
                gapRow.className = 'curriculum-gap-row';
                const label = document.createElement('span');
                label.className = 'gap-label';
                label.textContent = 'Gaps:';
                gapRow.appendChild(label);
                unseen.slice(0, 18).forEach(ch => {
                    const chip = document.createElement('span');
                    chip.className = 'char-chip char-new';
                    chip.textContent = ch;
                    chip.title = 'Practice this in Writing';
                    chip.addEventListener('click', ((currentLesson, currentChar) => {
                        return (e) => {
                            e.stopPropagation();
                            Progress.setLastLesson(currentLesson.id);
                            UI.showSection('writing');
                            requestAnimationFrame(() => {
                                setTimeout(() => {
                                    if (window.WritingPractice && typeof window.WritingPractice.loadCharacter === 'function') {
                                        WritingPractice.loadCharacter(currentChar);
                                    }
                                }, 100);
                            });
                        };
                    })(lesson, ch));
                    gapRow.appendChild(chip);
                });
                if (unseen.length > 18) {
                    const more = document.createElement('span');
                    more.className = 'gap-more';
                    more.textContent = `+${unseen.length - 18} more`;
                    gapRow.appendChild(more);
                }
                card.appendChild(gapRow);
            }

            container.appendChild(card);
        });

        // Empty state
        if (!filteredLessons.length) {
            const empty = document.createElement('div');
            empty.className = 'keyboard-hint';
            empty.textContent = 'No lessons match this filter yet.';
            container.appendChild(empty);
        }

        // Update filter pills active state
        const pills = document.querySelectorAll('.filter-pill');
        pills.forEach(p => {
            if (p.dataset.filter === this.curriculumFilter) p.classList.add('active');
            else p.classList.remove('active');
        });

        const sortSelect = document.getElementById('currSortSelect');
        if (sortSelect) sortSelect.value = this.curriculumSort;

        this.renderShortcuts(filteredLessons);
    }
};

window.Progress = Progress;

// ----------------- SPACED REPETITION (SRS) -----------------
const SRS = {
    key: 'jpSrsV1',
    state: { cards: {} },
    intervals: [5 * 60_000, 20 * 60_000, 24 * 60 * 60_000, 2 * 24 * 60 * 60_000, 4 * 24 * 60 * 60_000, 7 * 24 * 60 * 60_000, 14 * 24 * 60 * 60_000, 30 * 24 * 60 * 60_000],
    sessionActive: false,
    sessionQueue: [],

    init() {
        this.load();
        this.bindUI();
        this.renderSummary();
    },

    load() {
        try {
            const saved = localStorage.getItem(this.key);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed && typeof parsed === 'object' && parsed.cards) {
                    this.state = parsed;
                }
            }
        } catch (e) {
            this.state = { cards: {} };
        }
    },

    save() {
        try { localStorage.setItem(this.key, JSON.stringify(this.state)); } catch (e) { /* ignore quota */ }
    },

    ensureCard(char) {
        if (!char) return null;
        if (!this.state.cards[char]) {
            this.state.cards[char] = { stage: 0, due: Date.now(), reviews: 0 };
        }
        return this.state.cards[char];
    },

    humanize(ms) {
        if (!ms || ms <= 0) return 'now';
        const minutes = Math.round(ms / 60000);
        if (minutes < 60) return `${minutes}m`;
        const hours = Math.round(ms / 3600000);
        if (hours < 48) return `${hours}h`;
        const days = Math.round(ms / 86400000);
        return `${days}d`;
    },

    getAvailableKeys() {
        if (window.Flashcards && window.Flashcards.keys && Array.isArray(window.Flashcards.keys) && window.Flashcards.keys.length) {
            return window.Flashcards.keys.slice();
        }
        if (window.FlashcardToggle && typeof window.FlashcardToggle.getCurrentData === 'function') {
            const data = window.FlashcardToggle.getCurrentData() || [];
            return data.map(d => (typeof d === 'string' ? d : d.char)).filter(Boolean);
        }
        if (Array.isArray(window.Lessons)) {
            const pool = new Set();
            window.Lessons.forEach(l => (l.chars || []).forEach(ch => pool.add(ch)));
            return Array.from(pool);
        }
        return [];
    },

    getDueList(pool = null) {
        const now = Date.now();
        const allowed = pool ? new Set(pool) : null;
        return Object.entries(this.state.cards)
            .filter(([char, card]) => card && card.due && card.due <= now && (!allowed || allowed.has(char)))
            .map(([char]) => char);
    },

    getDueCount(pool = null) {
        return this.getDueList(pool).length;
    },

    getNewCount(pool = null) {
        const keys = pool || this.getAvailableKeys();
        if (!Array.isArray(keys)) return 0;
        const seen = new Set(Object.keys(this.state.cards || {}));
        return keys.filter(k => !seen.has(k)).length;
    },

    renderSummary() {
        const pool = this.getAvailableKeys();
        const due = this.getDueCount(pool);
        const fresh = this.getNewCount(pool);
        const dueEl = document.getElementById('srsDueCount');
        const newEl = document.getElementById('srsNewCount');
        if (dueEl) dueEl.textContent = `${due} due`;
        if (newEl) newEl.textContent = `${fresh} new`;
    },

    setStatus(msg) {
        const statusEl = document.getElementById('srsStatus');
        if (statusEl) statusEl.textContent = msg;
    },

    bindUI() {
        const startBtn = document.getElementById('srsReviewBtn');
        if (startBtn) startBtn.addEventListener('click', () => this.startSession());
        const addBtn = document.getElementById('srsAddCurrentBtn');
        if (addBtn) addBtn.addEventListener('click', () => this.addCurrent());
        document.querySelectorAll('#srsPanel [data-grade]').forEach(btn => {
            btn.addEventListener('click', () => this.grade(btn.dataset.grade));
        });
    },

    touch(char) {
        if (!char) return;
        const card = this.state.cards[char];
        if (!card) {
            this.setStatus(`${char}: not in SRS yet.`);
            return;
        }
        const delta = card.due - Date.now();
        const info = delta <= 0 ? 'due now' : `due in ${this.humanize(delta)}`;
        this.setStatus(`${char}: ${info}`);
    },

    startSession() {
        const pool = this.getAvailableKeys();
        if (!pool.length) {
            this.setStatus('Load a deck first.');
            return;
        }
        const due = this.getDueList(pool);
        const freshPool = pool.filter(ch => !(this.state.cards || {})[ch]);
        const queue = [...due];
        while (queue.length < 12 && freshPool.length) {
            queue.push(freshPool.shift());
        }
        const unique = Array.from(new Set(queue)).slice(0, 32);
        if (!unique.length) {
            this.setStatus('Nothing due right now.');
            return;
        }

        if (!window.Flashcards || typeof Flashcards.loadLesson !== 'function') {
            this.setStatus('Flashcards not ready.');
            return;
        }

        Flashcards.loadLesson({
            id: 'srs-session',
            title: 'SRS Review',
            description: 'Due and new cards',
            chars: unique
        });
        this.sessionActive = true;
        this.sessionQueue = unique;
        this.setStatus(`Session loaded (${unique.length})`);
        this.renderSummary();
        if (window.UI && typeof UI.showSection === 'function') {
            UI.showSection('flashcards');
        }
    },

    addCurrent() {
        if (!window.Flashcards || !window.Flashcards.keys || !Array.isArray(window.Flashcards.keys) || window.Flashcards.keys.length === 0) {
            this.setStatus('Open a card first.');
            return;
        }
        const char = window.Flashcards.keys[window.Flashcards.index];
        if (!char) {
            this.setStatus('No card selected.');
            return;
        }
        const card = this.ensureCard(char);
        card.due = Date.now();
        this.state.cards[char] = card;
        if (window.Progress) Progress.markSeen(char);
        this.save();
        this.renderSummary();
        this.touch(char);
    },

    grade(rating = 'good') {
        if (!window.Flashcards || !window.Flashcards.keys || !Array.isArray(window.Flashcards.keys) || window.Flashcards.keys.length === 0) {
            this.setStatus('Open a card first.');
            return;
        }
        const char = window.Flashcards.keys[window.Flashcards.index];
        if (!char) return;
        const now = Date.now();
        const card = this.ensureCard(char);
        const stage = card.stage || 0;
        const intervals = this.intervals;
        let nextStage = stage;
        let intervalMs = intervals[Math.min(stage, intervals.length - 1)];

        switch (rating) {
            case 'again':
                nextStage = Math.max(0, stage - 1);
                intervalMs = intervals[0];
                break;
            case 'hard':
                nextStage = Math.max(1, stage);
                intervalMs = intervals[Math.min(nextStage, intervals.length - 1)] * 0.7;
                break;
            case 'easy':
                nextStage = Math.min(stage + 2, intervals.length - 1);
                intervalMs = intervals[Math.min(nextStage, intervals.length - 1)] * 1.2;
                break;
            case 'good':
            default:
                nextStage = Math.min(stage + 1, intervals.length - 1);
                intervalMs = intervals[Math.min(nextStage, intervals.length - 1)];
                break;
        }

        card.stage = nextStage;
        card.due = now + Math.round(intervalMs);
        card.lastRating = rating;
        card.lastReviewed = now;
        card.reviews = (card.reviews || 0) + 1;
        this.state.cards[char] = card;

        this.save();
        this.renderSummary();
        this.touch(char);
        if (window.Progress) Progress.markSeen(char);
        this.advance(rating);
    },

    advance(rating) {
        if (!window.Flashcards || typeof window.Flashcards.next !== 'function') return;

        if (this.sessionActive && window.Flashcards.keys && Array.isArray(window.Flashcards.keys)) {
            const char = window.Flashcards.keys[window.Flashcards.index];
            if (rating === 'again' && char) {
                this.sessionQueue.splice(window.Flashcards.index + 1, 0, char);
                window.Flashcards.keys = this.sessionQueue.slice();
            }
            if (window.Flashcards.index >= window.Flashcards.keys.length - 1) {
                this.sessionActive = false;
                this.setStatus('Session complete.');
                if (window.Flashcards.lessonOverride && typeof window.Flashcards.clearLessonOverride === 'function') {
                    window.Flashcards.clearLessonOverride();
                }
                return;
            }
        }

        window.Flashcards.next();
    }
};

window.SRS = SRS;

// Curriculum filter controls
function bindCurriculumControls() {
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            const val = pill.dataset.filter;
            if (!val) return;
            Progress.curriculumFilter = val;
            Progress.renderCurriculum();
        });
    });

    const sortSelect = document.getElementById('currSortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            Progress.curriculumSort = sortSelect.value || 'order';
            Progress.renderCurriculum();
        });
    }

    const resumeBtn = document.getElementById('currResumeBtn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            if (window.Progress && typeof window.Progress.resumeLastLesson === 'function') {
                window.Progress.resumeLastLesson();
            }
        });
    }

    const unseenBtn = document.getElementById('currUnseenBtn');
    if (unseenBtn) {
        unseenBtn.addEventListener('click', () => {
            if (window.SRS && typeof window.SRS.startSession === 'function') {
                window.SRS.startSession();
            } else if (window.Progress && typeof window.Progress.reviewUnseen === 'function') {
                window.Progress.reviewUnseen();
            }
        });
    }

    // Delegated handlers for curriculum cards and buttons
    const list = document.getElementById('curriculumList');
    if (list && !list._delegated) {
        list._delegated = true;
        list.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            const card = e.target.closest('.curriculum-card');
            const target = btn || card;
            if (!target) return;

            const lessonId = target.dataset.lesson;
            const action = target.dataset.action || (btn ? 'start' : 'flashcards');
            if (!lessonId) return;

            const lesson = (window.Lessons || []).find(l => l.id === lessonId);
            if (!lesson) {
                console.warn('No lesson found for id', lessonId);
                return;
            }

            // prevent double-handling when button inside card
            if (btn) e.stopPropagation();

            Progress.setLastLesson(lesson.id);

            switch (action) {
                case 'start':
                case 'flashcards':
                    LessonActions.toFlashcards(lesson);
                    break;
                case 'quiz':
                    LessonActions.toQuiz(lesson);
                    break;
                case 'stroke':
                    LessonActions.toStroke(lesson);
                    break;
                case 'lightning':
                    LessonActions.toLightning(lesson);
                    break;
                case 'writing':
                    LessonActions.toWritingFirstChar(lesson);
                    break;
                default:
                    LessonActions.toFlashcards(lesson);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', bindCurriculumControls);

// Make hero menu buttons switch sections reliably
document.addEventListener('DOMContentLoaded', () => {
    const heroMenuButtons = document.querySelectorAll('.menu-grid .menu-button');
    heroMenuButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href') || '';
            const target = (btn.dataset.target || (href.startsWith('#') ? href.slice(1) : '')).trim();
            if (!target) return;
            e.preventDefault();

            UI.showSection(target);

            // Ensure minigame hub is visible when jumping in from the hero tiles
            if (target === 'minigames' && window.MiniGames && typeof window.MiniGames.backToHub === 'function') {
                window.MiniGames.backToHub();
            }

            // Keep the hash in sync without double-triggering hashchange listeners
            try {
                history.replaceState(null, '', `#${target}`);
            } catch (err) {
                location.hash = `#${target}`;
            }
        });
    });
});

// ----------------- DRAW ENGINE -----------------
const DrawEngine = {
    canvas: null,
    ctx: null,
    drawing: false,
    points: [],
    strokes: [],
    onFinish: null,
    eraserMode: false,
    eraserRadius: 15,

    init(id, callback) {
        this.canvas = document.getElementById(id);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext("2d");
        this.onFinish = callback;
        this.eraserMode = false;
        // Use pointer events so mouse, pen, and touch all work; block touch scrolling while drawing
        this.canvas.style.touchAction = 'none';
        this.canvas.onpointerdown = e => { e.preventDefault(); this.start(e); };
        this.canvas.onpointermove = e => { if (this.drawing) e.preventDefault(); this.move(e); };
        this.canvas.onpointerup = () => this.end();
        this.canvas.onpointerleave = () => this.end();
    },

    toggleEraser() {
        this.eraserMode = !this.eraserMode;
        this.canvas.style.cursor = this.eraserMode ? 'not-allowed' : 'crosshair';
        return this.eraserMode;
    },

    start(e) { 
        this.drawing = true; 
        this.points = []; 
        if (!this.eraserMode) {
            this.add(e);
        } else {
            this.erase(e);
        }
    },

    move(e) { 
        if(!this.drawing) return; 
        if (this.eraserMode) {
            this.erase(e);
        } else {
            this.add(e); 
        }
        this.render(); 
    },

    end() {
        if(!this.drawing) return;
        this.drawing = false;
        if(!this.eraserMode && this.points.length > 3) {
            const fullStroke = { 
                start: this.points[0], 
                end: this.points[this.points.length-1],
                path: [...this.points]
            };
            this.strokes.push(fullStroke);
            if(this.onFinish) this.onFinish(fullStroke);
            
            // Integrate with FeedbackSystem for real-time updates
            if (typeof FeedbackSystem !== 'undefined' && typeof FeedbackSystem.onStrokeComplete === 'function') {
                FeedbackSystem.onStrokeComplete();
            }
        }
        this.points = [];
        this.render();
    },

    add(e) {
        const r = this.canvas.getBoundingClientRect();
        this.points.push({ x: e.clientX - r.left, y: e.clientY - r.top });
    },

    erase(e) {
        const r = this.canvas.getBoundingClientRect();
        const mx = e.clientX - r.left;
        const my = e.clientY - r.top;
        this.strokes = this.strokes.filter(s => {
            if (!s.path || s.path.length === 0) return true;
            for (let pt of s.path) {
                const dist = Math.sqrt((pt.x - mx) ** 2 + (pt.y - my) ** 2);
                if (dist < this.eraserRadius) return false;
            }
            return true;
        });
    },

    undoLast() {
        if (this.strokes.length > 0) {
            this.strokes.pop();
            this.render();
        }
    },

    render() {
        this.ctx.clearRect(0,0,350,350);
        // past strokes - render full paths
        this.ctx.strokeStyle = "#7d6b5e";
        this.ctx.lineWidth = 8;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        for(let s of this.strokes){
            if (s.path && s.path.length > 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(s.path[0].x, s.path[0].y);
                for(let i = 1; i < s.path.length; i++) {
                    this.ctx.lineTo(s.path[i].x, s.path[i].y);
                }
                this.ctx.stroke();
            } else {
                this.ctx.beginPath();
                this.ctx.moveTo(s.start.x, s.start.y);
                this.ctx.lineTo(s.end.x, s.end.y);
                this.ctx.stroke();
            }
        }
        // current stroke being drawn
        if (!this.eraserMode) {
            this.ctx.strokeStyle = "#5d4e6d";
            this.ctx.lineWidth = 6;
            this.ctx.lineCap = "round";
            this.ctx.lineJoin = "round";
            if (this.points.length > 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.points[0].x, this.points[0].y);
                for(let i = 1; i < this.points.length; i++){
                    this.ctx.lineTo(this.points[i].x, this.points[i].y);
                }
                this.ctx.stroke();
            }
        }
    },

    reset() { this.strokes = []; this.eraserMode = false; if(this.ctx) this.ctx.clearRect(0,0,350,350); }
};

// ----------------- STROKE COMPARISON -----------------
const StrokeData = {
    // Normalize a vector
    normalize(x, y) {
        const mag = Math.sqrt(x*x + y*y);
        return mag > 0 ? { x: x/mag, y: y/mag } : { x: 0, y: 0 };
    },
    
    // Calculate angle between two vectors in radians
    angleBetween(v1, v2) {
        const dot = v1.x * v2.x + v1.y * v2.y;
        const clamp = Math.max(-1, Math.min(1, dot));
        return Math.acos(clamp);
    },
    
    // Get relative position (0-1 range for canvas)
    normalizePosition(pos) {
        return { x: pos.x / 350, y: pos.y / 350 };
    },
    
    compare(user, template) {
        // Ultra-forgiving stroke comparison for human drawings
        const dx = user.end.x - user.start.x;
        const dy = user.end.y - user.start.y;
        const tx = template.end.x - template.start.x;
        const ty = template.end.y - template.start.y;
        
        const mag1 = Math.sqrt(dx*dx + dy*dy);
        const mag2 = Math.sqrt(tx*tx + ty*ty);
        
        if(mag1 < 3) return false;
        if(mag2 < 3) return true;
        
        const userDir = this.normalize(dx, dy);
        const templateDir = this.normalize(tx, ty);
        const angle = this.angleBetween(userDir, templateDir);
        const directionScore = Math.max(0, 1 - (angle / (Math.PI * 0.7)));
        
        const lengthRatio = Math.min(mag1, mag2) / Math.max(mag1, mag2);
        const lengthScore = Math.pow(lengthRatio, 0.3);
        
        const userStartNorm = this.normalizePosition(user.start);
        const templateStartNorm = this.normalizePosition(template.start);
        const startDistNorm = Math.sqrt(
            (userStartNorm.x - templateStartNorm.x) ** 2 + 
            (userStartNorm.y - templateStartNorm.y) ** 2
        );
        const positionScore = Math.max(0, 1 - (startDistNorm / 0.5));
        
        const userEndNorm = this.normalizePosition(user.end);
        const templateEndNorm = this.normalizePosition(template.end);
        const endDistNorm = Math.sqrt(
            (userEndNorm.x - templateEndNorm.x) ** 2 + 
            (userEndNorm.y - templateEndNorm.y) ** 2
        );
        const endScore = Math.max(0, 1 - (endDistNorm / 0.5));
        
        let pathScore = 0.5;
        if (user.path && user.path.length > 4) {
            const samplePoints = [0.25, 0.5, 0.75];
            let totalPathScore = 0;
            
            samplePoints.forEach(fraction => {
                const userIdx = Math.floor(user.path.length * fraction);
                const userPoint = user.path[userIdx] || user.end;
                const userPointNorm = this.normalizePosition(userPoint);
                
                const templatePoint = {
                    x: template.start.x + (template.end.x - template.start.x) * fraction,
                    y: template.start.y + (template.end.y - template.start.y) * fraction
                };
                const templatePointNorm = this.normalizePosition(templatePoint);
                
                const dist = Math.sqrt(
                    (userPointNorm.x - templatePointNorm.x) ** 2 +
                    (userPointNorm.y - templatePointNorm.y) ** 2
                );
                totalPathScore += Math.max(0, 1 - (dist / 0.4));
            });
            
            pathScore = totalPathScore / samplePoints.length;
        }
        
        const userCenterX = (user.start.x + user.end.x) / 2;
        const userCenterY = (user.start.y + user.end.y) / 2;
        const templateCenterX = (template.start.x + template.end.x) / 2;
        const templateCenterY = (template.start.y + template.end.y) / 2;
        const centerDist = Math.sqrt(
            ((userCenterX - templateCenterX) / 350) ** 2 +
            ((userCenterY - templateCenterY) / 350) ** 2
        );
        const shapeScore = Math.max(0, 1 - (centerDist / 0.4));
        
        const totalScore = (
            directionScore * 0.30 +
            lengthScore * 0.10 +
            positionScore * 0.15 +
            endScore * 0.15 +
            pathScore * 0.20 +
            shapeScore * 0.10
        );
        
        return totalScore > 0.35;
    }
};

// ----------------- ROMAJI MAP -----------------
const RomajiMap = {
   "あ": "a", "い": "i", "う": "u", "え": "e", "お": "o",
    "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko",
    "が": "ga", "ぎ": "gi", "ぐ": "gu", "げ": "ge", "ご": "go",
    "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so",
    "ざ": "za", "じ": "ji", "ず": "zu", "ぜ": "ze", "ぞ": "zo",
    "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to",
    "だ": "da", "ぢ": "di", "づ": "du", "で": "de", "ど": "do",
    "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no",
    "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho",
    "ば": "ba", "び": "bi", "ぶ": "bu", "べ": "be", "ぼ": "bo",
    "ぱ": "pa", "ぴ": "pi", "ぷ": "pu", "ぺ": "pe", "ぽ": "po",
    "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo",
    "や": "ya", "ゆ": "yu", "よ": "yo",
    "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro",
    "わ": "wa", "を": "wo", "ん": "n",

    // Katakana Basic
    "ア": "a", "イ": "i", "ウ": "u", "エ": "e", "オ": "o",
    "カ": "ka", "キ": "ki", "ク": "ku", "ケ": "ke", "コ": "ko",
    "ガ": "ga", "ギ": "gi", "グ": "gu", "ゲ": "ge", "ゴ": "go",
    "サ": "sa", "シ": "shi", "ス": "su", "セ": "se", "ソ": "so",
    "ザ": "za", "ジ": "ji", "ズ": "zu", "ゼ": "ze", "ゾ": "zo",
    "タ": "ta", "チ": "chi", "ツ": "tsu", "テ": "te", "ト": "to",
    "ダ": "da", "ヂ": "ji", "ヅ": "zu", "デ": "de", "ド": "do",
    "ナ": "na", "ニ": "ni", "ヌ": "nu", "ネ": "ne", "ノ": "no",
    "ハ": "ha", "ヒ": "hi", "フ": "fu", "ヘ": "he", "ホ": "ho",
    "バ": "ba", "ビ": "bi", "ブ": "bu", "ベ": "be", "ボ": "bo",
    "パ": "pa", "ピ": "pi", "プ": "pu", "ペ": "pe", "ポ": "po",
    "マ": "ma", "ミ": "mi", "ム": "mu", "メ": "me", "モ": "mo",
    "ヤ": "ya", "ユ": "yu", "ヨ": "yo",
    "ラ": "ra", "リ": "ri", "ル": "ru", "レ": "re", "ロ": "ro",
    "ワ": "wa", "ヲ": "wo", "ン": "n",

    // Combination Characters (Hiragana)
    "きゃ": "kya", "きゅ": "kyu", "きょ": "kyo",
    "しゃ": "sha", "しゅ": "shu", "しょ": "sho",
    "ちゃ": "cha", "ちゅ": "chu", "ちょ": "cho",
    "にゃ": "nya", "にゅ": "nyu", "にょ": "nyo",
    "ひゃ": "hya", "ひゅ": "hyu", "ひょ": "hyo",
    "みゃ": "mya", "みゅ": "myu", "みょ": "myo",
    "りゃ": "rya", "りゅ": "ryu", "りょ": "ryo",
    "ぎゃ": "gya", "ぎゅ": "gyu", "ぎょ": "gyo",
    "じゃ": "ja", "じゅ": "ju", "じょ": "jo",
    "びゃ": "bya", "びゅ": "byu", "びょ": "byo",
    "ぴゃ": "pya", "ぴゅ": "pyu", "ぴょ": "pyo",

    // Combination Characters (Katakana)
    "キャ": "kya", "キュ": "kyu", "キョ": "kyo",
    "シャ": "sha", "シュ": "shu", "ショ": "sho",
    "チャ": "cha", "チュ": "chu", "チョ": "cho",
    "ニャ": "nya", "ニュ": "nyu", "ニョ": "nyo",
    "ヒャ": "hya", "ヒュ": "hyu", "ヒョ": "hyo",
    "ミャ": "mya", "ミュ": "myu", "ミョ": "myo",
    "リャ": "rya", "リュ": "ryu", "リョ": "ryo",
    "ギャ": "gya", "ギュ": "gyu", "ギョ": "gyo",
    "ジャ": "ja", "ジュ": "ju", "ジョ": "jo",
    "ビャ": "bya", "ビュ": "byu", "ビョ": "byo",
    "ピャ": "pya", "ピュ": "pyu", "ピョ": "pyo",

    // Special Characters
    "ー": "-", "ッ": "tsu", "っ": "tsu",
    "ァ": "a", "ィ": "i", "ゥ": "u", "ェ": "e", "ォ": "o",
    "ャ": "ya", "ュ": "yu", "ョ": "yo",
    "ぁ": "a", "ぃ": "i", "ぅ": "u", "ぇ": "e", "ぉ": "o",
    "ゃ": "ya", "ゅ": "yu", "ょ": "yo",

    // Extended Katakana
    "ヴ": "vu", "ファ": "fa", "フィ": "fi", "フェ": "fe", "フォ": "fo",
    "ティ": "ti", "ディ": "di", "デュ": "du", "トゥ": "tu",
    "ウィ": "wi", "ウェ": "we", "ウォ": "wo", "チェ": "che", "シェ": "she", "ジェ": "je",

    // Beginner Kanji
    "日": "nichi", "月": "getsu", "火": "ka", "水": "sui", "木": "moku", "金": "kin", "土": "do",
    "本": "hon", "人": "hito", "口": "kuchi", "山": "yama", "川": "kawa", "田": "ta", "中": "naka",
    "大": "dai", "小": "shou", "上": "ue", "下": "shita", "左": "hidari", "右": "migi", "名": "na",
    "女": "onna", "男": "otoko", "子": "ko", "目": "me", "耳": "mimi",
    "手": "te", "心": "kokoro", "学": "gaku", "校": "kou", "生": "sei", "先": "sen", "年": "nen", "時": "ji",
    "車": "kuruma", "電": "den", "天": "ten", "気": "ki", "王": "ou", "玉": "tama"
};

// ----------------- QUIZ HELPERS -----------------
function getRomajiVowel(r) {
    const m = r.match(/[aeiou]([^aeiou]*)?$/);
    return m ? m[0].replace(/[^aeiou]/g, '') : '';
}

function getRomajiOnset(r) {
    const idx = r.search(/[aeiou]/);
    return idx === -1 ? r : r.slice(0, idx);
}

function selectRomajiDistractors(correctChar, currentSet, count = 3) {
    const correctRom = RomajiMap[correctChar] || correctChar;
    // build candidate list from currentSet (prefer), fallback to all romaji
    let candidates = (currentSet && currentSet.length) ? currentSet.slice() : Object.keys(RomajiMap);
    // remove correct
    candidates = candidates.filter(c => c !== correctChar);

    // map to romaji and compute similarity score
    const correctOnset = getRomajiOnset(correctRom);
    const correctVowel = getRomajiVowel(correctRom);

    const scored = candidates.map(ch => {
        const rom = RomajiMap[ch] || ch;
        const onset = getRomajiOnset(rom);
        const vowel = getRomajiVowel(rom);
        let score = 0;
        if (onset === correctOnset) score += 3; // same consonant cluster
        if (vowel === correctVowel) score += 2;   // same vowel
        if (rom.length === correctRom.length) score += 1; // similar length
        return { ch, rom, score };
    });

    // sort by score desc, then shuffle within same score
    scored.sort((a,b) => b.score - a.score || (Math.random() > 0.5 ? 1 : -1));

    const chosen = [];
    for (let i=0;i<scored.length && chosen.length < count;i++) {
        chosen.push(scored[i].rom);
    }

    // if not enough, fill from global romaji pool
    const pool = Object.values(RomajiMap).filter(r => r !== correctRom && !chosen.includes(r));
    while (chosen.length < count && pool.length) {
        const idx = Math.floor(Math.random() * pool.length);
        chosen.push(pool.splice(idx,1)[0]);
    }

    return chosen;
}

// ----------------- FLASHCARDS -----------------
const Flashcards = {
    keys: [],
    index: 0,
    reviewed: 0,
    streak: 0,
    romaji: {},
    showRomaji: false,
    showMeaning: false,
    reviews: {},
    isPlayingAll: false,
    playTimeouts: [],
    lessonOverride: false,
    currentLessonId: null,
    // comprehensive example database: kana -> example words (word in kana, reading romaji, meaning)
    examples: {
        "あ": [{word: "あさ", reading: "asa", meaning: "morning"}, {word: "あめ", reading: "ame", meaning: "rain"}, {word: "あかい", reading: "akai", meaning: "red"}],
        "い": [{word: "いぬ", reading: "inu", meaning: "dog"}, {word: "いえ", reading: "ie", meaning: "house"}, {word: "いろ", reading: "iro", meaning: "color"}],
        "う": [{word: "うみ", reading: "umi", meaning: "sea"}, {word: "うた", reading: "uta", meaning: "song"}, {word: "うどん", reading: "udon", meaning: "noodles"}],
        "え": [{word: "えい", reading: "ei", meaning: "movie"}, {word: "えん", reading: "en", meaning: "yen"}],
        "お": [{word: "おいしい", reading: "oishii", meaning: "delicious"}, {word: "おにぎり", reading: "onigiri", meaning: "rice ball"}],
        "か": [{word: "かわ", reading: "kawa", meaning: "river"}, {word: "かさ", reading: "kasa", meaning: "umbrella"}, {word: "かいしゃ", reading: "kaisha", meaning: "company"}],
        "き": [{word: "きれい", reading: "kirei", meaning: "beautiful"}, {word: "きっぷ", reading: "kippu", meaning: "ticket"}],
        "く": [{word: "くすり", reading: "kusuri", meaning: "medicine"}, {word: "くろい", reading: "kuroi", meaning: "black"}],
        "け": [{word: "けがき", reading: "kegaki", meaning: "scribble"}],
        "こ": [{word: "こんにちは", reading: "konnichiha", meaning: "hello"}, {word: "こども", reading: "kodomo", meaning: "child"}],
        "が": [{word: "がっこう", reading: "gakkou", meaning: "school"}, {word: "がぞう", reading: "gazou", meaning: "image"}],
        "ぎ": [{word: "ぎゅうにゅう", reading: "gyuunyuu", meaning: "milk"}],
        "ぐ": [{word: "ぐり", reading: "guri", meaning: "chestnut"}],
        "さ": [{word: "さくら", reading: "sakura", meaning: "cherry blossom"}, {word: "さけ", reading: "sake", meaning: "alcohol"}],
        "し": [{word: "しごと", reading: "shigoto", meaning: "work"}, {word: "しんかんせん", reading: "shinkansen", meaning: "bullet train"}],
        "す": [{word: "すし", reading: "sushi", meaning: "sushi"}, {word: "すうがく", reading: "suugaku", meaning: "math"}],
        "せ": [{word: "せんせい", reading: "sensei", meaning: "teacher"}, {word: "せかい", reading: "sekai", meaning: "world"}],
        "そ": [{word: "そら", reading: "sora", meaning: "sky"}, {word: "そば", reading: "soba", meaning: "buckwheat noodles"}],
        "た": [{word: "たべる", reading: "taberu", meaning: "to eat"}, {word: "たいよう", reading: "taiyou", meaning: "sun"}],
        "ち": [{word: "ちいさい", reading: "chiisai", meaning: "small"}, {word: "ちず", reading: "chizu", meaning: "map"}],
        "つ": [{word: "つき", reading: "tsuki", meaning: "moon"}, {word: "つめたい", reading: "tsumetai", meaning: "cold"}],
        "て": [{word: "てくどう", reading: "tekudou", meaning: "technology"}],
        "と": [{word: "とり", reading: "tori", meaning: "bird"}, {word: "ときどき", reading: "tokidoki", meaning: "sometimes"}],
        "だ": [{word: "だいがく", reading: "daigaku", meaning: "university"}],
        "ぢ": [{word: "ぢしん", reading: "jishin", meaning: "earthquake"}],
        "づ": [{word: "つづく", reading: "tsuzuku", meaning: "continue"}],
        "で": [{word: "です", reading: "desu", meaning: "is"}],
        "ど": [{word: "どこ", reading: "doko", meaning: "where"}, {word: "どうも", reading: "doumo", meaning: "thank you"}],
        "な": [{word: "なまえ", reading: "namae", meaning: "name"}, {word: "なつ", reading: "natsu", meaning: "summer"}],
        "に": [{word: "にほん", reading: "nihon", meaning: "Japan"}, {word: "にわ", reading: "niwa", meaning: "garden"}],
        "ぬ": [{word: "ぬいぐるみ", reading: "nuigurumi", meaning: "stuffed animal"}],
        "ね": [{word: "ねこ", reading: "neko", meaning: "cat"}, {word: "ねむい", reading: "nemui", meaning: "sleepy"}],
        "の": [{word: "のはら", reading: "nohara", meaning: "field"}],
        "は": [{word: "はな", reading: "hana", meaning: "flower"}, {word: "はし", reading: "hashi", meaning: "bridge"}],
        "ひ": [{word: "ひこうき", reading: "hikouki", meaning: "airplane"}, {word: "ひ", reading: "hi", meaning: "fire"}],
        "ふ": [{word: "ふゆ", reading: "fuyu", meaning: "winter"}],
        "へ": [{word: "へそ", reading: "hezo", meaning: "belly button"}],
        "ほ": [{word: "ほん", reading: "hon", meaning: "book"}, {word: "ほほえみ", reading: "hohoemi", meaning: "smile"}],
        "ば": [{word: "ばなな", reading: "banana", meaning: "banana"}],
        "び": [{word: "びょういん", reading: "byouin", meaning: "hospital"}],
        "ぶ": [{word: "ぶた", reading: "buta", meaning: "pig"}],
        "べ": [{word: "べんきょう", reading: "benkyou", meaning: "study"}],
        "ぼ": [{word: "ぼうし", reading: "boushi", meaning: "hat"}],
        "ぱ": [{word: "ぱんだ", reading: "panda", meaning: "panda"}],
        "ぴ": [{word: "ぴあの", reading: "piano", meaning: "piano"}],
        "ぷ": [{word: "ぷーる", reading: "puuru", meaning: "pool"}],
        "ぺ": [{word: "ぺん", reading: "pen", meaning: "pen"}],
        "ぽ": [{word: "ぽけっと", reading: "poketto", meaning: "pocket"}],
        "ま": [{word: "まち", reading: "machi", meaning: "town"}, {word: "まっすぐ", reading: "massugu", meaning: "straight"}],
        "み": [{word: "みず", reading: "mizu", meaning: "water"}, {word: "みせ", reading: "mise", meaning: "shop"}],
        "む": [{word: "むすこ", reading: "musuko", meaning: "son"}],
        "め": [{word: "めがね", reading: "megane", meaning: "glasses"}, {word: "め", reading: "me", meaning: "eye"}],
        "も": [{word: "もち", reading: "mochi", meaning: "rice cake"}],
        "や": [{word: "やま", reading: "yama", meaning: "mountain"}, {word: "やさい", reading: "yasai", meaning: "vegetable"}],
        "ゆ": [{word: "ゆき", reading: "yuki", meaning: "snow"}],
        "よ": [{word: "よむ", reading: "yomu", meaning: "to read"}],
        "ら": [{word: "りんご", reading: "ringo", meaning: "apple"}],
        "り": [{word: "りんご", reading: "ringo", meaning: "apple"}],
        "る": [{word: "るびー", reading: "rubii", meaning: "ruby"}],
        "れ": [{word: "れいぞうこ", reading: "reizouko", meaning: "refrigerator"}],
        "ろ": [{word: "ろうそく", reading: "rousoku", meaning: "candle"}],
        "わ": [{word: "わたし", reading: "watashi", meaning: "I"}, {word: "わに", reading: "wani", meaning: "crocodile"}],
        "を": [{word: "を", reading: "wo", meaning: "object particle"}],
        "ん": [{word: "ほん", reading: "hon", meaning: "book"}, {word: "さん", reading: "san", meaning: "honorific"}]
    },
    // cache of examples auto-derived from lesson vocab
    lessonExampleMap: null,

    init() {
        // Use the centralized RomajiMap
        this.romaji = RomajiMap;
        this.lessonExampleMap = null;
    },

    hydrateLessonExamples(maxPerChar = 4) {
        if (this.lessonExampleMap) return this.lessonExampleMap;
        const map = {};
        const lessons = Array.isArray(window.Lessons) ? window.Lessons : [];
        lessons.forEach(lesson => {
            const words = Array.isArray(lesson.vocab) ? lesson.vocab : [];
            const lessonChars = Array.isArray(lesson.chars) ? lesson.chars : [];
            words.forEach(word => {
                if (!word) return;
                const targets = new Set(word.split(''));
                lessonChars.forEach(ch => { if (typeof ch === 'string' && word.includes(ch)) targets.add(ch); });
                targets.forEach(ch => {
                    if (!map[ch]) map[ch] = [];
                    const exists = map[ch].some(e => e.word === word);
                    if (!exists && map[ch].length < maxPerChar) {
                        map[ch].push({ word, reading: '', meaning: '' });
                    }
                });
            });
        });
        this.lessonExampleMap = map;
        return map;
    },

    ensureExamples(keys) {
        const lessonMap = this.hydrateLessonExamples();
        // Ensure every key has examples, preferring lesson-derived vocab to fill gaps
        keys.forEach(k => {
            const base = this.examples[k] || [];
            const fromLessons = lessonMap[k] || [];
            const merged = [...base];

            fromLessons.forEach(ex => {
                if (merged.length >= 4) return;
                if (!merged.some(m => m.word === ex.word)) {
                    merged.push(ex);
                }
            });

            if (!merged.length) {
                merged.push({ word: k, reading: this.romaji[k] || '', meaning: '' });
            }
            this.examples[k] = merged;
        });
    },

    updateUI() {
        const total = this.keys.length;
        const percent = total > 0 ? (this.index / total) * 100 : 0;
        
        const progressText = document.getElementById("cardProgressText");
        if (progressText) progressText.textContent = `Card ${this.index + 1}/${total}`;
        
        const progressBar = document.getElementById("cardProgressBar");
        if (progressBar) progressBar.style.width = percent + "%";
        
        const reviewedEl = document.getElementById("cardReviewed");
        if (reviewedEl) reviewedEl.textContent = this.reviewed;
        
        const streakEl = document.getElementById("cardStreak");
        if (streakEl) streakEl.textContent = this.streak;
    },

    reveal() {
        const container = document.getElementById("flashDisplay");
        if (!container) return;
        
        const charDisplay = container.querySelector('.flashcard-character');
        if (!charDisplay) return;
        
        // Check if we have keys loaded
        if (!this.keys || this.keys.length === 0) {
            if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('No flashcard data loaded');
            return;
        }
        
        const kana = this.keys[this.index];
        if (!kana) return;
        
        // Display the character immediately
        charDisplay.textContent = kana;
        if (window.Progress && typeof window.Progress.applyCharStatus === 'function') {
            window.Progress.applyCharStatus(charDisplay, kana);
        }
        if (window.SRS && typeof window.SRS.touch === 'function') {
            window.SRS.touch(kana);
            window.SRS.renderSummary();
        }
        
        // populate romaji
        const rom = this.romaji[kana] || "";
        const romajiEl = document.getElementById("flashRomaji");
        if (romajiEl) romajiEl.textContent = rom;

        // meaning - get from FlashcardToggle1 data if available
        const meaningEl = document.getElementById("flashMeaning");
        if (meaningEl) {
            if (this.showMeaning) {
                let meaning = '';
                if (window.FlashcardToggle) {
                    const data = FlashcardToggle.getCurrentData() || [];
                    const charData = data.find(d => d.char === kana);
                    meaning = charData ? charData.meaning : '';
                }
                if (!meaning) {
                    const ex = this.examples[kana] && this.examples[kana][0];
                    meaning = ex ? ex.meaning : "";
                }
                meaningEl.textContent = meaning;
                meaningEl.classList.add('visible');
            } else {
                meaningEl.textContent = "";
                meaningEl.classList.remove('visible');
            }
        }

        // populate examples list
        const list = document.getElementById("flashExamples");
        if (list) {
            list.innerHTML = "";
            const exs = this.examples[kana] || [];
            if (exs.length === 0) {
                // Show a placeholder if no examples
                const li = document.createElement('li');
                li.className = 'no-examples';
                li.textContent = 'No example words available for this character.';
                li.style.opacity = '0.6';
                li.style.fontStyle = 'italic';
                list.appendChild(li);
            }
            exs.forEach(e => {
                const li = document.createElement('li');
                const wordDiv = document.createElement('div');
                const wordLabel = document.createElement('div');
                wordLabel.className = 'word';
                wordLabel.textContent = e.word;
                const readingDiv = document.createElement('div');
                readingDiv.className = 'reading';
                readingDiv.textContent = e.reading;
                const meaningDiv = document.createElement('div');
                meaningDiv.className = 'meaning';
                meaningDiv.textContent = e.meaning;
                wordDiv.appendChild(wordLabel);
                wordDiv.appendChild(readingDiv);
                wordDiv.appendChild(meaningDiv);
                
                const btn = document.createElement('button');
                btn.className = 'example-speak-btn';
                btn.setAttribute('aria-label', 'Play pronunciation');
                btn.textContent = '🔊';
                btn.addEventListener('click', () => {
                    if (window.Flashcards && typeof window.Flashcards.playExampleWord === 'function') {
                        window.Flashcards.playExampleWord(e.word);
                    }
                });
                
                li.appendChild(wordDiv);
                li.appendChild(btn);
                list.appendChild(li);
            });
        }

        // update spaced repetition state
        if (!this.reviews[kana]) {
            this.reviews[kana] = { reviewed: 0, difficulty: 'new', lastReview: Date.now() };
        }
        this.reviews[kana].reviewed++;
        this.reviews[kana].lastReview = Date.now();

        if (window.Progress) {
            window.Progress.markSeen(kana);
        }

        this.reviewed++;
        this.streak++;
        this.updateUI();
    },

    toggleRomaji() {
        Sounds.character_complete.play();
        this.showRomaji = !this.showRomaji;
        const kana = this.keys[this.index];
        const rom = this.romaji[kana] || "";
        const romajiEl = document.getElementById("flashRomaji");
        if (romajiEl) romajiEl.textContent = this.showRomaji ? rom : "";
    },

    toggleMeaning() {
        this.showMeaning = !this.showMeaning;
        const btn = document.getElementById('flashToggleMeaning');
        if (btn) btn.textContent = this.showMeaning ? 'Hide Meaning' : 'Show Meaning';
        
        // Update meaning display without full reveal
        const kana = this.keys[this.index];
        const meaningEl = document.getElementById("flashMeaning");
        if (meaningEl && kana) {
            if (this.showMeaning) {
                let meaning = '';
                if (window.FlashcardToggle) {
                    const data = FlashcardToggle.getCurrentData() || [];
                    const charData = data.find(d => d.char === kana);
                    meaning = charData ? charData.meaning : '';
                }
                if (!meaning) {
                    const ex = this.examples[kana] && this.examples[kana][0];
                    meaning = ex ? ex.meaning : "";
                }
                meaningEl.textContent = meaning;
                meaningEl.classList.add('visible');
            } else {
                meaningEl.textContent = "";
                meaningEl.classList.remove('visible');
            }
        }
    },

    playPronunciation() {
        const kana = this.keys[this.index];
        if (!kana) return;
        
        // Visual feedback
        const btn = document.getElementById('playCharBtn');
        if (btn) {
            btn.classList.add('playing');
            setTimeout(() => btn.classList.remove('playing'), 600);
        }
        
        // Play audio
        this.playNativeAudio(kana);
        
        // Play sound effect
        if (Sounds && Sounds.click) Sounds.click.play();
    },

    playExampleWord(word) {
        // Use native Japanese text-to-speech for example words
        this.playNativeAudio(word);
    },

    playAllExamples() {
        const kana = this.keys[this.index];
        const exs = this.examples[kana] || [];
        
        if (exs.length === 0) return;
        
        // Stop if already playing and clear all pending timeouts
        if (this.isPlayingAll) {
            this.stopAllExamples();
            return;
        }
        
        // Clear any remaining timeouts from previous runs
        if (this.playTimeouts && Array.isArray(this.playTimeouts)) {
            this.playTimeouts.forEach(t => clearTimeout(t));
            this.playTimeouts = [];
        }
        
        this.isPlayingAll = true;
        const btn = document.getElementById('playAllBtn');
        if (btn) {
            btn.classList.add('playing');
            const label = btn.querySelector('.audio-label');
            if (label) label.textContent = 'Stop';
        }
        
        // Play each example with a delay
        let delay = 0;
        const timeouts = [];
        
        exs.forEach((e, index) => {
            const timeout = setTimeout(() => {
                if (!this.isPlayingAll) return;
                
                try {
                    this.playExampleWord(e.word);
                    
                    // Highlight current example
                    const listItems = document.querySelectorAll('#flashExamples li');
                    listItems.forEach(li => li.classList.remove('playing'));
                    if (listItems[index]) {
                        listItems[index].classList.add('playing');
                    }
                } catch (err) {
                    if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('playAllExamples error', err);
                }
                
                // Reset button when done
                if (index === exs.length - 1) {
                    setTimeout(() => this.stopAllExamples(), 1000);
                }
            }, delay);
            
            timeouts.push(timeout);
            delay += 1400;
        });
        
        this.playTimeouts = timeouts;
    },
    
    stopAllExamples() {
        this.isPlayingAll = false;
        
        // Clear all timeouts
        if (this.playTimeouts) {
            this.playTimeouts.forEach(t => clearTimeout(t));
            this.playTimeouts = [];
        }
        
        // Reset button
        const btn = document.getElementById('playAllBtn');
        if (btn) {
            btn.classList.remove('playing');
            const label = btn.querySelector('.audio-label');
            if (label) label.textContent = 'All Examples';
        }
        
        // Remove highlights
        document.querySelectorAll('#flashExamples li').forEach(li => li.classList.remove('playing'));
        
        // Stop any ongoing speech
        try {
            speechSynthesis.cancel();
        } catch (e) {}
    },

    // Called by FlashcardToggle when mode/data changes
    refreshFromToggle() {
        if (this.lessonOverride) return; // do not override lesson-specific view
        if (!window.FlashcardToggle) return;
        const data = FlashcardToggle.getCurrentData() || [];
        // data is array of objects {char, romaji, meaning, examples: [string array]}
        this.keys = data.map(d => (typeof d === 'string' ? d : (d.char || d.kana || ''))).filter(Boolean);
        
        // Convert FlashcardToggle1 examples format to Flashcards format
        data.forEach(d => {
            if (d.char && d.examples && Array.isArray(d.examples)) {
                // Parse example strings like "愛 (ai) - love" into objects
                this.examples[d.char] = d.examples.map(exStr => {
                    const match = exStr.match(/^(.+?)\s*\((.+?)\)\s*-\s*(.+)$/);
                    if (match) {
                        return {
                            word: match[1].trim(),
                            reading: match[2].trim(),
                            meaning: match[3].trim()
                        };
                    }
                    return { word: exStr, reading: '', meaning: '' };
                });
            }
            // Also update romaji if provided
            if (d.char && d.romaji) {
                this.romaji[d.char] = d.romaji;
            }
        });
        
        this.index = 0;
        this.ensureExamples(this.keys);
        this.updateUI();
        if (window.SRS && typeof window.SRS.renderSummary === 'function') {
            window.SRS.renderSummary();
        }
        if (this.keys.length) this.reveal();
    },

    loadLesson(lesson) {
        if (!lesson || !Array.isArray(lesson.chars)) return;
        console.log('[Flashcards] loadLesson:', lesson.id, lesson.title, 'chars:', lesson.chars.join(' '));
        this.lessonOverride = true;
        this.currentLessonId = lesson.id || null;
        if (!this.romaji || Object.keys(this.romaji).length === 0) {
            this.romaji = RomajiMap || {};
        }

        const data = (lesson.chars || []).map(ch => {
            // attempt to reuse FlashcardToggle datasets for examples/meaning
            let meaning = '';
            let examples = [];
            if (window.FlashcardToggle && window.FlashcardToggle.scriptData) {
                const sets = window.FlashcardToggle.scriptData;
                const entry = (sets.hiragana || [])
                    .concat(sets.katakana || [])
                    .concat(sets.kanji || [])
                    .concat(sets.combos || [])
                    .find(d => d.char === ch);
                if (entry) {
                    meaning = entry.meaning || '';
                    if (Array.isArray(entry.examples)) examples = entry.examples.slice();
                }
            }
            if (!meaning && lesson.description) meaning = lesson.description;
            return { char: ch, romaji: this.romaji[ch] || RomajiMap[ch] || '', meaning, examples };
        });

        this.keys = data.map(d => d.char);
        this.index = 0;
        this.cardFlipped = false; // Reset card state
        this.cardExamples = null; // Reset examples state
        this.ensureExamples(this.keys);
        this.updateLessonBanner(lesson.title || 'Lesson');
        this.updateUI();
        if (window.SRS && typeof window.SRS.renderSummary === 'function') {
            window.SRS.renderSummary();
        }
        if (this.keys.length) this.reveal();
    },

    clearLessonOverride() {
        this.lessonOverride = false;
        this.currentLessonId = null;
        this.updateLessonBanner();
        if (window.FlashcardToggle) {
            this.refreshFromToggle();
        }
    },

    updateLessonBanner(title) {
        const banner = document.getElementById('flashLessonBanner');
        const text = document.getElementById('flashLessonText');
        if (!banner) return;
        if (this.lessonOverride && title) {
            banner.classList.remove('hidden');
            if (text) text.textContent = `Lesson: ${title}`;
        } else {
            banner.classList.add('hidden');
        }
    },

    playNativeAudio(text, onEnd) {
        if (!text) return;
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.65;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Add callbacks
        if (onEnd) utterance.onend = onEnd;
        
        utterance.onerror = (e) => {
            if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('Speech synthesis error:', e);
            if (onEnd) onEnd();
        };
        
        try {
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            
            // Wait a bit before starting new speech (helps with some browsers)
            setTimeout(() => {
                // Get available voices and select Japanese if available
                const voices = speechSynthesis.getVoices();
                const japaneseVoice = voices.find(v => v.lang.includes('ja'));
                if (japaneseVoice) {
                    utterance.voice = japaneseVoice;
                }
                
                speechSynthesis.speak(utterance);
            }, 100);
        } catch (e) {
            if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('TTS unavailable:', e);
            if (onEnd) onEnd();
        }
    },

    prev() {
        Sounds.stroke_start.play();
        Sounds.click.play();
        this.index = (this.index - 1 + this.keys.length) % this.keys.length;
        this.reveal();
    },

    next() {
        Sounds.click.play();
        this.index = (this.index + 1) % this.keys.length;
        this.reveal();
    }
};

// Make Flashcards globally available
window.Flashcards = Flashcards;

// ----------------------------------
// Quick character spotlight modal
// ----------------------------------
const CharacterLesson = {
    overlay: null,
    hints: {
        // Kanji basics set
        '日': 'sun/day', '月': 'moon/month', '火': 'fire', '水': 'water', '木': 'tree/wood', '金': 'gold/money', '土': 'earth/soil',
        '本': 'book/origin', '人': 'person', '口': 'mouth', '山': 'mountain', '川': 'river', '田': 'rice field', '中': 'middle',
        '大': 'big', '小': 'small', '上': 'up/above', '下': 'down/below', '左': 'left', '右': 'right', '名': 'name', '女': 'female',
        '男': 'male', '子': 'child', '目': 'eye', '耳': 'ear',
        '手': 'hand', '心': 'heart', '学': 'study', '校': 'school', '生': 'life/student', '先': 'ahead/previous', '年': 'year',
        '時': 'time', '車': 'car', '電': 'electricity', '天': 'heaven/sky', '気': 'spirit/air', '王': 'king', '玉': 'jade/ball'
    },

    ensureOverlay() {
        if (this.overlay) return this.overlay;

        const overlay = document.createElement('div');
        overlay.id = 'charLessonOverlay';
        overlay.className = 'char-lesson-overlay hidden';
        overlay.innerHTML = `
            <div class="char-lesson-card" role="dialog" aria-modal="true" aria-label="Character focus">
                <button class="char-lesson-close" aria-label="Close">×</button>
                <div class="char-lesson-head">
                    <div class="char-lesson-char" aria-hidden="true"></div>
                    <div class="char-lesson-meta">
                        <div class="char-lesson-romaji"></div>
                        <div class="char-lesson-meaning"></div>
                        <div class="char-lesson-lesson"></div>
                    </div>
                </div>
                <div class="char-lesson-examples"></div>
                <div class="char-lesson-actions">
                    <button data-action="flash">Open Flashcard</button>
                    <button data-action="write" class="secondary">Practice Writing</button>
                    <button data-action="audio" class="ghost">Play Audio</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.hide();
        });

        const closeBtn = overlay.querySelector('.char-lesson-close');
        if (closeBtn) closeBtn.addEventListener('click', () => this.hide());

        this.overlay = overlay;
        return overlay;
    },

    normalizeExamples(raw, fallbackRomaji) {
        if (!raw) return [];
        return raw
            .map(ex => {
                if (typeof ex === 'string') {
                    const m = ex.match(/^(.+?)\s*\((.+?)\)\s*-\s*(.+)$/);
                    if (m) return { word: m[1].trim(), reading: m[2].trim(), meaning: m[3].trim() };
                    return { word: ex, reading: fallbackRomaji || '', meaning: '' };
                }
                if (ex && typeof ex === 'object') {
                    if (ex.word) return ex;
                    if (ex.char) return { word: ex.char, reading: ex.romaji || fallbackRomaji || '', meaning: ex.meaning || '' };
                }
                return null;
            })
            .filter(Boolean)
            .slice(0, 4);
    },

    lookup(char, lesson) {
        const scriptData = (window.FlashcardToggle && window.FlashcardToggle.scriptData) || {};
        const pools = ['hiragana', 'katakana', 'kanji', 'combos'];
        let entry = null;
        pools.some(key => {
            const found = (scriptData[key] || []).find(d => d.char === char);
            if (found) { entry = found; return true; }
            return false;
        });

        const romaji = (entry && entry.romaji) || RomajiMap[char] || '';
        const meaning = (entry && entry.meaning) || this.hints[char] || '';
        let examples = this.normalizeExamples(entry && entry.examples, romaji);

        if (!examples.length && window.Flashcards && Flashcards.examples[char]) {
            examples = (Flashcards.examples[char] || []).slice(0, 3);
        }

        if (!examples.length && window.Flashcards && typeof Flashcards.hydrateLessonExamples === 'function') {
            const map = Flashcards.hydrateLessonExamples();
            if (map && map[char]) examples = map[char].slice(0, 3);
        }

        if (!examples.length && lesson && Array.isArray(lesson.vocab)) {
            examples = lesson.vocab.slice(0, 3).map(word => ({ word, reading: '', meaning: '' }));
        }

        return { romaji, meaning, examples };
    },

    open(char, lesson) {
        const overlay = this.ensureOverlay();
        const { romaji, meaning, examples } = this.lookup(char, lesson);

        const charEl = overlay.querySelector('.char-lesson-char');
        const romajiEl = overlay.querySelector('.char-lesson-romaji');
        const meaningEl = overlay.querySelector('.char-lesson-meaning');
        const lessonEl = overlay.querySelector('.char-lesson-lesson');
        const examplesEl = overlay.querySelector('.char-lesson-examples');

        if (charEl) charEl.textContent = char;
        if (romajiEl) romajiEl.textContent = romaji ? `Romaji: ${romaji}` : 'Romaji unavailable';
        if (meaningEl) meaningEl.textContent = meaning || 'Meaning coming soon';
        if (lessonEl) lessonEl.textContent = lesson ? `From: ${lesson.title || 'Lesson'}` : 'Standalone character';

        if (examplesEl) {
            examplesEl.innerHTML = ''; // Clear first
            if (examples.length) {
                examples.forEach(ex => {
                    const exDiv = document.createElement('div');
                    exDiv.className = 'char-lesson-example';
                    
                    const word = document.createElement('div');
                    word.className = 'word';
                    word.textContent = ex.word || '';
                    
                    const reading = document.createElement('div');
                    reading.className = 'reading';
                    reading.textContent = ex.reading || '';
                    
                    const meaning = document.createElement('div');
                    meaning.className = 'meaning';
                    meaning.textContent = ex.meaning || '';
                    
                    exDiv.appendChild(word);
                    exDiv.appendChild(reading);
                    exDiv.appendChild(meaning);
                    examplesEl.appendChild(exDiv);
                });
            } else {
                const empty = document.createElement('div');
                empty.className = 'char-lesson-example empty';
                empty.textContent = 'Examples coming soon.';
                examplesEl.appendChild(empty);
            }
        }

        overlay.classList.remove('hidden');

        const flashBtn = overlay.querySelector('[data-action="flash"]');
        if (flashBtn) flashBtn.onclick = () => {
            if (lesson && lesson.id && window.Progress) Progress.setLastLesson(lesson.id);
            UI.showSection('flashcards');
            if (window.Flashcards && typeof window.Flashcards.loadLesson === 'function') {
                Flashcards.loadLesson({
                    id: `char-${char}`,
                    title: `${char} spotlight`,
                    description: meaning || 'Character focus',
                    chars: [char]
                });
            }
            this.hide();
        };

        const writeBtn = overlay.querySelector('[data-action="write"]');
        if (writeBtn) writeBtn.onclick = () => {
            if (lesson && lesson.id && window.Progress) Progress.setLastLesson(lesson.id);
            UI.showSection('writing');
            if (window.WritingPractice && typeof window.WritingPractice.loadCharacter === 'function') {
                setTimeout(() => WritingPractice.loadCharacter(char), 40);
            }
            if (window.Progress) Progress.markSeen(char);
            this.hide();
        };

        const audioBtn = overlay.querySelector('[data-action="audio"]');
        if (audioBtn) audioBtn.onclick = () => {
            if (window.Flashcards && typeof window.Flashcards.playNativeAudio === 'function') {
                Flashcards.playNativeAudio(char);
            }
        };
    },

    hide() {
        if (this.overlay) this.overlay.classList.add('hidden');
    }
};

window.CharacterLesson = CharacterLesson;

// ----------------------------------
// Quiz Mode Controller (SAFE VERSION)
// ----------------------------------
const QuizController = {

    currentMode: "hiragana",
    questions: [],
    currentIndex: 0,
    score: 0,

    init() {
        this.bindButtons();
        this.setMode("hiragana");
    },

    bindButtons() {

        const map = {
            quizHiraganaBtn: "hiragana",
            quizKatakanaBtn: "katakana",
            quizCombosBtn: "combos",
            quizAllBtn: "all"
        };

        for (const id in map) {

            const btn = document.getElementById(id);

            if (!btn) continue;  // prevents null errors

            btn.addEventListener("click", () => {
                this.setMode(map[id]);
                this.scrollToQuiz();
            });
        }
    },

    setMode(mode) {
        this.currentMode = mode;
        this.loadQuestions();
        this.highlightActiveButton();
        this.restartQuiz();
    },

    loadQuestions() {

        if (!window.FlashcardToggle) return;

        const s = FlashcardToggle.scriptData;

        switch (this.currentMode) {
            case "hiragana":
                this.questions = [...s.hiragana];
                break;
            case "katakana":
                this.questions = [...s.katakana];
                break;
            case "combos":
                this.questions = [...s.combos];
                break;
            case "all":
                this.questions = [
                    ...s.hiragana,
                    ...s.katakana,
                    ...s.combos
                ];
                break;
        }

        this.questions = this.shuffle(this.questions);
    },

    restartQuiz() {
        this.currentIndex = 0;
        this.score = 0;
        this.showQuestion();
        this.updateProgress();
    },

    showQuestion() {

        if (!this.questions.length) return;

        const q = this.questions[this.currentIndex];
        const display = document.getElementById("quizCharacter");
        const choices = document.querySelectorAll(".quiz-choice");

        if (!display || choices.length < 4) return;

        display.textContent = q.char;
        if (window.Progress && typeof window.Progress.applyCharStatus === 'function') {
            window.Progress.applyCharStatus(display, q.char);
        }

        const options = this.generateAnswers(q);

        choices.forEach((btn, i) => {
            btn.textContent = options[i];
            btn.onclick = () =>
                this.checkAnswer(options[i], q.romaji);
        });
    },

    checkAnswer(choice, correct) {

        if (choice === correct)
            this.score++;

        this.currentIndex++;

        if (this.currentIndex >= this.questions.length) {
            alert(`Quiz Complete!\nScore: ${this.score}/${this.questions.length}`);
            this.restartQuiz();
            return;
        }

        this.showQuestion();
        this.updateProgress();
    },

    generateAnswers(correct) {

        const answers = [correct.romaji];

        while (answers.length < 4) {

            const r =
                this.questions[Math.floor(Math.random() * this.questions.length)];

            if (!answers.includes(r.romaji))
                answers.push(r.romaji);
        }

        return this.shuffle(answers);
    },

    updateProgress() {

        const el = document.getElementById("quizProgress");

        if (el)
            el.textContent =
                `Question ${this.currentIndex + 1}/${this.questions.length}`;
    },

    shuffle(arr) {
        return [...arr].sort(() => Math.random() - 0.5);
    },

    highlightActiveButton() {

        const buttons = [
            "quizHiraganaBtn",
            "quizKatakanaBtn",
            "quizCombosBtn",
            "quizAllBtn"
        ];

        buttons.forEach(id => {

            const btn = document.getElementById(id);
            if (!btn) return;

            btn.classList.toggle(
                "active",
                btn.dataset.mode === this.currentMode
            );
        });
    },

    scrollToQuiz() {

        const el = document.getElementById("quiz");

        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }
};


// ---------------------------
// Init after DOM loads
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("quiz")) {
        QuizController.init();
    }

    if (window.Progress) {
        try { window.Progress.init(); } catch (e) { if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('Progress init failed', e); }
    }

    // If FlashcardToggle provided data before script.js loaded, refresh Flashcards now
    if (window.Flashcards && window.FlashcardToggle && typeof window.Flashcards.refreshFromToggle === 'function') {
        try { window.Flashcards.refreshFromToggle(); } catch (e) { if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('Error refreshing Flashcards from toggle:', e); }
    }

});

// If DOM is already ready when this script runs, run the same inits immediately
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    try {
        if (document.getElementById("quiz")) {
            QuizController.init();
        }
    } catch (e) { if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('QuizController immediate init failed', e); }

    try {
        if (window.Progress && typeof window.Progress.init === 'function') {
            window.Progress.init();
            // Force render after init
            if (typeof window.Progress.renderCurriculum === 'function') {
                window.Progress.renderCurriculum();
            }
        }
    } catch (e) { if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('Progress immediate init failed', e); }

    try {
        if (window.Flashcards && window.FlashcardToggle && typeof window.Flashcards.refreshFromToggle === 'function') {
            window.Flashcards.refreshFromToggle();
        }
    } catch (e) { if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('Flashcards immediate refresh failed', e); }
}


// Global access if needed
window.QuizController = QuizController;

// Note: Quiz object is defined in quiz-toggle.js

// ----------------- KANA FOCUS SPRINT GAME -----------------
const Practice = {
    strokes: [],
    index: 0,
    currentChar: null,

    loadCharacter(char) {
        const fallbackChar = char || (typeof KanaData !== 'undefined' ? Object.keys(KanaData)[0] : '?');
        const data = (typeof KanaData !== 'undefined' && KanaData[fallbackChar]) ? KanaData[fallbackChar] : [];
        this.currentChar = fallbackChar;
        this.strokes = Array.isArray(data) ? data : [];
        this.index = 0;
        const target = document.getElementById('gameTargetText');
        if (target) {
            // Update character text
            target.textContent = `Draw: ${fallbackChar}`;
            
            // Only apply Edo animation if animations are enabled
            if (typeof animationEnabled !== 'undefined' && animationEnabled) {
                // Trigger Edo animation on character change
                target.style.animation = 'none';
                target.offsetHeight; // Force reflow to restart animation
                target.style.animation = 'edoBrushEntry 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both';
            }
        }
        Game.drawGuidelines(fallbackChar);
    },

    checkStroke(stroke) {
        if (!this.strokes.length) return false;
        const template = this.strokes[this.index] || this.strokes[0];
        return StrokeData.compare(stroke, template);
    },

    advanceStroke() {
        if (!this.strokes.length) return true;
        this.index = (this.index + 1) % this.strokes.length;
        return this.index === 0;
    },
    
    evaluateCharacter() {
        if (!this.strokes.length) return { correct: true, strokesMatched: 0, accuracy: 100 };
        const userStrokes = Array.isArray(DrawEngine?.strokes) ? DrawEngine.strokes : [];
        const expectedStrokes = this.strokes;
        
        if (userStrokes.length === 0) {
            return { correct: false, strokesMatched: 0, matchedCorrectly: 0, expected: expectedStrokes.length, accuracy: 0 };
        }
        
        // === FUZZY MATCHING: Find best matches for each expected stroke ===
        let matchedCount = 0;
        const usedUser = new Set();
        const usedTemplate = new Set();
        
        // First pass: find perfect matches
        for (let i = 0; i < userStrokes.length; i++) {
            for (let j = 0; j < expectedStrokes.length; j++) {
                if (usedUser.has(i) || usedTemplate.has(j)) continue;
                if (StrokeData.compare(userStrokes[i], expectedStrokes[j])) {
                    matchedCount++;
                    usedUser.add(i);
                    usedTemplate.add(j);
                    break;
                }
            }
        }
        
        // === PARTIAL CREDIT SYSTEM ===
        // Give credit even if stroke count is off but general shape is there
        let partialCredit = 0;
        
        // If user drew more strokes than needed, don't penalize too much
        if (userStrokes.length > expectedStrokes.length) {
            partialCredit = Math.min(0.2, (userStrokes.length - expectedStrokes.length) * 0.1);
        }
        
        // If user drew fewer but got the main strokes, give bonus
        if (userStrokes.length < expectedStrokes.length && matchedCount === userStrokes.length) {
            partialCredit = 0.15;
        }
        
        // Base accuracy on matched strokes
        const baseAccuracy = expectedStrokes.length > 0 ? 
            (matchedCount / expectedStrokes.length) * 100 : 0;
        
        // Apply partial credit bonus
        const accuracy = Math.min(100, Math.round(baseAccuracy + (partialCredit * 100)));
        
        // === FLEXIBLE ACCEPTANCE CRITERIA ===
        // Accept if:
        // 1. Accuracy >= 35% (very lenient)
        // 2. OR stroke count within 2 AND accuracy >= 25%
        // 3. OR got more than half the strokes right
        const strokeCountClose = Math.abs(userStrokes.length - expectedStrokes.length) <= 2;
        const correct = accuracy >= 35 || 
                       (strokeCountClose && accuracy >= 25) ||
                       (matchedCount >= Math.ceil(expectedStrokes.length / 2));
        
        return { 
            correct,
            strokesMatched: userStrokes.length,
            matchedCorrectly: matchedCount,
            expected: expectedStrokes.length,
            accuracy
        };
    }
};

const Game = {
    timeLeft: 60,
    maxTime: 60,
    timer: null,
    correctChars: 0,
    totalAttempts: 0,
    pool: [],
    selectedLesson: 'all',
    isRunning: false,
    startTime: 0,

    init() {
        this.populateLessonSelector();
        const lessonSelect = document.getElementById('gameLessonSelect');
        if (lessonSelect) {
            lessonSelect.addEventListener('change', () => {
                this.selectedLesson = lessonSelect.value;
                this.buildPool();
            });
        }

        this.buildPool();
    },

    populateLessonSelector() {
        const select = document.getElementById('gameLessonSelect');
        if (!select || typeof Lessons === 'undefined') return;
        select.innerHTML = '<option value="all">All Characters</option>';
        Lessons.forEach(lesson => {
            const opt = document.createElement('option');
            opt.value = lesson.id;
            opt.textContent = lesson.title;
            select.appendChild(opt);
        });
    },

    buildPool() {
        this.pool = [];
        if (this.selectedLesson === 'all') {
            this.pool = Object.keys(typeof KanaData !== 'undefined' ? KanaData : {});
        } else if (typeof Lessons !== 'undefined') {
            const lesson = Lessons.find(l => l.id === this.selectedLesson);
            if (lesson && lesson.chars) {
                this.pool = lesson.chars.filter(c => KanaData[c]);
            }
        }
        if (!this.pool.length) {
            this.pool = Object.keys(typeof KanaData !== 'undefined' ? KanaData : {});
        }
    },

    setTarget(specificChar = null) {
        if (!this.pool.length) return;
        const next = specificChar || this.pool[Math.floor(Math.random() * this.pool.length)];
        Practice.loadCharacter(next);
        DrawEngine.reset();
        
        // Load character into feedback system
        if (typeof FeedbackSystem !== 'undefined' && typeof FeedbackSystem.loadCharacter === 'function') {
            FeedbackSystem.loadCharacter(next);
        }
    },
    
    openCharPicker() {
        const modal = document.getElementById('charPickerModal');
        if (!modal) return;
        
        modal.classList.remove('hidden');
        this.populateCharPicker('hiragana');
    },
    
    closeCharPicker() {
        const modal = document.getElementById('charPickerModal');
        if (modal) modal.classList.add('hidden');
    },
    
    showCharTab(type) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        this.populateCharPicker(type);
    },
    
    populateCharPicker(type) {
        const grid = document.getElementById('charPickerGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        // Get characters based on type
        let chars = [];
        if (type === 'all') {
            chars = Object.keys(KanaData || {});
        } else if (type === 'hiragana') {
            const hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ';
            chars = hiragana.split('').filter(c => KanaData[c]);
        } else if (type === 'katakana') {
            const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ';
            chars = katakana.split('').filter(c => KanaData[c]);
        }
        
        // Create character buttons
        chars.forEach(char => {
            const btn = document.createElement('button');
            btn.className = 'char-btn';
            btn.textContent = char;
            btn.onclick = () => {
                this.selectCharacter(char);
            };
            grid.appendChild(btn);
        });
    },
    
    selectCharacter(char) {
        this.closeCharPicker();
        this.setTarget(char);
        
        // Show feedback
        this.showFeedback(`Selected: ${char}`, true);
    },
    
    randomCharacter() {
        this.setTarget();
        this.showFeedback('Random character selected!', true);
    },

    drawGuidelines(char) {
        if (!this.guideCtx || !this.showGuidelines) {
            if (this.guideCtx) this.guideCtx.clearRect(0, 0, 350, 350);
            return;
        }
        this.guideCtx.clearRect(0, 0, 350, 350);
        
        // Try to use authentic curved paths first (FULL_KANA_DATA)
        let strokes = [];
        if (typeof window.FULL_KANA_DATA !== 'undefined' && window.FULL_KANA_DATA[char]) {
            strokes = window.FULL_KANA_DATA[char].strokes || [];
        }
        if (result.correct) {
            this.correctChars++;
            const emoji = result.accuracy >= 80 ? '🎯' : result.accuracy >= 60 ? '✓' : '✓';
            this.showFeedback(`${emoji} Correct! ${result.accuracy}% (#${this.correctChars})`, true);
            Sounds.success.play();
            this.setTarget();
        } else {
            if (result.matchedCorrectly > 0) {
                this.showFeedback(`⚠ ${result.accuracy}% - Got ${result.matchedCorrectly}/${result.expected} strokes`, false);
            } else {
                this.showFeedback(`✗ Try again - Need ${result.expected} strokes`, false);
            }
        }
        this.updateScore();
    },

    updateScore() {
        document.getElementById('gameScore').textContent = this.correctChars;
        const accuracy = this.totalAttempts > 0 ? Math.round((this.correctChars / this.totalAttempts) * 100) : 0;
        document.getElementById('gameAccuracy').textContent = accuracy;
    },

    checkAccuracy() {
        if (!this.isRunning) return;
        const result = Practice.evaluateCharacter();
        const acc = result.accuracy || 0;
        
        if (result.correct) {
            if (acc >= 70) {
                this.showFeedback(`✓ Excellent! ${acc}% (${result.matchedCorrectly}/${result.expected} strokes)`, true);
            } else if (acc >= 50) {
                this.showFeedback(`✓ Good! ${acc}% (${result.matchedCorrectly}/${result.expected} strokes)`, true);
            } else {
                this.showFeedback(`✓ Acceptable ${acc}% (${result.matchedCorrectly}/${result.expected} strokes)`, true);
            }
            Sounds.click.play();
        } else {
            if (result.strokesMatched === 0) {
                this.showFeedback(`⚠ Draw ${result.expected} strokes for ${Practice.currentChar}`, false);
            } else if (result.matchedCorrectly > 0) {
                this.showFeedback(`⚠ ${acc}% - ${result.matchedCorrectly}/${result.expected} match, keep trying!`, false);
            } else {
                this.showFeedback(`⚠ Try ${result.expected} strokes (check guidelines)`, false);
            }
            Sounds.stroke_error.play();
        }
    },

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.startTime = Date.now();
        Sounds.game_start.play();
        this.timeLeft = this.maxTime;
        this.correctChars = 0;
        this.totalAttempts = 0;
        DrawEngine.reset();
        document.getElementById('gameStats').classList.add('hidden');
        document.getElementById('gameScore').textContent = '0';
        document.getElementById('gameAccuracy').textContent = '0';
        document.getElementById('gameFeedback').textContent = '';
        const startBtn = document.getElementById('gameStartBtn');
        if (startBtn) startBtn.disabled = true;
        this.buildPool();
        if (!this.pool.length) {
            alert('No characters available for the selected lesson.');
            this.isRunning = false;
            if (startBtn) startBtn.disabled = false;
            return;
        }
        this.setTarget();

        // Initialize drawing engine
        DrawEngine.init('gameCanvas', () => {
            // Optional: callback when stroke finishes, currently not used in submit-based mode
        });

        const timerDisplay = document.getElementById('gameTimer');

        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeLeft--;
            timerDisplay.textContent = this.timeLeft + 's';
            if (this.timeLeft <= 10) {
                timerDisplay.style.color = '#d9534f';
            } else {
                timerDisplay.style.color = '';
            }
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.endGame();
            }
        }, 1000);
    },

    clear() {
        DrawEngine.reset();
        const eraserBtn = document.getElementById('eraserBtn');
        if (eraserBtn) eraserBtn.textContent = 'Eraser';
    },

    toggleEraser() {
        const isEraser = DrawEngine.toggleEraser();
        const eraserBtn = document.getElementById('eraserBtn');
        if (eraserBtn) {
            eraserBtn.textContent = isEraser ? '✏️ Draw' : 'Eraser';
            eraserBtn.style.background = isEraser ? 'linear-gradient(135deg, #d9534f, #c9302c)' : '';
        }
    },

    undoLast() {
        DrawEngine.undoLast();
    },

    showFeedback(message, isSuccess = false) {
        const feedbackEl = document.getElementById('gameFeedback');
        if (!feedbackEl) return;
        
        feedbackEl.textContent = message;
        feedbackEl.style.color = isSuccess ? '#28a745' : '#ff6b6b';
        feedbackEl.style.opacity = '1';
        feedbackEl.style.transition = 'opacity 0.3s ease';
        
        // Clear feedback after 2 seconds
        setTimeout(() => {
            feedbackEl.style.opacity = '0';
        }, 2000);
    },

    submitCharacter() {
        if (!this.isRunning) return;
        
        this.totalAttempts++;
        const result = Practice.evaluateCharacter();
        
        if (result.correct) {
            this.correctChars++;
            const emoji = result.accuracy >= 80 ? '🎯' : '✓';
            this.showFeedback(`${emoji} Correct! Moving to next character...`, true);
            Sounds.success.play();
        } else {
            const emoji = result.matchedCorrectly > 0 ? '⚠️' : '✗';
            this.showFeedback(`${emoji} Accuracy: ${result.accuracy}% - Try again or submit next!`, false);
            Sounds.stroke_error.play();
        }
        
        this.updateScore();
        
        // Move to next character after a short delay
        setTimeout(() => {
            this.setTarget();
            DrawEngine.reset();
        }, 800);
    },

    endGame() {
        this.isRunning = false;
        clearInterval(this.timer);
        const elapsed = (Date.now() - this.startTime) / 1000 / 60;
        const cpm = elapsed > 0 ? Math.round(this.correctChars / elapsed) : 0;
        const accuracy = this.totalAttempts > 0 ? Math.round((this.correctChars / this.totalAttempts) * 100) : 0;
        
        document.getElementById('gameStats').classList.remove('hidden');
        document.getElementById('finalCharacters').textContent = this.correctChars;
        document.getElementById('finalAttempts').textContent = this.totalAttempts;
        document.getElementById('finalAccuracy').textContent = accuracy;
        document.getElementById('finalCPM').textContent = cpm;
        
        const startBtn = document.getElementById('gameStartBtn');
        if (startBtn) startBtn.disabled = false;
        
        if (accuracy >= 80) {
            Sounds.character_complete.play();
        } else if (accuracy >= 50) {
            Sounds.success.play();
        } else {
            Sounds.game_over.play();
        }
        
        if (this.guideCtx) this.guideCtx.clearRect(0, 0, 350, 350);
    }
};



// ----------------- MAIN INITIALIZATION -----------------
window.onload = () => {
    try {
        // Validate FULL_KANA_DATA
        if (typeof window.FULL_KANA_DATA === 'undefined' || !window.FULL_KANA_DATA || typeof window.FULL_KANA_DATA !== 'object') {
            if (typeof DEBUG !== 'undefined' && DEBUG) console.error('FULL_KANA_DATA validation failed');
            alert('Character data failed to load. Please refresh the page.');
            return;
        }
        
        // Validate Lessons data
        if (typeof window.Lessons !== 'undefined' && window.Lessons) {
            if (!Array.isArray(window.Lessons)) {
                if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('Lessons is not an array');
            } else {
                // Validate lesson structure
                window.Lessons.forEach((lesson, idx) => {
                    if (!lesson.id || !lesson.title || !Array.isArray(lesson.chars)) {
                        if (typeof DEBUG !== 'undefined' && DEBUG) console.warn(`Invalid lesson structure at index ${idx}`);
                    }
                });
            }
        }
        
        const select = document.getElementById("charSelect");
        const anim = document.getElementById("animSelect");

        if (typeof KanaData !== 'undefined') {
            const kanaKeys = Object.keys(KanaData);
            if (select) {
                kanaKeys.forEach(k => {
                    select.innerHTML += `<option value="${k}">${k}</option>`;
                });
            }
            if (anim) {
                kanaKeys.forEach(k => {
                    anim.innerHTML += `<option value="${k}">${k}</option>`;
                });
            }
        }

        const practiceCanvas = document.getElementById("practiceCanvas");
        if (typeof DrawEngine !== 'undefined' && typeof Practice !== 'undefined' && practiceCanvas) {
            DrawEngine.init("practiceCanvas", s => Practice.checkStroke(s));
            Practice.loadCharacter();
        }

        // Flashcards is initialized by flashcard-toggle.js
        // The init() is called from within flashcard-toggle.js's DOMContentLoaded handler
        
        // Quiz is initialized by quiz-toggle.js - no need to init here

        if (typeof Game !== 'undefined' && typeof Game.init === 'function') {
            Game.init();
        }

        // --- Hash-based navigation ---
        function openHashSection() {
            let hash = (location.hash || '').replace('#', '');
            if (hash && document.getElementById(hash)) {
                UI.showSection(hash);
            } else {
                UI.showSection('menu');
            }
        }
        openHashSection();
        window.addEventListener('hashchange', openHashSection);

        // Final safety pass to ensure data renders even if earlier init hooks were skipped
        setTimeout(() => {
            try {
                // Unhide main content if the loading screen failed to clear
                const site = document.querySelector('.site-content');
                if (site) site.style.opacity = '1';

                // Re-render curriculum in case Lessons loaded after Progress.init
                if (window.Progress && typeof window.Progress.renderCurriculum === 'function') {
                    window.Progress.renderCurriculum();
                }

                // Refresh flashcards from toggle data if available
                if (window.Flashcards && typeof window.Flashcards.refreshFromToggle === 'function') {
                    window.Flashcards.refreshFromToggle();
                }
                
                // Force Quiz to generate first question if not done
                if (window.Quiz && typeof window.Quiz.generateQuestion === 'function') {
                    if (!window.Quiz.currentChar) {
                        window.Quiz.generateQuestion();
                    }
                }

                // Default to menu if no section selected
                if (window.UI && typeof window.UI.showSection === 'function') {
                    window.UI.showSection(window.UI.getCurrentSection?.() || 'menu');
                }
            } catch (err) {
                if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('Safety init error', err);
            }
        }, 200);
    } catch (error) {
        if (typeof DEBUG !== 'undefined' && DEBUG) console.error('Initialization error:', error);
    }
};

// ----------------- MINI-GAMES SYSTEM -----------------
const MiniGames = {
    // Memory Match variables
    memoryCards: [],
    memoryFlipped: [],
    memoryMatched: 0,
    memoryMoves: 0,
    memoryTimer: null,
    memorySeconds: 0,

    // Quick Quiz variables
    quizScore: 0,
    quizStreak: 0,
    quizTimer: null,
    quizTimeLeft: 30,
    quizCurrentChar: null,
    quizCorrectAnswer: null,
    quickQuizDifficulty: 'medium',
    quickQuizConfig: null,
    quickQuizLessonChars: null,
    quickQuizLessonTitle: '',

    // Stroke Challenge variables
    strokeScore: 0,
    strokePerfect: 0,
    strokeCurrentChar: null,
    strokeEngine: null,

    // Start Memory Match
    startMemoryMatch() {
        const menu = document.querySelector('.minigames-menu');
        if (menu) menu.classList.add('hidden');
        const game = document.getElementById('memoryMatch');
        if (game) game.classList.remove('hidden');
        this.resetMemory();
    },

    resetMemory() {
        this.memoryMatched = 0;
        this.memoryMoves = 0;
        this.memorySeconds = 0;
        this.memoryFlipped = [];
        
        // Get 8 random hiragana characters
        const hiragana = window.QuizToggle ? 
            window.QuizToggle.characterSets.hiragana : 
            ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 
             'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と',
             'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ'];
        
        const selected = [];
        while (selected.length < 8) {
            const char = hiragana[Math.floor(Math.random() * hiragana.length)];
            if (!selected.includes(char)) selected.push(char);
        }
        
        // Create pairs and shuffle
        this.memoryCards = [...selected, ...selected]
            .map((char, idx) => ({ char, id: idx, matched: false }))
            .sort(() => Math.random() - 0.5);
        
        this.renderMemoryGrid();
        this.updateMemoryStats();
        
        // Always clear existing timer before starting new one
        if (this.memoryTimer) clearInterval(this.memoryTimer);
        this.memoryTimer = setInterval(() => {
            this.memorySeconds++;
            document.getElementById('memoryTime').textContent = this.memorySeconds;
        }, 1000);
    },

    renderMemoryGrid() {
        const grid = document.getElementById('memoryGrid');
        grid.innerHTML = '';
        
        this.memoryCards.forEach((card, idx) => {
            const div = document.createElement('div');
            div.className = 'memory-card';
            div.setAttribute('role', 'button');
            div.setAttribute('tabindex', '0');
            div.setAttribute('aria-label', `Card ${idx + 1}`);
            div.innerHTML = `<div class="card-back">🌸</div><div class="card-front">${card.char}</div>`;
            const front = div.querySelector('.card-front');
            if (front && window.Progress && typeof window.Progress.applyCharStatus === 'function') {
                window.Progress.applyCharStatus(front, card.char);
            }
            
            const flipHandler = () => this.flipMemoryCard(idx);
            div.onclick = flipHandler;
            
            // Add keyboard navigation
            div.onkeydown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    flipHandler();
                }
            };
            
            grid.appendChild(div);
        });
    },

    flipMemoryCard(idx) {
        const card = this.memoryCards[idx];
        if (card.matched || this.memoryFlipped.length >= 2 || this.memoryFlipped.includes(idx)) return;
        
        this.memoryFlipped.push(idx);
        document.querySelectorAll('.memory-card')[idx].classList.add('flipped');
        
        if (this.memoryFlipped.length === 2) {
            this.memoryMoves++;
            this.updateMemoryStats();
            
            const [idx1, idx2] = this.memoryFlipped;
            const card1 = this.memoryCards[idx1];
            const card2 = this.memoryCards[idx2];
            
            if (card1.char === card2.char) {
                setTimeout(() => {
                    card1.matched = card2.matched = true;
                    document.querySelectorAll('.memory-card')[idx1].classList.add('matched');
                    document.querySelectorAll('.memory-card')[idx2].classList.add('matched');
                    this.memoryMatched++;
                    this.updateMemoryStats();
                    this.memoryFlipped = [];
                    
                    if (this.memoryMatched === 8) {
                        clearInterval(this.memoryTimer);
                        Sounds.character_complete.play();
                        setTimeout(() => alert(`🎉 You won! Time: ${this.memorySeconds}s, Moves: ${this.memoryMoves}`), 300);
                    } else {
                        Sounds.correct.play();
                    }
                }, 500);
            } else {
                setTimeout(() => {
                    document.querySelectorAll('.memory-card')[idx1].classList.remove('flipped');
                    document.querySelectorAll('.memory-card')[idx2].classList.remove('flipped');
                    this.memoryFlipped = [];
                    Sounds.wrong.play();
                }, 1000);
            }
        }
    },

    updateMemoryStats() {
        document.getElementById('memoryPairs').textContent = this.memoryMatched;
        document.getElementById('memoryMoves').textContent = this.memoryMoves;
    },

    dedupeCharacters(list) {
        const seen = new Set();
        return (list || []).filter(ch => {
            if (seen.has(ch)) return false;
            seen.add(ch);
            return true;
        });
    },

    setQuickQuizDifficulty(diff) {
        this.quickQuizDifficulty = diff || 'medium';
        const container = document.getElementById('quickQuiz');
        if (container && !container.classList.contains('hidden')) {
            this.startQuickQuiz();
        }
    },

    startQuickQuizLesson(lesson) {
        this.quickQuizLessonChars = lesson && Array.isArray(lesson.chars) ? lesson.chars.slice() : [];
        this.quickQuizLessonTitle = (lesson && lesson.title) ? lesson.title : '';
        this.startQuickQuiz();
    },

    getQuickQuizConfig() {
        const qt = window.QuizToggle;
        const fallbackRomaji = {
            'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
            'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
            'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
            'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to'
        };

        const hira = qt ? qt.characterSets.hiragana : Object.keys(fallbackRomaji);
        const kata = qt ? qt.characterSets.katakana : [];
        const combos = qt ? qt.characterSets.combos : [];
        const kanji = qt ? qt.characterSets.kanji : [];
        const baseRomaji = qt ? qt.romajiMap : (typeof RomajiMap !== 'undefined' ? RomajiMap : fallbackRomaji);

        const hiraCore = hira.filter(ch => !['が','ぎ','ぐ','げ','ご','ざ','じ','ず','ぜ','ぞ','だ','ぢ','づ','で','ど','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ'].includes(ch));

        const lessonPool = this.quickQuizLessonChars && this.quickQuizLessonChars.length ? this.dedupeCharacters(this.quickQuizLessonChars) : null;

        switch (this.quickQuizDifficulty) {
            case 'easy':
                return {
                    pool: lessonPool || (hiraCore.length ? hiraCore : hira),
                    romajiMap: baseRomaji,
                    startTime: 38,
                    choices: 3,
                    bonusSeconds: 3
                };
            case 'hard':
                return {
                    pool: lessonPool || this.dedupeCharacters([
                        ...hira,
                        ...kata,
                        ...combos,
                        ...kanji
                    ]),
                    romajiMap: baseRomaji,
                    startTime: 28,
                    choices: 5,
                    bonusSeconds: 2
                };
            case 'medium':
            default:
                return {
                    pool: lessonPool || this.dedupeCharacters([
                        ...hira,
                        ...kata
                    ]),
                    romajiMap: baseRomaji,
                    startTime: 33,
                    choices: 4,
                    bonusSeconds: 2
                };
        }
    },

    // Start Quick Quiz
    startQuickQuiz() {
        // If launched from main menu without lesson context, clear lesson filter
        if (!this.quickQuizLessonChars || !Array.isArray(this.quickQuizLessonChars) || !this.quickQuizLessonChars.length) {
            this.quickQuizLessonChars = [];
            this.quickQuizLessonTitle = '';
        }

        const menu = document.querySelector('.minigames-menu');
        if (menu) menu.classList.add('hidden');
        const game = document.getElementById('quickQuiz');
        if (game) game.classList.remove('hidden');
        this.quizScore = 0;
        this.quizStreak = 0;
        this.quickQuizConfig = this.getQuickQuizConfig();
        this.quizTimeLeft = this.quickQuizConfig.startTime;
        // Clear any existing timer
        if (this.quizTimer) clearInterval(this.quizTimer);
        this.quizTimer = null;
        
        document.getElementById('quickQuiz_score').textContent = '0';
        document.getElementById('quickQuiz_streak').textContent = '0';
        document.getElementById('quickQuiz_result').textContent = '';
        const tElInit = document.getElementById('quickQuiz_time'); if (tElInit) tElInit.textContent = this.quizTimeLeft;
        const diffSelect = document.getElementById('quickQuiz_difficulty');
        if (diffSelect) diffSelect.value = this.quickQuizDifficulty;
        const lessonEl = document.getElementById('quickQuiz_lesson');
        if (lessonEl) {
            if (this.quickQuizLessonChars && this.quickQuizLessonChars.length) {
                lessonEl.textContent = this.quickQuizLessonTitle ? `Lesson: ${this.quickQuizLessonTitle}` : 'Lesson mode';
                lessonEl.classList.remove('hidden');
            } else {
                lessonEl.textContent = '';
                lessonEl.classList.add('hidden');
            }
        }
        
        // Always clear existing timer before starting new one
        if (this.quizTimer) clearInterval(this.quizTimer);
        this.quizTimer = setInterval(() => {
            this.quizTimeLeft--;
            const tEl = document.getElementById('quickQuiz_time');
            if (tEl) tEl.textContent = this.quizTimeLeft;
            if (this.quizTimeLeft <= 0) {
                clearInterval(this.quizTimer);
                Sounds.game_over.play();
                alert(`⚡ Game Over! Final Score: ${this.quizScore}`);
            }
        }, 1000);
        
        this.nextQuizQuestion();
    },

    nextQuizQuestion() {
        const cfg = this.quickQuizConfig || this.getQuickQuizConfig();
        const pool = (cfg.pool && cfg.pool.length) ? cfg.pool : ['あ', 'い', 'う', 'え', 'お'];
        const romajiMap = cfg.romajiMap || (typeof RomajiMap !== 'undefined' ? RomajiMap : {});
        const fallbackChoices = ['a','i','u','e','o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to'];

        this.quizCurrentChar = pool[Math.floor(Math.random() * pool.length)];
        this.quizCorrectAnswer = romajiMap[this.quizCurrentChar] || this.quizCurrentChar;
        
        const qEl = document.getElementById('quickQuiz_question');
        if (qEl) {
            qEl.textContent = this.quizCurrentChar;
            if (window.Progress && typeof window.Progress.applyCharStatus === 'function') {
                window.Progress.applyCharStatus(qEl, this.quizCurrentChar);
            }
        }
        
        const choices = this.quizCorrectAnswer ? [this.quizCorrectAnswer] : [];
        const romajiPool = Array.from(new Set(Object.values(romajiMap).filter(Boolean)));
        const basePool = romajiPool.length ? romajiPool : fallbackChoices;
        const allRomaji = basePool.filter(r => r !== this.quizCorrectAnswer);
        const targetChoices = cfg.choices || 4;
        
        while (choices.length < targetChoices && allRomaji.length) {
            const idx = Math.floor(Math.random() * allRomaji.length);
            const pick = allRomaji.splice(idx, 1)[0];
            if (!choices.includes(pick)) choices.push(pick);
        }

        while (choices.length < targetChoices && fallbackChoices.length > 0) {
            const random = fallbackChoices[Math.floor(Math.random() * fallbackChoices.length)];
            if (!choices.includes(random)) choices.push(random);
        }
        
        // Fallback: if still not enough choices, use generic answers
        if (choices.length < targetChoices) {
            const generic = ['a', 'ka', 'na', 'ha', 'ma', 'ya', 'ra', 'wa'];
            for (const g of generic) {
                if (choices.length >= targetChoices) break;
                if (!choices.includes(g)) choices.push(g);
            }
        }
        
        choices.sort(() => Math.random() - 0.5);
        
        const choicesDiv = document.getElementById('quickQuiz_choices');
        choicesDiv.innerHTML = '';
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.textContent = choice;
            btn.onclick = () => this.checkQuizAnswer(choice, btn);
            choicesDiv.appendChild(btn);
        });
        
        const rEl = document.getElementById('quickQuiz_result');
        if (rEl) rEl.textContent = '';
    },

    checkQuizAnswer(answer, btn) {
        const buttons = document.querySelectorAll('#quickQuiz_choices button');
        buttons.forEach(b => b.disabled = true);
        
        if (answer === this.quizCorrectAnswer) {
            btn.classList.add('correct');
            this.quizScore += 10 + this.quizStreak;
            this.quizStreak++;
            const bonus = this.quickQuizConfig ? this.quickQuizConfig.bonusSeconds : 2;
            this.quizTimeLeft += bonus;
            const rEl2 = document.getElementById('quickQuiz_result'); if (rEl2) rEl2.textContent = `✓ Correct! +${10 + this.quizStreak - 1}`;
            const tEl = document.getElementById('quickQuiz_time'); if (tEl) tEl.textContent = this.quizTimeLeft;
            Sounds.quiz_correct.play();
        } else {
            btn.classList.add('wrong');
            this.quizStreak = 0;
            const rEl3 = document.getElementById('quickQuiz_result'); if (rEl3) rEl3.textContent = `✗ Wrong! Answer: ${this.quizCorrectAnswer}`;
            Sounds.quiz_wrong.play();
        }
        
        const sEl = document.getElementById('quickQuiz_score'); if (sEl) sEl.textContent = this.quizScore;
        const stEl = document.getElementById('quickQuiz_streak'); if (stEl) stEl.textContent = this.quizStreak;
        
        setTimeout(() => {
            buttons.forEach(b => {
                b.classList.remove('correct', 'wrong');
                b.disabled = false;
            });
            if (this.quizTimeLeft > 0) this.nextQuizQuestion();
        }, 1500);
    },

    // Start Stroke Challenge
    startStrokeChallenge(lesson = null) {
        const menu = document.querySelector('.minigames-menu');
        if (menu) menu.classList.add('hidden');
        const game = document.getElementById('strokeChallenge');
        if (game) game.classList.remove('hidden');
        this.strokeScore = 0;
        this.strokePerfect = 0;
        this.strokeViewBoxSize = 140; // keep consistent with writing practice strokes
        const allChars = Object.keys(window.FULL_KANA_DATA || {});
        const lessonChars = Array.isArray(lesson?.chars) ? lesson.chars : [];
        const kanjiFromLesson = lessonChars.filter(ch => typeof ch === 'string' && ch.length === 1 && /[\u4e00-\u9faf]/.test(ch));
        const basePool = lesson ? lessonChars : [...allChars, ...kanjiFromLesson];
        this.strokePool = Array.from(new Set(basePool.filter(ch => typeof ch === 'string' && ch.length === 1)));
        if (!this.strokePool.length) {
            this.strokePool = Array.from(new Set(allChars.filter(ch => ch.length === 1)));
        }
        this.strokeStrokes = [];
        this.strokeBrushSize = 12;
        this.strokeGuideOpacity = 0.28;
        document.getElementById('strokeScore').textContent = '0';
        document.getElementById('strokePerfect').textContent = '0';
        document.getElementById('strokeAccuracy').textContent = '-';
        document.getElementById('strokeFeedback').textContent = '';

        // Initialize canvas for drawing
        const canvas = document.getElementById('strokeChallengeCanvas');
        if (!canvas) return;

        // Ensure a square drawing area tied to actual canvas pixels
        const container = canvas.parentElement;
        const rect = container.getBoundingClientRect();
        const size = Math.min(rect.width, rect.height);
        const dpr = window.devicePixelRatio || 1;

        canvas.width = Math.max(1, Math.floor(size * dpr));
        canvas.height = canvas.width; // keep square for comparison logic
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';

        // Store CSS pixel size for consistent scaling calculations
        this.strokeCanvasSize = size; // store CSS pixel size, not device pixel size

        this.strokeCtx = canvas.getContext('2d');
        this.strokeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.strokeCtx.lineWidth = Math.max(4, size * 0.027); // temporary until slider sets value
        this.strokeCtx.lineCap = 'round';
        this.strokeCtx.lineJoin = 'round';
        this.strokeCtx.strokeStyle = '#5d4e6d';

        this.strokeDrawing = false;
        this.strokeLastPoint = null;

        // UI controls for stroke tuning
        const brushRange = document.getElementById('strokeBrushRange');
        const brushVal = document.getElementById('strokeBrushVal');
        if (brushRange && brushVal) {
            const applyBrush = () => {
                this.strokeBrushSize = parseInt(brushRange.value, 10) || 10;
                brushVal.textContent = this.strokeBrushSize;
                this.strokeCtx.lineWidth = this.strokeBrushSize;
            };
            if (!this._strokeBrushBound) {
                brushRange.addEventListener('input', applyBrush);
                this._strokeBrushBound = true;
            }
            applyBrush();
        }

        const guideRange = document.getElementById('strokeGuideRange');
        const guideVal = document.getElementById('strokeGuideVal');
        if (guideRange && guideVal) {
            const applyGuide = () => {
                const raw = parseInt(guideRange.value, 10);
                const pct = isNaN(raw) ? 28 : raw;
                this.strokeGuideOpacity = Math.max(0, Math.min(1, pct / 100));
                guideVal.textContent = pct;
                const ref = document.getElementById('strokeDrawingSvg');
                if (ref) ref.style.opacity = Math.max(0.08, this.strokeGuideOpacity + 0.05);
                this.redrawStrokeCanvas();
            };
            if (!this._strokeGuideBound) {
                guideRange.addEventListener('input', applyGuide);
                this._strokeGuideBound = true;
            }
            applyGuide();
        }

        // Export size select
        const exportSelect = document.getElementById('strokeExportSize');
        if (exportSelect) {
            this.strokeExportSize = exportSelect.value;
            if (!this._strokeExportBound) {
                exportSelect.addEventListener('change', () => {
                    this.strokeExportSize = exportSelect.value;
                });
                this._strokeExportBound = true;
            }
        }

        // Setup drawing events once to avoid duplicate handlers
        if (!this._strokeCanvasBound) {
            canvas.addEventListener('pointerdown', (e) => { e.preventDefault(); this.startStrokeDraw(e); });
            canvas.addEventListener('pointermove', (e) => this.continueStrokeDraw(e));
            canvas.addEventListener('pointerup', () => this.endStrokeDraw());
            canvas.addEventListener('pointerout', () => this.endStrokeDraw());
            this._strokeCanvasBound = true;
        }

        // Keyboard shortcuts (clear/undo/save) only once
        if (!this._strokeKeysBound) {
            window.addEventListener('keydown', (e) => {
                const container = document.getElementById('strokeChallenge');
                const isActive = container && !container.classList.contains('hidden');
                if (!isActive) return;
                if (e.key === 'c' || e.key === 'C') { e.preventDefault(); this.clearStrokeCanvas(); }
                if (e.key === 'z' || e.key === 'Z') { e.preventDefault(); this.undoStrokeCanvas(); }
                if (e.key === 's' || e.key === 'S') { e.preventDefault(); this.downloadStrokePng(); }
            });
            this._strokeKeysBound = true;
        }

        this.clearStrokeCanvas();
        this.nextStrokeChallenge();
    },

    getStrokeSource(char) {
        const data = window.FULL_KANA_DATA?.[char];
        if (data && Array.isArray(data.strokes) && data.strokes.length) return data;

        // Generate a simple guide box for kanji when stroke data is missing
        if (char && char.length === 1 && /[\u4e00-\u9faf]/.test(char)) {
            const size = this.strokeViewBoxSize || 140;
            const a = size * 0.2;
            const b = size * 0.8;
            const c = size * 0.5;
            return {
                generated: true,
                strokes: [
                    `M${a} ${a} L${b} ${a}`,
                    `M${a} ${b} L${b} ${b}`,
                    `M${a} ${a} L${a} ${b}`,
                    `M${b} ${a} L${b} ${b}`,
                    `M${a} ${c} L${b} ${c}`,
                    `M${c} ${a} L${c} ${b}`
                ]
            };
        }
        return null;
    },

    startStrokeDraw(e) {
        if (!this.strokeCtx) return; // Guard against uninitialized canvas
        this.strokeDrawing = true;
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = this.strokeBrushSize || Math.max(4, (this.strokeCanvasSize || 350) * 0.027);
        const stroke = { width, points: [{ x, y }] };
        this.strokeStrokes.push(stroke);
        this.strokeCtx.lineWidth = width;
        this.strokeCtx.beginPath();
        this.strokeCtx.moveTo(x, y);
        this.strokeLastPoint = { x, y };
    },

    continueStrokeDraw(e) {
        if (!this.strokeDrawing) return;
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const stroke = this.strokeStrokes[this.strokeStrokes.length - 1];
        if (!stroke) return;
        stroke.points.push({ x, y });
        this.strokeCtx.lineWidth = stroke.width;
        this.strokeCtx.beginPath();
        this.strokeCtx.moveTo(this.strokeLastPoint.x, this.strokeLastPoint.y);
        this.strokeCtx.lineTo(x, y);
        this.strokeCtx.stroke();
        this.strokeLastPoint = { x, y };
    },

    endStrokeDraw() {
        this.strokeDrawing = false;
        this.strokeLastPoint = null;
    },

    nextStrokeChallenge() {
        // Get random character from FULL_KANA_DATA
        const kanaKeys = Array.isArray(this.strokePool) ? this.strokePool : [];
        if (kanaKeys.length === 0) {
            if (typeof DEBUG !== 'undefined' && DEBUG) console.error('FULL_KANA_DATA not loaded');
            alert('Character data failed to load. Please refresh the page.');
            return;
        }

        let attempts = 0;
        let charData = null;
        while (attempts < 30 && (!charData || !charData.strokes || !charData.strokes.length)) {
            this.strokeCurrentChar = kanaKeys[Math.floor(Math.random() * kanaKeys.length)];
            charData = this.getStrokeSource(this.strokeCurrentChar);
            attempts++;
        }

        if (!charData || !charData.strokes || !charData.strokes.length) {
            document.getElementById('strokeFeedback').textContent = '⚠️ No stroke data available.';
            return;
        }
        this.strokeCurrentData = charData;
        
        const targetEl = document.getElementById('strokeTarget');
        if (targetEl) {
            targetEl.textContent = this.strokeCurrentChar;
            if (window.Progress && typeof window.Progress.applyCharStatus === 'function') {
                window.Progress.applyCharStatus(targetEl, this.strokeCurrentChar);
            }
        }
        document.getElementById('strokeFeedback').textContent = '';
        document.getElementById('strokeAccuracy').textContent = '-';

        // Update backdrop guide (font-based, like one.html)
        this.drawStrokeBackdrop();
        
        // Draw reference strokes in reference SVG
        const refSvg = document.getElementById('strokeReferenceSvg');
        if (refSvg && charData && charData.strokes) {
            refSvg.setAttribute('viewBox', `0 0 ${this.strokeViewBoxSize} ${this.strokeViewBoxSize}`);
            refSvg.innerHTML = '';
            const gridPattern = `<defs>
                <pattern id="stroke-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <rect width="10" height="10" fill="none" stroke="#eee" stroke-width="0.5"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stroke-grid)"/>`;
            refSvg.innerHTML = gridPattern;
            
            charData.strokes.forEach((strokePath, idx) => {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', strokePath);
                path.setAttribute('stroke', '#5d4e6d');
                path.setAttribute('stroke-width', '4');
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke-linecap', 'round');
                path.setAttribute('stroke-linejoin', 'round');
                path.setAttribute('opacity', '0.8');
                refSvg.appendChild(path);
                
                // Add stroke number badge at start point
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pathEl.setAttribute('d', strokePath);
                const startPoint = pathEl.getPointAtLength(0);
                circle.setAttribute('cx', startPoint.x);
                circle.setAttribute('cy', startPoint.y);
                circle.setAttribute('r', '6');
                circle.setAttribute('fill', '#5d4e6d');
                circle.setAttribute('stroke', 'white');
                circle.setAttribute('stroke-width', '1.2');
                text.setAttribute('x', startPoint.x);
                text.setAttribute('y', startPoint.y + 0.5);
                text.setAttribute('fill', 'white');
                text.setAttribute('font-size', '10');
                text.setAttribute('font-weight', 'bold');
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('dominant-baseline', 'middle');
                text.textContent = idx + 1;
                refSvg.appendChild(circle);
                refSvg.appendChild(text);
            });
        }
        
        // Draw reference strokes in drawing SVG (semi-transparent guide)
        const drawSvg = document.getElementById('strokeDrawingSvg');
        if (drawSvg && charData && charData.strokes) {
            drawSvg.setAttribute('viewBox', `0 0 ${this.strokeViewBoxSize} ${this.strokeViewBoxSize}`);
            drawSvg.innerHTML = '';
            const gridPattern = `<defs>
                <pattern id="stroke-grid-draw" width="10" height="10" patternUnits="userSpaceOnUse">
                    <rect width="10" height="10" fill="none" stroke="#eee" stroke-width="0.5"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stroke-grid-draw)"/>`;
            drawSvg.innerHTML = gridPattern;
            
            charData.strokes.forEach((strokePath, idx) => {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', strokePath);
                path.setAttribute('stroke', '#d4a962');
                path.setAttribute('stroke-width', '3');
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke-linecap', 'round');
                path.setAttribute('stroke-linejoin', 'round');
                path.setAttribute('opacity', (this.strokeGuideOpacity || 0.28).toString());
                drawSvg.appendChild(path);
            });
            drawSvg.style.opacity = Math.max(0.08, (this.strokeGuideOpacity || 0.28) + 0.05);
        }
        
        this.clearStrokeCanvas();
    },

    clearStrokeCanvas() {
        const canvas = document.getElementById('strokeChallengeCanvas');
        if (canvas && this.strokeCtx) {
            this.strokeCtx.clearRect(0, 0, canvas.width, canvas.height);
            this.strokeStrokes = [];
            this.strokeLastPoint = null;
            this.drawStrokeBackdrop();
        }
    },

    cleanupStrokeChallenge() {
        // Reset event listener flags to allow proper re-initialization
        this._strokeBrushBound = false;
        this._strokeGuideBound = false;
        this._strokeCanvasBound = false;
        // Clear remaining strokes
        this.strokeStrokes = [];
        this.strokeLastPoint = null;
    },

    undoStrokeCanvas() {
        const canvas = document.getElementById('strokeChallengeCanvas');
        if (!canvas || !this.strokeCtx || !this.strokeStrokes?.length) return;
        this.strokeStrokes.pop();
        this.redrawStrokeCanvas();
    },

    redrawStrokeCanvas() {
        const canvas = document.getElementById('strokeChallengeCanvas');
        if (!canvas || !this.strokeCtx) return;
        this.strokeCtx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawStrokeBackdrop();
        this.strokeCtx.lineCap = 'round';
        this.strokeCtx.lineJoin = 'round';
        this.strokeCtx.strokeStyle = '#5d4e6d';
        for (const stroke of this.strokeStrokes || []) {
            if (!stroke.points || stroke.points.length < 2) continue;
            this.strokeCtx.lineWidth = stroke.width || this.strokeBrushSize || 10;
            this.strokeCtx.beginPath();
            this.strokeCtx.moveTo(stroke.points[0].x, stroke.points[0].y);
            for (let i = 1; i < stroke.points.length; i++) {
                this.strokeCtx.lineTo(stroke.points[i].x, stroke.points[i].y);
            }
            this.strokeCtx.stroke();
        }
    },

    drawStrokeBackdrop() {
        const canvas = document.getElementById('strokeChallengeCanvas');
        if (!canvas || !this.strokeCtx) return;
        const ctx = this.strokeCtx;
        const size = canvas.width;
        const guideOpacity = Math.max(0, Math.min(1, this.strokeGuideOpacity ?? 0.28));
        // grid
        const step = size / 7;
        ctx.save();
        ctx.lineWidth = Math.max(0.8, size * 0.002);
        ctx.strokeStyle = 'rgba(93, 78, 109, 0.08)';
        for (let x = step; x < size; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke(); }
        for (let y = step; y < size; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke(); }

        // central faint glyph (font-based, like one.html)
        const char = this.strokeCurrentChar || 'あ';
        const fontSize = Math.floor(size * 0.64);
        ctx.fillStyle = `rgba(93, 78, 109, ${guideOpacity * 0.72 + 0.08})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `700 ${fontSize}px "Hiragino Mincho ProN", "Yu Mincho", serif`;
        ctx.fillText(char, size / 2, size / 2 + fontSize * 0.02);
        ctx.restore();
    },

    checkStroke() {
        const hasInk = Array.isArray(this.strokeStrokes) && this.strokeStrokes.some(s => s.points && s.points.length > 1);
        if (!hasInk) {
            document.getElementById('strokeFeedback').textContent = '⚠️ Draw something first!';
            return;
        }

        const charData = this.strokeCurrentData || this.getStrokeSource(this.strokeCurrentChar);
        if (!charData || !charData.strokes) {
            document.getElementById('strokeFeedback').textContent = '⚠️ Character data not found';
            return;
        }

        // Ensure canvas reflects current strokes (after undo/clear)
        this.redrawStrokeCanvas();

        const userCanvas = document.getElementById('strokeChallengeCanvas');
        if (!userCanvas || !this.strokeCtx) {
            document.getElementById('strokeFeedback').textContent = '⚠️ Drawing canvas not ready';
            return;
        }

        // Use the actual canvas pixel size for analysis
        const canvasSize = userCanvas.width || this.strokeCanvasSize || 300;

        // Create reference canvas from SVG paths
        const refCanvas = document.createElement('canvas');
        refCanvas.width = canvasSize;
        refCanvas.height = canvasSize;
        const refCtx = refCanvas.getContext('2d');
        refCtx.lineWidth = Math.max(4, canvasSize * 0.027);
        refCtx.lineCap = 'round';
        refCtx.lineJoin = 'round';
        refCtx.strokeStyle = '#000';

        // Draw reference strokes on canvas
        const scale = canvasSize / (this.strokeViewBoxSize || 100);
        charData.strokes.forEach(strokePath => {
            try {
                const path2D = new Path2D(strokePath);
                refCtx.save();
                refCtx.scale(scale, scale);
                refCtx.stroke(path2D);
                refCtx.restore();
            } catch (err) {
                if (typeof DEBUG !== 'undefined' && DEBUG) console.warn('Invalid stroke path:', strokePath, err);
            }
        });

        // Get pixel data from both canvases using the same size
        const userImageData = this.strokeCtx.getImageData(0, 0, canvasSize, canvasSize).data;
        const refImageData = refCtx.getImageData(0, 0, canvasSize, canvasSize).data;
        
        // Enhanced accuracy calculation with distance tolerance
        const tolerance = Math.max(2, Math.round(canvasSize * 0.012)); // tighter tolerance for closer match
        let matchingPixels = 0;
        let totalRefPixels = 0;
        let totalUserPixels = 0;
        let nearMatchPixels = 0;
        
        // First pass: count pixels
        for (let i = 0; i < userImageData.length; i += 4) {
            const userAlpha = userImageData[i + 3];
            const refAlpha = refImageData[i + 3];
            
            if (refAlpha > 128) totalRefPixels++;
            if (userAlpha > 128) totalUserPixels++;
            
            if (userAlpha > 128 && refAlpha > 128) {
                matchingPixels++;
            }
        }
        
        // Second pass: check near-matches for user pixels not exactly on reference
        for (let y = 0; y < canvasSize; y++) {
            for (let x = 0; x < canvasSize; x++) {
                const idx = (y * canvasSize + x) * 4;
                const userAlpha = userImageData[idx + 3];
                const refAlpha = refImageData[idx + 3];
                
                // If user drew here but not exactly on reference
                if (userAlpha > 128 && refAlpha <= 128) {
                    // Check if within tolerance distance of reference
                    let foundNear = false;
                    for (let dy = -tolerance; dy <= tolerance && !foundNear; dy++) {
                        for (let dx = -tolerance; dx <= tolerance && !foundNear; dx++) {
                            const ny = y + dy;
                            const nx = x + dx;
                            if (ny >= 0 && ny < canvasSize && nx >= 0 && nx < canvasSize) {
                                const nIdx = (ny * canvasSize + nx) * 4;
                                if (refImageData[nIdx + 3] > 128) {
                                    nearMatchPixels++;
                                    foundNear = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        // Calculate coverage: how much of reference is covered
        const coverage = totalRefPixels > 0 ? 
            ((matchingPixels + nearMatchPixels * 0.6) / totalRefPixels) * 100 : 0;
        
        // Calculate precision: how much user drawing is on/near reference
        const precision = totalUserPixels > 0 ?
            ((matchingPixels + nearMatchPixels * 0.6) / totalUserPixels) * 100 : 0;
        
        // Balanced accuracy: geometric mean of coverage and precision
        const balancedAccuracy = Math.sqrt(coverage * precision);
        
        // Extra stroke penalty (drawing way too much)
        let extraPenalty = 1.0;
        if (totalUserPixels > totalRefPixels * 2.0) {
            extraPenalty = 0.7; // Heavy penalty
        } else if (totalUserPixels > totalRefPixels * 1.6) {
            extraPenalty = 0.85; // Moderate penalty
        } else if (totalUserPixels > totalRefPixels * 1.3) {
            extraPenalty = 0.95; // Light penalty
        }
        
        // Missing strokes penalty (drawing too little)
        let missingPenalty = 1.0;
        if (totalUserPixels < totalRefPixels * 0.4) {
            missingPenalty = 0.7; // Heavy penalty
        } else if (totalUserPixels < totalRefPixels * 0.6) {
            missingPenalty = 0.85; // Moderate penalty
        } else if (totalUserPixels < totalRefPixels * 0.8) {
            missingPenalty = 0.95; // Light penalty
        }
        
        const finalAccuracy = Math.min(100, Math.round(balancedAccuracy * extraPenalty * missingPenalty));
        
        document.getElementById('strokeAccuracy').textContent = finalAccuracy;
        
        let score = 0;
        let feedback = '';
        
        if (finalAccuracy >= 85) {
            score = 100;
            this.strokePerfect++;
            feedback = '🌟 Perfect! Excellent stroke accuracy!';
            Sounds.character_complete.play();
        } else if (finalAccuracy >= 70) {
            score = 80;
            feedback = '👍 Great! Very close to the reference!';
            Sounds.correct.play();
        } else if (finalAccuracy >= 55) {
            score = 60;
            feedback = '📝 Good! Keep refining your strokes!';
            Sounds.stroke_complete.play();
        } else if (finalAccuracy >= 40) {
            score = 35;
            feedback = '⚠️ Getting there! Watch the shape carefully!';
            Sounds.wrong.play();
        } else if (finalAccuracy >= 25) {
            score = 15;
            feedback = '💭 Try to match the guidelines more closely!';
            Sounds.wrong.play();
        } else {
            score = 5;
            feedback = '❌ Study the reference and try again!';
            Sounds.wrong.play();
        }
        
        document.getElementById('strokeFeedback').textContent = feedback;
        
        this.strokeScore += score;
        document.getElementById('strokeScore').textContent = this.strokeScore;
        document.getElementById('strokePerfect').textContent = this.strokePerfect;
        
        setTimeout(() => this.nextStrokeChallenge(), 2500);
    },

    downloadStrokePng() {
        const canvas = document.getElementById('strokeChallengeCanvas');
        const charData = this.strokeCurrentData || this.getStrokeSource(this.strokeCurrentChar);
        if (!canvas) return;
        // Export size based on user preference
        const styleRect = canvas.getBoundingClientRect();
        const styleSize = Math.max(styleRect.width, styleRect.height, 600);
        const dpr = window.devicePixelRatio || 1;
        let size = Math.round(styleSize * dpr * 1.05);
        if (this.strokeExportSize && this.strokeExportSize !== 'auto') {
            const fixed = parseInt(this.strokeExportSize, 10);
            if (!isNaN(fixed) && fixed > 256) size = fixed;
        }
        const out = document.createElement('canvas');
        out.width = size;
        out.height = size;
        const ctx = out.getContext('2d');
        ctx.fillStyle = '#faf7f2';
        ctx.fillRect(0, 0, size, size);

        // light grid backdrop
        const step = size / 7;
        ctx.strokeStyle = 'rgba(93, 78, 109, 0.08)';
        ctx.lineWidth = 1;
        for (let x = step; x < size; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke(); }
        for (let y = step; y < size; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke(); }

        // faint glyph (match on-canvas backdrop)
        const guideOpacity = Math.max(0, Math.min(1, this.strokeGuideOpacity ?? 0.28));
        const fontSize = Math.floor(size * 0.68);
        ctx.fillStyle = `rgba(93, 78, 109, ${guideOpacity * 0.8 + 0.08})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `700 ${fontSize}px "Hiragino Mincho ProN", "Yu Mincho", serif`;
        ctx.fillText(this.strokeCurrentChar || 'あ', size / 2, size / 2 + fontSize * 0.02);

        // reference strokes + stroke numbers
        if (charData && Array.isArray(charData.strokes)) {
            const scale = size / (this.strokeViewBoxSize || 140);
            ctx.save();
            ctx.scale(scale, scale);
            ctx.strokeStyle = `rgba(212, 169, 98, ${Math.max(0.08, (this.strokeGuideOpacity || 0.28))})`;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            charData.strokes.forEach((pathStr, idx) => {
                const p = new Path2D(pathStr);
                ctx.stroke(p);
                // stroke number badge at start point
                tempPath.setAttribute('d', pathStr);
                const start = tempPath.getPointAtLength(0);
                ctx.save();
                ctx.fillStyle = '#5d4e6d';
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(start.x, start.y, 5.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = 'white';
                ctx.font = '9px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(String(idx + 1), start.x, start.y + 0.2);
                ctx.restore();
            });
            ctx.restore();
        }

        // user strokes
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#5d4e6d';
        for (const stroke of this.strokeStrokes || []) {
            if (!stroke.points || stroke.points.length < 2) continue;
            ctx.lineWidth = stroke.width || this.strokeBrushSize || 10;
            ctx.beginPath();
            ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
            for (let i = 1; i < stroke.points.length; i++) {
                ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
            }
            ctx.stroke();
        }

        const link = document.createElement('a');
        link.download = `${this.strokeCurrentChar || 'character'}.png`;
        link.href = out.toDataURL('image/png');
        link.click();
    },

    backToHub() {
        clearInterval(this.memoryTimer);
        clearInterval(this.quizTimer);
        this.quickQuizLessonChars = [];
        this.quickQuizLessonTitle = '';
        document.querySelector('.minigames-menu').classList.remove('hidden');
        document.getElementById('memoryMatch').classList.add('hidden');
        document.getElementById('quickQuiz').classList.add('hidden');
        document.getElementById('strokeChallenge').classList.add('hidden');
    },

    cleanup() {
        // Clear all timers to prevent memory leaks
        clearInterval(this.memoryTimer);
        clearInterval(this.quizTimer);
        this.memoryTimer = null;
        this.quizTimer = null;
        
        // Reset state
        this.memoryCards = [];
        this.memoryFlipped = [];
        this.quickQuizLessonChars = [];
    }
};

// Make MiniGames globally available
window.MiniGames = MiniGames;

// ============ DEBUGGING UTILITIES ============
if (typeof window !== 'undefined') {
    window.testCurriculumButtons = function() {
        console.log('=== Testing Curriculum Button Closures ===');
        const lessons = window.Lessons || [];
        console.log('Total lessons available:', lessons.length);
        lessons.forEach((lesson, idx) => {
            console.log(`  ${idx + 1}. ${lesson.id}: ${lesson.title}`);
        });
        console.log('\nClick any curriculum button and check the console logs above.');
        console.log('Each button should log its own lesson title, not the last one.');
    };
    
    window.debugLesson = function(lessonId) {
        const lesson = (window.Lessons || []).find(l => l.id === lessonId);
        if (!lesson) {
            console.error('Lesson not found:', lessonId);
            return;
        }
        console.log('=== Lesson Debug Info ===');
        console.log('ID:', lesson.id);
        console.log('Title:', lesson.title);
        console.log('Description:', lesson.description);
        console.log('Characters:', lesson.chars);
        console.log('Vocab count:', lesson.vocab?.length || 0);
        console.log('Sentences:', lesson.sentences?.length || 0);
    };
    
    console.log('%c✅ Curriculum debugging enabled', 'color: #000000000000; font-weight: bold');
    console.log('Type testCurriculumButtons() to verify button closures');
    console.log('Type debugLesson("lesson-id") to inspect a specific lesson');
}

