// ============================================================
// Sound Effects for Japanese Learning Platform
// Web Audio API-based sound generation (no external files)
// ============================================================

const AudioEngine = {
    context: null,
    
    init() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
    },
    
    playTone(frequency, duration, volume = 0.3) {
        if (!this.context) this.init();
        try {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.context.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(volume, this.context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration / 1000);
            
            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + duration / 1000);
        } catch (e) {
            // Audio playback unavailable
        }
    },
    
    playSequence(frequencies, durations, volume = 0.3) {
        let delay = 0;
        frequencies.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, durations[i], volume), delay);
            delay += durations[i] + 20;
        });
    },
    
    resume() {
        if (!this.context) this.init();
        return this.context ? this.context.resume() : Promise.resolve();
    }
};

// Initialize audio engine
AudioEngine.init();

// ============================================================
// Sound Effects Library
// ============================================================

const Sounds = {
    // UI Navigation Sounds
    click: {
        play() { AudioEngine.playTone(400, 100, 0.3); }
    },
    
    page_transition: {
        play() { 
            AudioEngine.playSequence([480, 540], [50, 50], 0.25);
        }
    },
    
    button_hover: {
        play() { AudioEngine.playTone(370, 30, 0.15); }
    },
    
    // Feedback Sounds - Practice Mode
    correct: {
        play() { 
            AudioEngine.playSequence([523, 659], [150, 150], 0.4); // C5, E5
        }
    },
    
    stroke_start: {
        play() { AudioEngine.playTone(554, 50, 0.2); } // C#5
    },
    
    stroke_complete: {
        play() { 
            AudioEngine.playSequence([587, 698], [120, 80], 0.35); // D5, F5
        }
    },
    
    character_load: {
        play() { AudioEngine.playTone(440, 80, 0.3); } // A4
    },
    
    character_complete: {
        play() { 
            AudioEngine.playSequence([523, 659, 784, 988], [100, 100, 100, 150], 0.4); // C5, E5, G5, B5
        }
    },
    
    // Quiz Mode Sounds
    quiz_correct: {
        play() { 
            AudioEngine.playSequence([659, 784], [100, 100], 0.35); // E5, G5
        }
    },
    
    quiz_wrong: {
        play() { 
            AudioEngine.playSequence([330, 290], [150, 150], 0.3); // E4, D4
        }
    },
    
    // Game Mode Sounds
    game_start: {
        play() { 
            AudioEngine.playSequence([440, 523, 659], [60, 60, 100], 0.3); // A4, C5, E5
        }
    },
    
    game_over: {
        play() { 
            AudioEngine.playSequence([400, 350, 300], [150, 150, 200], 0.4); // G4, F4, D4
        }
    },
    
    // Achievement Sounds
    success: {
        play() { 
            AudioEngine.playSequence([523, 659, 784], [100, 100, 100], 0.4); // C5, E5, G5
        }
    },
    
    streak_milestone: {
        play() { 
            AudioEngine.playSequence([784, 784, 932], [80, 80, 150], 0.4); // G5, G5, A#5
        }
    },
    
    wrong: {
        play() { AudioEngine.playTone(300, 200, 0.3); }
    },
    
    // Animation Sounds
    animation_play: {
        play() { 
            AudioEngine.playSequence([523, 587], [50, 100], 0.3); // C5, D5
        }
    },
    
    animation_pause: {
        play() { AudioEngine.playTone(450, 80, 0.25); } // A#4
    },
    
    animation_complete: {
        play() { 
            AudioEngine.playSequence([523, 659, 784, 988], [80, 80, 80, 200], 0.4); // Ascending tones
        }
    },
    
    perfect_score: {
        play() { 
            // Magical ascending tones
            AudioEngine.playSequence([523, 587, 659, 784, 880], [100, 100, 100, 100, 200], 0.4);
        }
    },
    
    // Volume Control
    mute: {
        play() { AudioEngine.playTone(200, 100, 0.2); }
    },
    
    unmute: {
        play() { 
            AudioEngine.playSequence([400, 500], [80, 80], 0.3);
        }
    }
};

// ============================================================
// Sound Utilities
// ============================================================

const SoundUtils = {
    // Mute all sounds
    muteAll() {
        if (AudioEngine.context) {
            AudioEngine.context.suspend();
            Sounds.mute.play();
        }
    },
    
    // Unmute all sounds
    unmuteAll() {
        if (AudioEngine.context) {
            AudioEngine.context.resume();
            Sounds.unmute.play();
        }
    },
    
    // Play sound with fallback
    playSafe(soundName) {
        if (Sounds[soundName] && Sounds[soundName].play) {
            try {
                Sounds[soundName].play();
            } catch (e) {
                // Could not play sound
            }
        }
    },
    
    // Test all sounds
    testSounds() {
        const soundNames = Object.keys(Sounds);
        let index = 0;
        
        const playNext = () => {
            if (index < soundNames.length) {
                Sounds[soundNames[index]].play();
                index++;
                setTimeout(playNext, 500);
            }
        };
        
        playNext();
    }
};

// Initialize AudioEngine
AudioEngine.init();

// Prewarm audio context on first user interaction
document.addEventListener('pointerdown', function _prewarm() {
    AudioEngine.resume().catch(()=>{});
}, { once: true, passive: true });

// Expose Sounds globally for cross-module access
window.Sounds = Sounds;
window.SoundUtils = SoundUtils;
