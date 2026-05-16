// ========================================
// HERO PARTICLE SYSTEM
// ========================================
class HeroParticles {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mousePos = { x: 0, y: 0 };
    this.init();
  }
  
  init() {
    this.canvas.id = 'hero-particles';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '2';
    
    const hero = document.querySelector('#hero');
    if (hero) {
      hero.insertBefore(this.canvas, hero.firstChild);
    }
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    document.addEventListener('mousemove', (e) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
    });
    
    this.createParticles();
    this.animate();
  }
  
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  
  createParticles() {
    const count = 50;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      const dx = this.mousePos.x - particle.x;
      const dy = this.mousePos.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.x -= dx * force * 0.03;
        particle.y -= dy * force * 0.03;
      }
      
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.particles.forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// ========================================
// HERO 3D TILT EFFECT
// ========================================
class Hero3DTilt {
  constructor() {
    this.hero = document.querySelector('#hero');
    this.layers = document.querySelectorAll('.chrome-name-text, .chrome-portfolio-text, .hero-info, .hero-year-badge');
    this.mousePos = { x: 0, y: 0 };
    this.targetPos = { x: 0, y: 0 };
    this.init();
  }
  
  init() {
    if (!this.hero) return;
    
    this.hero.addEventListener('mousemove', (e) => {
      const rect = this.hero.getBoundingClientRect();
      this.targetPos.x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      this.targetPos.y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    });
    
    this.hero.addEventListener('mouseleave', () => {
      this.targetPos.x = 0;
      this.targetPos.y = 0;
    });
    
    this.animate();
  }
  
  animate() {
    this.mousePos.x += (this.targetPos.x - this.mousePos.x) * 0.1;
    this.mousePos.y += (this.targetPos.y - this.mousePos.y) * 0.1;
    
    this.layers.forEach((layer, index) => {
      const depth = (index + 1) * 5;
      const rotateX = this.mousePos.y * depth;
      const rotateY = -this.mousePos.x * depth;
      const translateZ = Math.abs(this.mousePos.x * depth);
      
      layer.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(${translateZ}px)
      `;
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// ========================================
// ENHANCED ENTRANCE ANIMATIONS
// ========================================
class HeroEntrance {
  constructor() {
    this.elements = [
      { selector: '.hero-label', delay: 200 },
      { selector: '.chrome-name-text', delay: 400 },
      { selector: '.chrome-portfolio-text', delay: 600 },
      { selector: '.hero-info', delay: 800 },
      { selector: '.hero-scroll', delay: 1000 },
      { selector: '.hero-year-badge', delay: 1000 }
    ];
    this.init();
  }
  
  init() {
    this.elements.forEach(item => {
      const el = document.querySelector(item.selector);
      if (el) {
        setTimeout(() => {
          el.classList.add('vis');
        }, item.delay);
      }
    });
  }
}

// ========================================
// INITIALIZE
// ========================================
window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#hero')) {
    new HeroParticles();
    new Hero3DTilt();
    new HeroEntrance();
    console.log('✨ Hero effects loaded');
  }
});