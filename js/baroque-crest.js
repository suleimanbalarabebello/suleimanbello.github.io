// ========================================
// 3D BAROQUE CREST WITH THREE.JS
// ========================================
class BaroqueCrest {
  constructor() {
    this.container = document.querySelector('#baroque-crest-container');
    if (!this.container) return;
    
    this.scrollProgress = 0;
    this.targetRotation = { x: 0, y: 0, z: 0 };
    this.currentRotation = { x: 0, y: 0, z: 0 };
    
    this.init();
  }
  
  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.container.offsetWidth / this.container.offsetHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0xffd700, 2, 100);
    pointLight1.position.set(5, 5, 5);
    this.scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xc8a882, 1.5, 100);
    pointLight2.position.set(-5, -5, 5);
    this.scene.add(pointLight2);
    
    // Create baroque crest
    this.createCrest();
    
    // Create particles
    this.createParticles();
    
    // Handle scroll
    window.addEventListener('scroll', () => this.onScroll());
    
    // Handle resize
    window.addEventListener('resize', () => this.onResize());
    
    // Animate
    this.animate();
  }
  
  createCrest() {
    // Main ornate group
    this.crestGroup = new THREE.Group();
    
    // Gold material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc8a882,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x8b7355,
      emissiveIntensity: 0.2
    });
    
    // Center ornate knot
    const knotGeometry = new THREE.TorusKnotGeometry(0.8, 0.25, 128, 16, 3, 7);
    const centerKnot = new THREE.Mesh(knotGeometry, goldMaterial);
    this.crestGroup.add(centerKnot);
    
    // Outer ring
    const ringGeometry = new THREE.TorusGeometry(1.8, 0.08, 16, 100);
    const ring = new THREE.Mesh(ringGeometry, goldMaterial);
    this.crestGroup.add(ring);
    
    // Decorative spheres around the ring
    const sphereGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const sphereCount = 8;
    
    for (let i = 0; i < sphereCount; i++) {
      const angle = (i / sphereCount) * Math.PI * 2;
      const sphere = new THREE.Mesh(sphereGeometry, goldMaterial);
      sphere.position.x = Math.cos(angle) * 1.8;
      sphere.position.y = Math.sin(angle) * 1.8;
      this.crestGroup.add(sphere);
    }
    
    // Inner decorative ring
    const innerRingGeometry = new THREE.TorusGeometry(1.2, 0.05, 16, 100);
    const innerRing = new THREE.Mesh(innerRingGeometry, goldMaterial);
    this.crestGroup.add(innerRing);
    
    this.scene.add(this.crestGroup);
  }
  
  createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xc8a882,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);
  }
  
  onScroll() {
    const rect = this.container.getBoundingClientRect();
    const containerTop = rect.top;
    const containerHeight = rect.height;
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress (0 to 1)
    const scrollStart = windowHeight;
    const scrollEnd = -containerHeight;
    const scrollRange = scrollStart - scrollEnd;
    const currentScroll = containerTop;
    
    this.scrollProgress = 1 - Math.max(0, Math.min(1, (currentScroll - scrollEnd) / scrollRange));
    
    // Update target rotation based on scroll
    this.targetRotation.y = this.scrollProgress * Math.PI * 4;
    this.targetRotation.x = Math.sin(this.scrollProgress * Math.PI) * 0.5;
    this.targetRotation.z = this.scrollProgress * Math.PI * 2;
  }
  
  onResize() {
    this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
  }
  
  animate() {
    // Smooth rotation
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;
    this.currentRotation.z += (this.targetRotation.z - this.currentRotation.z) * 0.05;
    
    this.crestGroup.rotation.x = this.currentRotation.x;
    this.crestGroup.rotation.y = this.currentRotation.y;
    this.crestGroup.rotation.z = this.currentRotation.z;
    
    // Rotate particles slowly
    if (this.particles) {
      this.particles.rotation.y += 0.001;
    }
    
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
  }
}

// ========================================
// INITIALIZE
// ========================================
window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#baroque-crest-container')) {
    new BaroqueCrest();
    console.log('✨ Baroque crest loaded');
  }
});