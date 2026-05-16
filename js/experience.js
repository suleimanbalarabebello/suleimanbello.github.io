// ========================================
// ENHANCED CURSOR
// ========================================
class EnhancedCursor {
  constructor() {
    this.cursor = document.querySelector('.cursor');
    this.cursorBig = document.querySelector('.cursor-big');
    
    if (!this.cursor || !this.cursorBig) {
      console.warn('Cursor elements not found');
      return;
    }
    
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.cursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.bigCursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    this.cursor.style.left = this.mouse.x + 'px';
    this.cursor.style.top = this.mouse.y + 'px';
    this.cursorBig.style.left = this.mouse.x + 'px';
    this.cursorBig.style.top = this.mouse.y + 'px';
    
    this.init();
  }
  
  init() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.createTrail(e.clientX, e.clientY);
    });
    
    const hoverElements = document.querySelectorAll('a, button, .cs-image, .cs-video, .cs-stat, .cs-next-btn');
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('cursor-hover');
        this.cursorBig.classList.add('cursor-big-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('cursor-hover');
        this.cursorBig.classList.remove('cursor-big-hover');
      });
    });
    
    this.animate();
  }
  
  createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail-dot';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 400);
  }
  
  animate() {
    this.cursorPos.x += (this.mouse.x - this.cursorPos.x) * 0.15;
    this.cursorPos.y += (this.mouse.y - this.cursorPos.y) * 0.15;
    
    this.bigCursorPos.x += (this.mouse.x - this.bigCursorPos.x) * 0.08;
    this.bigCursorPos.y += (this.mouse.y - this.bigCursorPos.y) * 0.08;
    
    if (this.cursor && this.cursorBig) {
      this.cursor.style.left = this.cursorPos.x + 'px';
      this.cursor.style.top = this.cursorPos.y + 'px';
      
      this.cursorBig.style.left = this.bigCursorPos.x + 'px';
      this.cursorBig.style.top = this.bigCursorPos.y + 'px';
    }
    
    requestAnimationFrame(() => this.animate());
  }
}

// ========================================
// INITIALIZE
// ========================================
window.addEventListener('DOMContentLoaded', () => {
  new EnhancedCursor();
  console.log('✨ Experience loaded');
});