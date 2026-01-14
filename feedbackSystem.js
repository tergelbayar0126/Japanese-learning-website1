/**
 * Advanced Real-Time Feedback System for Japanese Character Practice
 * Provides live accuracy tracking, stroke hints, animations, and visual comparisons
 * Integrated with DrawEngine for seamless user experience
 */

const FeedbackSystem = {
    // Canvas elements
    feedbackCanvas: null,
    feedbackCtx: null,
    overlayCanvas: null,
    overlayCtx: null,
    
    // State
    currentChar: null,
    currentStrokes: [],
    isAnimating: false,
    animationFrame: 0,
    showHint: false,
    strokeComparison: [],
    
    // Settings
    settings: {
        showRealTimeAccuracy: true,
        showStrokeOrder: true,
        showProgressiveHints: true,
        hintDelay: 3000, // Show hint after 3 seconds of inactivity
        animationSpeed: 50, // ms per animation frame
        comparisonOpacity: 0.3
    },
    
    init() {
        // Create feedback overlay canvas (sits above game canvas)
        this.createOverlayCanvas();
        
        // Initialize feedback UI
        this.createFeedbackUI();
        
        // Set up event listeners
        this.setupEventListeners();
        
        console.log('✓ FeedbackSystem initialized');
    },
    
    createOverlayCanvas() {
        const container = document.querySelector('.game-canvas-container');
        if (!container) return;
        
        // Create transparent overlay for real-time feedback
        this.overlayCanvas = document.createElement('canvas');
        this.overlayCanvas.id = 'feedbackOverlay';
        this.overlayCanvas.width = 350;
        this.overlayCanvas.height = 350;
        this.overlayCanvas.style.position = 'absolute';
        this.overlayCanvas.style.top = '0';
        this.overlayCanvas.style.left = '0';
        this.overlayCanvas.style.pointerEvents = 'none';
        this.overlayCanvas.style.zIndex = '10';
        
        container.appendChild(this.overlayCanvas);
        this.overlayCtx = this.overlayCanvas.getContext('2d');
    },
    
    createFeedbackUI() {
        const gameSection = document.getElementById('stroke-master-challenge');
        if (!gameSection) return;
        
        // Create feedback panel
        const feedbackPanel = document.createElement('div');
        feedbackPanel.id = 'advancedFeedback';
        feedbackPanel.className = 'advanced-feedback-panel';
        feedbackPanel.innerHTML = `
            <div class="feedback-metrics">
                <div class="metric">
                    <span class="metric-label">Real-time Accuracy:</span>
                    <span class="metric-value" id="realtimeAccuracy">--</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Stroke Progress:</span>
                    <span class="metric-value" id="strokeProgress">0/0</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Quality:</span>
                    <span class="metric-value" id="strokeQuality">--</span>
                </div>
            </div>
            <div class="feedback-actions">
                <button id="showHintBtn" class="hint-btn">💡 Show Hint</button>
                <button id="animateStrokeBtn" class="hint-btn">▶ Animate Strokes</button>
                <button id="compareBtn" class="hint-btn">👁 Compare</button>
            </div>
        `;
        
        // Insert after canvas
        const canvasContainer = document.querySelector('.game-canvas-container');
        if (canvasContainer && canvasContainer.nextSibling) {
            canvasContainer.parentNode.insertBefore(feedbackPanel, canvasContainer.nextSibling);
        } else if (canvasContainer) {
            canvasContainer.parentNode.appendChild(feedbackPanel);
        }
    },
    
    setupEventListeners() {
        // Hint button
        const hintBtn = document.getElementById('showHintBtn');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => this.showNextStrokeHint());
        }
        
        // Animation button
        const animateBtn = document.getElementById('animateStrokeBtn');
        if (animateBtn) {
            animateBtn.addEventListener('click', () => this.animateStrokes());
        }
        
        // Compare button
        const compareBtn = document.getElementById('compareBtn');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => this.toggleComparison());
        }
    },
    
    loadCharacter(char) {
        this.currentChar = char;
        this.clear();
        this.updateMetrics(0, 0, 0);
    },
    
    clear() {
        if (this.overlayCtx) {
            this.overlayCtx.clearRect(0, 0, 350, 350);
        }
        this.strokeComparison = [];
    },
    
    // Real-time feedback during drawing
    updateRealTime(userStrokes) {
        if (!this.currentChar || !userStrokes || userStrokes.length === 0) return;
        
        // Get expected strokes
        let expectedStrokes = [];
        if (typeof window.FULL_KANA_DATA !== 'undefined' && window.FULL_KANA_DATA[this.currentChar]) {
            expectedStrokes = window.FULL_KANA_DATA[this.currentChar].strokes || [];
        }
        
        if (expectedStrokes.length === 0 && typeof KanaData !== 'undefined') {
            const data = KanaData[this.currentChar];
            if (data) expectedStrokes = data;
        }
        
        if (expectedStrokes.length === 0) return;
        
        // Calculate real-time accuracy
        const comparison = this.compareStrokes(userStrokes, expectedStrokes);
        const accuracy = comparison.accuracy;
        const matchedCount = comparison.matchedCount;
        const quality = this.calculateQuality(comparison);
        
        // Update metrics display
        this.updateMetrics(accuracy, userStrokes.length, expectedStrokes.length, quality);
        
        // Visual feedback on overlay
        this.drawRealTimeFeedback(comparison);
    },
    
    compareStrokes(userStrokes, expectedStrokes) {
        let matchedCount = 0;
        let totalScore = 0;
        const details = [];
        
        userStrokes.forEach((userStroke, idx) => {
            let bestMatch = 0;
            let bestMatchIdx = -1;
            
            expectedStrokes.forEach((expected, expIdx) => {
                const score = this.scoreStroke(userStroke, expected, idx, expIdx);
                if (score > bestMatch) {
                    bestMatch = score;
                    bestMatchIdx = expIdx;
                }
            });
            
            if (bestMatch >= 0.35) {
                matchedCount++;
            }
            
            totalScore += bestMatch;
            details.push({ strokeIndex: idx, score: bestMatch, matchedWith: bestMatchIdx });
        });
        
        const accuracy = userStrokes.length > 0 ? (totalScore / userStrokes.length) * 100 : 0;
        
        return {
            accuracy: Math.round(accuracy),
            matchedCount,
            totalStrokes: userStrokes.length,
            expectedStrokes: expectedStrokes.length,
            details
        };
    },
    
    scoreStroke(userStroke, expected, userIdx, expIdx) {
        // Simple scoring based on stroke similarity
        // This mirrors the scoring in StrokeData.compare but simplified
        
        if (!userStroke.points || userStroke.points.length < 2) return 0;
        
        const userStart = userStroke.points[0];
        const userEnd = userStroke.points[userStroke.points.length - 1];
        
        let expectedStart, expectedEnd;
        
        // Handle SVG path format
        if (typeof expected === 'string') {
            const coords = this.parseSVGPath(expected);
            if (coords.length < 2) return 0;
            expectedStart = coords[0];
            expectedEnd = coords[coords.length - 1];
        } else if (expected.start && expected.end) {
            expectedStart = expected.start;
            expectedEnd = expected.end;
        } else {
            return 0;
        }
        
        // Calculate distance scores
        const startDist = Math.hypot(userStart.x - expectedStart.x, userStart.y - expectedStart.y);
        const endDist = Math.hypot(userEnd.x - expectedEnd.x, userEnd.y - expectedEnd.y);
        
        const maxDist = 350; // Canvas size
        const startScore = Math.max(0, 1 - (startDist / maxDist));
        const endScore = Math.max(0, 1 - (endDist / maxDist));
        
        // Order penalty
        const orderPenalty = Math.abs(userIdx - expIdx) * 0.1;
        
        return Math.max(0, (startScore + endScore) / 2 - orderPenalty);
    },
    
    parseSVGPath(pathStr) {
        const coords = [];
        const tokens = pathStr.match(/[MLC][^MLC]*/g) || [];
        
        tokens.forEach(token => {
            const cmd = token[0];
            const nums = token.slice(1).trim().split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
            
            if (cmd === 'M' && nums.length >= 2) {
                coords.push({ x: nums[0] * 3.5 + 20, y: nums[1] * 3.5 + 20 });
            } else if (cmd === 'L' && nums.length >= 2) {
                coords.push({ x: nums[0] * 3.5 + 20, y: nums[1] * 3.5 + 20 });
            } else if (cmd === 'C' && nums.length >= 6) {
                coords.push({ x: nums[4] * 3.5 + 20, y: nums[5] * 3.5 + 20 });
            }
        });
        
        return coords;
    },
    
    calculateQuality(comparison) {
        if (comparison.accuracy >= 80) return '⭐ Excellent';
        if (comparison.accuracy >= 60) return '✓ Good';
        if (comparison.accuracy >= 40) return '○ Fair';
        return '△ Needs Work';
    },
    
    updateMetrics(accuracy, currentStrokes, expectedStrokes, quality = '--') {
        const accuracyEl = document.getElementById('realtimeAccuracy');
        const progressEl = document.getElementById('strokeProgress');
        const qualityEl = document.getElementById('strokeQuality');
        
        if (accuracyEl) {
            accuracyEl.textContent = accuracy > 0 ? `${accuracy}%` : '--';
            accuracyEl.style.color = accuracy >= 60 ? '#4CAF50' : accuracy >= 35 ? '#FF9800' : '#F44336';
        }
        
        if (progressEl) {
            progressEl.textContent = `${currentStrokes}/${expectedStrokes}`;
        }
        
        if (qualityEl) {
            qualityEl.textContent = quality;
        }
    },
    
    drawRealTimeFeedback(comparison) {
        if (!this.overlayCtx) return;
        
        this.overlayCtx.clearRect(0, 0, 350, 350);
        
        // Draw accuracy indicator in corner
        this.overlayCtx.font = 'bold 24px sans-serif';
        this.overlayCtx.textAlign = 'right';
        this.overlayCtx.textBaseline = 'top';
        
        const accuracy = comparison.accuracy;
        let color = '#4CAF50'; // Green
        if (accuracy < 60) color = '#FF9800'; // Orange
        if (accuracy < 35) color = '#F44336'; // Red
        
        this.overlayCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.overlayCtx.fillRect(240, 10, 100, 40);
        this.overlayCtx.fillStyle = color;
        this.overlayCtx.fillText(`${accuracy}%`, 330, 20);
    },
    
    showNextStrokeHint() {
        if (!this.currentChar) return;
        
        let strokes = [];
        if (typeof window.FULL_KANA_DATA !== 'undefined' && window.FULL_KANA_DATA[this.currentChar]) {
            strokes = window.FULL_KANA_DATA[this.currentChar].strokes || [];
        }
        
        if (strokes.length === 0 && typeof KanaData !== 'undefined') {
            const data = KanaData[this.currentChar];
            if (data) strokes = data;
        }
        
        if (strokes.length === 0) return;
        
        // Get current user stroke count
        const userStrokeCount = (typeof DrawEngine !== 'undefined' && DrawEngine.strokes) ? 
            DrawEngine.strokes.length : 0;
        
        const nextStrokeIdx = Math.min(userStrokeCount, strokes.length - 1);
        
        // Highlight next stroke
        this.overlayCtx.clearRect(0, 0, 350, 350);
        this.drawSingleStrokeHint(strokes[nextStrokeIdx], nextStrokeIdx);
        
        // Auto-clear after 2 seconds
        setTimeout(() => {
            if (this.overlayCtx) this.overlayCtx.clearRect(0, 0, 350, 350);
        }, 2000);
    },
    
    drawSingleStrokeHint(stroke, index) {
        if (!this.overlayCtx) return;
        
        this.overlayCtx.strokeStyle = 'rgba(76, 175, 80, 0.6)'; // Green
        this.overlayCtx.lineWidth = 6;
        this.overlayCtx.lineCap = 'round';
        this.overlayCtx.setLineDash([10, 5]);
        
        if (typeof stroke === 'string') {
            // SVG path
            this.renderSVGPathHint(stroke);
        } else if (stroke.start && stroke.end) {
            // Simple stroke
            this.overlayCtx.beginPath();
            this.overlayCtx.moveTo(stroke.start.x, stroke.start.y);
            this.overlayCtx.lineTo(stroke.end.x, stroke.end.y);
            this.overlayCtx.stroke();
        }
        
        this.overlayCtx.setLineDash([]);
        
        // Draw stroke number
        const startPoint = this.getStrokeStartPoint(stroke);
        if (startPoint) {
            this.overlayCtx.fillStyle = 'rgba(76, 175, 80, 0.9)';
            this.overlayCtx.font = 'bold 20px sans-serif';
            this.overlayCtx.textAlign = 'center';
            this.overlayCtx.textBaseline = 'middle';
            this.overlayCtx.fillText(`${index + 1}`, startPoint.x, startPoint.y - 15);
        }
    },
    
    renderSVGPathHint(pathStr) {
        const tokens = pathStr.match(/[MLC][^MLC]*/g) || [];
        let pathActive = false;
        
        tokens.forEach(token => {
            const cmd = token[0];
            const nums = token.slice(1).trim().split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
            
            if (cmd === 'M' && nums.length >= 2) {
                const x = nums[0] * 3.5 + 20;
                const y = nums[1] * 3.5 + 20;
                this.overlayCtx.beginPath();
                this.overlayCtx.moveTo(x, y);
                pathActive = true;
            } else if (cmd === 'L' && nums.length >= 2) {
                const x = nums[0] * 3.5 + 20;
                const y = nums[1] * 3.5 + 20;
                this.overlayCtx.lineTo(x, y);
            } else if (cmd === 'C' && nums.length >= 6) {
                const cx1 = nums[0] * 3.5 + 20;
                const cy1 = nums[1] * 3.5 + 20;
                const cx2 = nums[2] * 3.5 + 20;
                const cy2 = nums[3] * 3.5 + 20;
                const x = nums[4] * 3.5 + 20;
                const y = nums[5] * 3.5 + 20;
                this.overlayCtx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
            }
        });
        
        if (pathActive) {
            this.overlayCtx.stroke();
        }
    },
    
    getStrokeStartPoint(stroke) {
        if (typeof stroke === 'string') {
            const coords = this.parseSVGPath(stroke);
            return coords.length > 0 ? coords[0] : null;
        } else if (stroke.start) {
            return stroke.start;
        }
        return null;
    },
    
    animateStrokes() {
        if (!this.currentChar || this.isAnimating) return;
        
        let strokes = [];
        if (typeof window.FULL_KANA_DATA !== 'undefined' && window.FULL_KANA_DATA[this.currentChar]) {
            strokes = window.FULL_KANA_DATA[this.currentChar].strokes || [];
        }
        
        if (strokes.length === 0 && typeof KanaData !== 'undefined') {
            const data = KanaData[this.currentChar];
            if (data) strokes = data;
        }
        
        if (strokes.length === 0) return;
        
        this.isAnimating = true;
        let strokeIdx = 0;
        
        const animateNext = () => {
            if (strokeIdx >= strokes.length) {
                this.isAnimating = false;
                setTimeout(() => {
                    if (this.overlayCtx) this.overlayCtx.clearRect(0, 0, 350, 350);
                }, 1000);
                return;
            }
            
            this.overlayCtx.clearRect(0, 0, 350, 350);
            
            // Draw all previous strokes faded
            for (let i = 0; i < strokeIdx; i++) {
                this.overlayCtx.globalAlpha = 0.3;
                this.drawSingleStrokeHint(strokes[i], i);
                this.overlayCtx.globalAlpha = 1.0;
            }
            
            // Draw current stroke highlighted
            this.drawSingleStrokeHint(strokes[strokeIdx], strokeIdx);
            
            strokeIdx++;
            setTimeout(animateNext, 800);
        };
        
        animateNext();
    },
    
    toggleComparison() {
        if (!this.currentChar) return;
        
        // Show target character overlaid semi-transparently
        this.overlayCtx.clearRect(0, 0, 350, 350);
        
        let strokes = [];
        if (typeof window.FULL_KANA_DATA !== 'undefined' && window.FULL_KANA_DATA[this.currentChar]) {
            strokes = window.FULL_KANA_DATA[this.currentChar].strokes || [];
        }
        
        if (strokes.length === 0) return;
        
        this.overlayCtx.globalAlpha = this.settings.comparisonOpacity;
        this.overlayCtx.strokeStyle = 'rgba(33, 150, 243, 0.8)'; // Blue
        this.overlayCtx.lineWidth = 4;
        this.overlayCtx.lineCap = 'round';
        
        strokes.forEach(stroke => {
            if (typeof stroke === 'string') {
                this.renderSVGPathHint(stroke);
            } else if (stroke.start && stroke.end) {
                this.overlayCtx.beginPath();
                this.overlayCtx.moveTo(stroke.start.x, stroke.start.y);
                this.overlayCtx.lineTo(stroke.end.x, stroke.end.y);
                this.overlayCtx.stroke();
            }
        });
        
        this.overlayCtx.globalAlpha = 1.0;
        
        // Auto-clear after 3 seconds
        setTimeout(() => {
            if (this.overlayCtx) this.overlayCtx.clearRect(0, 0, 350, 350);
        }, 3000);
    },
    
    // Integration with DrawEngine
    onStrokeComplete() {
        if (typeof DrawEngine !== 'undefined' && DrawEngine.strokes) {
            this.updateRealTime(DrawEngine.strokes);
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => FeedbackSystem.init(), 500);
    });
} else {
    setTimeout(() => FeedbackSystem.init(), 500);
}
