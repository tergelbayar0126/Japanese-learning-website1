// Writing Practice App (standalone)
(function() {
  'use strict';

  const writingApp = {
    canvas: null,
    ctx: null,
    strokeSvg: null,
    charSelect: null,
    clearBtn: null,
    downloadBtn: null,
    undoBtn: null,
    lineWidthRange: null,
    targetOpacity: null,
    lineWidthVal: null,
    opacityVal: null,

    initialized: false,
    listeners: [], // Track listeners for cleanup
    resizeObserver: null,

    drawing: false,
    last: null,
    strokes: [],

    init: function() {
      if (this.initialized) return;
      this.canvas = document.getElementById('wp-app-draw-canvas');
      this.strokeSvg = document.getElementById('wp-app-stroke-svg');
      this.charSelect = document.getElementById('wp-app-char-select');
      this.clearBtn = document.getElementById('wp-app-clear-btn');
      this.downloadBtn = document.getElementById('wp-app-download-btn');
      this.undoBtn = document.getElementById('wp-app-undo-btn');
      this.lineWidthRange = document.getElementById('wp-app-line-width');
      this.targetOpacity = document.getElementById('wp-app-target-opacity');
      this.lineWidthVal = document.getElementById('wp-app-line-width-val');
      this.opacityVal = document.getElementById('wp-app-opacity-val');

      if (!this.canvas) return; // Don't run if the new elements aren't here

      if ((!window.AuthenticKanaData && !window.FULL_KANA_DATA) || (typeof window.AuthenticKanaData !== 'object' && typeof window.FULL_KANA_DATA !== 'object')) {
        if (typeof DEBUG !== 'undefined' && DEBUG) console.error('Character data not found — writing practice cannot load characters');
        alert('Character data not available. Please reload the page.');
        return;
      }

      this.ctx = this.canvas.getContext('2d');
      if (this.strokeSvg) {
        this.strokeSvg.setAttribute('viewBox', '0 0 140 140');
      }
      this.populateCharSelect();
      this.attachListeners();
      this.resizeCanvas();
      this.redraw();
      this.initialized = true;
    },

    getStrokeData: function(char) {
      // Prioritize authentic stroke data, fall back to FULL_KANA_DATA
      let strokeArray = null;
      
      if (window.AuthenticKanaData && window.AuthenticKanaData[char]) {
        strokeArray = window.AuthenticKanaData[char];
        // Convert from {start:{x,y}, end:{x,y}} format to SVG path strings
        return {
          strokes: strokeArray.map(stroke => {
            const s = stroke.start;
            const e = stroke.end;
            return `M${s.x} ${s.y} L${e.x} ${e.y}`;
          })
        };
      } else if (window.FULL_KANA_DATA && window.FULL_KANA_DATA[char]) {
        return window.FULL_KANA_DATA[char];
      }
      return null;
    },

    populateCharSelect: function() {
        if (!this.charSelect) return;
        
        // Combine characters from AuthenticKanaData, FULL_KANA_DATA, and kanji list
        const authenticChars = window.AuthenticKanaData ? Object.keys(window.AuthenticKanaData) : [];
        const kanaChars = window.FULL_KANA_DATA ? Object.keys(window.FULL_KANA_DATA) : [];
        const kanjiList = [
          "日","月","火","水","木","金","土",
          "本","人","口","山","川","田","中","大","小","上","下","左","右",
          "名","女","男","子","目","耳",
          "手","心","学","校","生","先","年","時","車","電","天","気","王","玉"
        ];
        
        const allChars = [...new Set([...authenticChars, ...kanaChars, ...kanjiList])].sort((a, b) => a.localeCompare(b, 'ja')); // Create a unique, sorted set
        
        this.charSelect.innerHTML = ''; // Clear existing options
        allChars.forEach(char => {
            const option = document.createElement('option');
            option.value = char;
            option.textContent = char;
            this.charSelect.appendChild(option);
        });

        if (this.charSelect.options.length > 0) {
          this.charSelect.value = this.charSelect.options[0].value;
        }

        if (this.lineWidthVal && this.lineWidthRange) {
          this.lineWidthVal.textContent = this.lineWidthRange.value;
        }
        if (this.opacityVal && this.targetOpacity) {
          this.opacityVal.textContent = `${this.targetOpacity.value}%`;
        }
    },

    resizeCanvas: function() {
      const container = this.canvas.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      this.canvas.width = Math.floor(rect.width * dpr);
      this.canvas.height = Math.floor(rect.height * dpr);
      this.canvas.style.width = `${rect.width}px`;
      this.canvas.style.height = `${rect.height}px`;
      
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.redraw();
    },

    drawTarget: function() {
      const w = this.canvas.clientWidth;
      const h = this.canvas.clientHeight;
      this.ctx.clearRect(0, 0, w, h);

      // Grid
      this.ctx.lineWidth = 0.5;
      this.ctx.strokeStyle = document.body.classList.contains('dark-mode') ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
      for (let x = 0; x < w; x += w / 10) {
        this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, h); this.ctx.stroke();
      }
      for (let y = 0; y < h; y += h / 10) {
        this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(w, y); this.ctx.stroke();
      }

      // Target character: if stroke data exists, let canvas strokes guide; otherwise show glyph as guide
      const char = this.charSelect.value || 'あ';
      const strokeData = this.getStrokeData(char);
      if (!strokeData || !Array.isArray(strokeData.strokes)) {
        const fontSize = Math.floor(Math.min(w, h) * 0.8);
        const opacity = (this.targetOpacity.value / 100).toFixed(2);
        this.ctx.fillStyle = document.body.classList.contains('dark-mode') ? `rgba(200, 220, 255, ${opacity})` : `rgba(93, 78, 109, ${opacity})`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = `600 ${fontSize}px "Yu Gothic", "Meiryo", sans-serif`;
        this.ctx.fillText(char, w / 2, h / 2 + (fontSize * 0.05));
      } else {
        // If stroke data exists, render faded strokes
        const opacity = (this.targetOpacity.value / 100).toFixed(2);
        this.ctx.save();
        const vb = 140; // match stroke data viewBox
        this.ctx.scale(w / vb, h / vb);
        
        // Calculate bounding box to center the strokes
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        
        strokeData.strokes.forEach(pathStr => {
          const path = new Path2D(pathStr);
          // Parse path to get approximate bounds
          const matches = pathStr.match(/[\d.]+/g);
          if (matches) {
            for (let i = 0; i < matches.length; i += 2) {
              const x = parseFloat(matches[i]);
              const y = parseFloat(matches[i + 1]);
              if (!isNaN(x) && !isNaN(y)) {
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
              }
            }
          }
        });
        
        // Calculate centering offset
        const contentWidth = maxX - minX;
        const contentHeight = maxY - minY;
        const offsetX = (140 - contentWidth) / 2 - minX;
        const offsetY = (140 - contentHeight) / 2 - minY;
        
        // Apply centering transform
        this.ctx.translate(offsetX, offsetY);
        
        this.ctx.lineWidth = 3 / (w / vb);
        this.ctx.strokeStyle = document.body.classList.contains('dark-mode') ? `rgba(200, 220, 255, ${opacity})` : `rgba(93, 78, 109, ${opacity})`;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        strokeData.strokes.forEach(pathStr => {
          const path = new Path2D(pathStr);
          this.ctx.stroke(path);
        });
        this.ctx.restore();
      }

      this.renderSvgGuide(char, strokeData);
    },

    renderSvgGuide: function(char, strokeData) {
      if (!this.strokeSvg) return;
      const svg = this.strokeSvg;
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      // Build grid pattern
      const ns = 'http://www.w3.org/2000/svg';
      const defs = document.createElementNS(ns, 'defs');
      const pattern = document.createElementNS(ns, 'pattern');
      pattern.setAttribute('id', 'wp-grid');
      pattern.setAttribute('width', '10');
      pattern.setAttribute('height', '10');
      pattern.setAttribute('patternUnits', 'userSpaceOnUse');
      const rect = document.createElementNS(ns, 'rect');
      rect.setAttribute('width', '10');
      rect.setAttribute('height', '10');
      rect.setAttribute('fill', 'none');
      rect.setAttribute('stroke', '#e0d9cf');
      rect.setAttribute('stroke-width', '0.4');
      pattern.appendChild(rect);
      defs.appendChild(pattern);
      svg.appendChild(defs);

      const bg = document.createElementNS(ns, 'rect');
      bg.setAttribute('width', '100%');
      bg.setAttribute('height', '100%');
      bg.setAttribute('fill', 'url(#wp-grid)');
      svg.appendChild(bg);

      if (!strokeData || !Array.isArray(strokeData.strokes)) return;

      // Calculate bounding box of all strokes to center them
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      
      strokeData.strokes.forEach((d) => {
        const tempPath = document.createElementNS(ns, 'path');
        tempPath.setAttribute('d', d);
        svg.appendChild(tempPath);
        
        try {
          const bbox = tempPath.getBBox();
          minX = Math.min(minX, bbox.x);
          minY = Math.min(minY, bbox.y);
          maxX = Math.max(maxX, bbox.x + bbox.width);
          maxY = Math.max(maxY, bbox.y + bbox.height);
        } catch(e) {
          // Ignore if getBBox fails
        }
        
        svg.removeChild(tempPath);
      });

      // Calculate centering offset for 140x140 viewBox
      const contentWidth = maxX - minX;
      const contentHeight = maxY - minY;
      const offsetX = (140 - contentWidth) / 2 - minX;
      const offsetY = (140 - contentHeight) / 2 - minY;

      // Create a group with centering transform
      const group = document.createElementNS(ns, 'g');
      group.setAttribute('transform', `translate(${offsetX}, ${offsetY})`);
      
      strokeData.strokes.forEach((d, idx) => {
        const p = document.createElementNS(ns, 'path');
        p.setAttribute('d', d);
        p.setAttribute('fill', 'none');
        p.setAttribute('stroke', '#5d4e6d');
        p.setAttribute('stroke-width', '4');
        p.setAttribute('stroke-linecap', 'round');
        p.setAttribute('stroke-linejoin', 'round');
        p.setAttribute('opacity', '0.55');
        group.appendChild(p);

        try {
          const len = p.getTotalLength();
          const pt = p.getPointAtLength(Math.min(len * 0.08, len));
          const label = document.createElementNS(ns, 'text');
          label.textContent = String(idx + 1);
          label.setAttribute('x', pt.x);
          label.setAttribute('y', pt.y);
          label.setAttribute('fill', '#8b6f47');
          label.setAttribute('font-size', '10');
          label.setAttribute('font-weight', '700');
          label.setAttribute('text-anchor', 'middle');
          label.setAttribute('dominant-baseline', 'middle');
          group.appendChild(label);
        } catch (e) {
          /* skip label if path metrics fail */
        }
      });
      
      svg.appendChild(group);
    },

    redraw: function() {
      this.drawTarget();
      for (const stroke of this.strokes) {
        this.ctx.beginPath();
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = stroke.width;
        this.ctx.strokeStyle = stroke.color;
        this.ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          this.ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        this.ctx.stroke();
      }
    },

    screenToCanvas: function(e) {
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
      const y = (e.clientY ?? e.touches?.[0]?.clientY) - rect.top;
      return { x, y };
    },

    pointerDown: function(e) {
      e.preventDefault();
      this.drawing = true;
      this.last = this.screenToCanvas(e);
      const brushColor = document.body.classList.contains('dark-mode') ? 'rgba(206, 187, 255, 0.95)' : 'rgba(45, 40, 80, 0.95)';
      const stroke = { width: parseInt(this.lineWidthRange.value, 10), color: brushColor, points: [this.last] };
      this.strokes.push(stroke);
    },

    pointerMove: function(e) {
      if (!this.drawing) return;
      e.preventDefault();
      const p = this.screenToCanvas(e);
      const currentStroke = this.strokes[this.strokes.length - 1];
      currentStroke.points.push(p);

      this.ctx.beginPath();
      this.ctx.lineJoin = 'round';
      this.ctx.lineCap = 'round';
      this.ctx.lineWidth = currentStroke.width;
      this.ctx.strokeStyle = currentStroke.color;
      this.ctx.moveTo(this.last.x, this.last.y);
      this.ctx.lineTo(p.x, p.y);
      this.ctx.stroke();
      this.last = p;
    },

    pointerUp: function() {
      this.drawing = false;
      this.last = null;
    },

    attachListeners: function() {
      const pointerDownHandler = this.pointerDown.bind(this);
      const pointerMoveHandler = this.pointerMove.bind(this);
      const pointerUpHandler = this.pointerUp.bind(this);
      
      this.canvas.addEventListener('pointerdown', pointerDownHandler);
      this.canvas.addEventListener('pointermove', pointerMoveHandler);
      window.addEventListener('pointerup', pointerUpHandler);
      
      this.listeners.push(
        { el: this.canvas, type: 'pointerdown', handler: pointerDownHandler },
        { el: this.canvas, type: 'pointermove', handler: pointerMoveHandler },
        { el: window, type: 'pointerup', handler: pointerUpHandler }
      );

      const clearHandler = () => { this.strokes = []; this.redraw(); };
      const undoHandler = () => { this.strokes.pop(); this.redraw(); };
      const downloadHandler = this.downloadImage.bind(this);
      
      this.clearBtn.addEventListener('click', clearHandler);
      this.undoBtn.addEventListener('click', undoHandler);
      this.downloadBtn.addEventListener('click', downloadHandler);
      
      this.listeners.push(
        { el: this.clearBtn, type: 'click', handler: clearHandler },
        { el: this.undoBtn, type: 'click', handler: undoHandler },
        { el: this.downloadBtn, type: 'click', handler: downloadHandler }
      );

      const charChangeHandler = () => this.redraw();
      const lineWidthHandler = () => {
        if(this.lineWidthVal) this.lineWidthVal.textContent = this.lineWidthRange.value;
      };
      const opacityHandler = () => {
        if(this.opacityVal) this.opacityVal.textContent = `${this.targetOpacity.value}%`;
        this.redraw();
      };
      
      this.charSelect.addEventListener('change', charChangeHandler);
      this.lineWidthRange.addEventListener('input', lineWidthHandler);
      this.targetOpacity.addEventListener('input', opacityHandler);
      
      this.listeners.push(
        { el: this.charSelect, type: 'change', handler: charChangeHandler },
        { el: this.lineWidthRange, type: 'input', handler: lineWidthHandler },
        { el: this.targetOpacity, type: 'input', handler: opacityHandler }
      );

      const keydownHandler = (e) => {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT') return;
        if (e.key === 'c' || e.key === 'C') { this.strokes = []; this.redraw(); e.preventDefault(); }
        if (e.key === 'z' || e.key === 'Z') { this.strokes.pop(); this.redraw(); e.preventDefault(); }
        if (e.key === 's' || e.key === 'S') { this.downloadImage(); e.preventDefault(); }
      };
      window.addEventListener('keydown', keydownHandler);
      this.listeners.push({ el: window, type: 'keydown', handler: keydownHandler });
      
      this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
      this.resizeObserver.observe(this.canvas.parentElement);
    },

    downloadImage: function() {
      const out = document.createElement('canvas');
      out.width = this.canvas.width;
      out.height = this.canvas.height;
      const octx = out.getContext('2d');
      
      const bgColor = document.body.classList.contains('dark-mode') ? '#1a1a24' : '#fdfcfa';
      octx.fillStyle = bgColor;
      octx.fillRect(0, 0, out.width, out.height);
      
      octx.drawImage(this.canvas, 0, 0);

      const link = document.createElement('a');
      link.download = `${this.charSelect.value || 'character'}.png`;
      link.href = out.toDataURL('image/png');
      link.click();
    },

    cleanup: function() {
      // Remove all event listeners
      this.listeners.forEach(({ el, type, handler }) => {
        el.removeEventListener(type, handler);
      });
      this.listeners = [];
      
      // Disconnect resize observer
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
      
      // Clear canvas
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
      
      this.initialized = false;
    }
  };

  // Initialize when writing section is shown
  const originalShowSection = window.UI.showSection;
  let writingInitialized = false;
  
  window.UI.showSection = function(name) {
    originalShowSection.call(this, name);
    
    if (name === 'writing' && !writingInitialized) {
      writingInitialized = true;
      // Use a small timeout to ensure the section is visible and sized correctly
      setTimeout(() => writingApp.init(), 50);
    }
  };

  // Fallback: if writing section is already visible on load, or navigation never calls showSection
  document.addEventListener('DOMContentLoaded', () => {
    const writingSection = document.getElementById('writing');
    const isVisible = writingSection && !writingSection.classList.contains('hidden');
    if (isVisible) {
      writingApp.init();
    }
  });
  
  // Also listen for dark mode changes to redraw canvas
  const darkModeBtn = document.getElementById("darkModeBtn");
  if(darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
      // Redraw after a short delay to allow styles to apply
      setTimeout(() => {
        if(writingInitialized) writingApp.redraw();
      }, 50);
    });
  }

  // Expose a small bridge for other sections (curriculum buttons, etc.)
  window.WritingPractice = {
    loadCharacter: (char) => {
      if (!writingInitialized) {
        writingApp.init();
        writingInitialized = true;
      }
      if (writingApp.charSelect && char) {
        writingApp.charSelect.value = char;
      }
      writingApp.redraw();
    }
  };
})();
