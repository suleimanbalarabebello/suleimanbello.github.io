// ========================================
// PARALLAX SCROLL EFFECT
// ========================================
class ParallaxScroll {
  constructor() {
    this.images = document.querySelectorAll('.cs-image img, .cs-image video');
    this.ticking = false;
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.updateParallax();
          this.ticking = false;
        });
        this.ticking = true;
      }
    });
  }
  
  updateParallax() {
    this.images.forEach(img => {
      const rect = img.getBoundingClientRect();
      const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      
      if (scrollPercent > 0 && scrollPercent < 1) {
        const yOffset = (scrollPercent - 0.5) * 30;
        img.style.transform = `translateY(${yOffset}px)`;
      }
    });
  }
}

// ========================================
// INITIALIZE
// ========================================
window.addEventListener('DOMContentLoaded', () => {
  new ParallaxScroll();
  console.log('✨ Parallax loaded');
});