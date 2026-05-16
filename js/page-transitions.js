// ========================================
// PAGE TRANSITIONS
// ========================================
class PageTransitions {
  constructor() {
    this.duration = 800;
    this.init();
  }
  
  init() {
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href^="index.html"], a[href^="case-study"]');
    
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleTransition(e));
    });
  }
  
  handleTransition(e) {
    const link = e.currentTarget;
    const href = link.getAttribute('href');
    
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
      return;
    }
    
    e.preventDefault();
    
    let overlay = document.querySelector('.page-transition-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'page-transition-overlay';
      document.body.appendChild(overlay);
    }
    
    overlay.classList.add('active');
    
    setTimeout(() => {
      window.location.href = href;
    }, this.duration);
  }
}

// ========================================
// INITIALIZE
// ========================================
window.addEventListener('DOMContentLoaded', () => {
  new PageTransitions();
  console.log('✨ Page transitions loaded');
});