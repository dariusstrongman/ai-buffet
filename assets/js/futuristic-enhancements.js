// Futuristic UI Enhancements - Year 3000 Theme
// Advanced micro-interactions, particle effects, and cyberpunk styling

'use strict';

/**
 * Futuristic Enhancement System
 */
const FuturisticUI = {
    isInitialized: false,
    particleSystem: null,
    audioContext: null,
    animationFrameId: null,
    
    // Configuration
    config: {
        particles: {
            count: 50,
            maxSpeed: 2,
            colors: ['#22D3EE', '#10B981', '#8B5CF6', '#EC4899'],
            size: { min: 1, max: 3 }
        },
        glitch: {
            intensity: 0.1,
            frequency: 0.001
        },
        sound: {
            enabled: false, // Disabled by default for accessibility
            volume: 0.1
        }
    }
};

/**
 * Initialize Futuristic Enhancements
 */
function initializeFuturisticUI() {
    if (FuturisticUI.isInitialized) return;
    
    console.log('🚀 Initializing Futuristic UI Enhancements...');
    
    // Initialize components
    initializeParticleSystem();
    initializeHolographicEffects();
    initializeQuantumButtons();
    initializeNeuralNetworkBackground();
    initializeGlitchEffects();
    initializeCyberScrollEffects();
    initializeHoverSoundEffects();
    
    FuturisticUI.isInitialized = true;
    console.log('✅ Futuristic UI Enhancement System active');
}

/**
 * Particle System for Background Animation
 */
function initializeParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    for (let i = 0; i < FuturisticUI.config.particles.count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * FuturisticUI.config.particles.maxSpeed,
            vy: (Math.random() - 0.5) * FuturisticUI.config.particles.maxSpeed,
            size: Math.random() * (FuturisticUI.config.particles.size.max - FuturisticUI.config.particles.size.min) + FuturisticUI.config.particles.size.min,
            color: FuturisticUI.config.particles.colors[Math.floor(Math.random() * FuturisticUI.config.particles.colors.length)],
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
            
            // Add glow effect
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = particles[i].color;
                    ctx.globalAlpha = 0.1 * (1 - distance / 100);
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        
        ctx.globalAlpha = 1;
        FuturisticUI.animationFrameId = requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    FuturisticUI.particleSystem = { canvas, ctx, particles };
}

/**
 * Holographic Effects for Cards and Buttons
 */
function initializeHolographicEffects() {
    const cards = document.querySelectorAll('.card, .tool-card, .btn-primary');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            const tiltX = (yPercent - 50) / 10;
            const tiltY = (50 - xPercent) / 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${tiltX}deg) 
                rotateY(${tiltY}deg) 
                translateZ(10px)
            `;
            
            // Update holographic gradient
            card.style.background = `
                linear-gradient(
                    ${135 + (xPercent - 50) * 0.5}deg, 
                    rgba(34, 211, 238, 0.1) ${Math.max(0, xPercent - 20)}%, 
                    rgba(139, 92, 246, 0.1) ${Math.min(100, xPercent + 20)}%
                )
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.background = '';
        });
    });
}

/**
 * Quantum Button Effects
 */
function initializeQuantumButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-cta');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create quantum ripple effect
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(34,211,238,0.4) 70%, transparent 100%);
                transform: scale(0);
                animation: quantum-ripple 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                left: ${x - 50}px;
                top: ${y - 50}px;
                width: 100px;
                height: 100px;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add quantum ripple keyframes
    if (!document.querySelector('#quantum-animations')) {
        const style = document.createElement('style');
        style.id = 'quantum-animations';
        style.textContent = `
            @keyframes quantum-ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes neural-pulse {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.05); }
            }
            
            @keyframes data-stream {
                0% { transform: translateY(-100%); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Neural Network Background Pattern
 */
function initializeNeuralNetworkBackground() {
    const sections = document.querySelectorAll('.hero, .category-hero');
    
    sections.forEach(section => {
        const networkOverlay = document.createElement('div');
        networkOverlay.className = 'neural-network-overlay';
        networkOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.1) 2px, transparent 2px),
                radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 2px, transparent 2px),
                radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 2px, transparent 2px),
                radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 2px, transparent 2px);
            background-size: 100px 100px, 150px 150px, 120px 120px, 180px 180px;
            animation: neural-pulse 4s ease-in-out infinite alternate;
            pointer-events: none;
            z-index: 0;
        `;
        
        section.style.position = 'relative';
        section.insertBefore(networkOverlay, section.firstChild);
    });
}

/**
 * Subtle Glitch Effects for Headers
 */
function initializeGlitchEffects() {
    const headers = document.querySelectorAll('h1, .logo');
    
    headers.forEach(header => {
        if (Math.random() < 0.3) { // Only 30% of headers get glitch effect
            header.addEventListener('mouseenter', () => {
                header.style.animation = 'glitch 0.3s ease-in-out';
                setTimeout(() => {
                    header.style.animation = '';
                }, 300);
            });
        }
    });
}

/**
 * Cyberpunk Scroll Effects
 */
function initializeCyberScrollEffects() {
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                // Parallax effect for hero sections
                const heroes = document.querySelectorAll('.hero, .category-hero');
                heroes.forEach(hero => {
                    const heroTop = hero.offsetTop;
                    const heroHeight = hero.offsetHeight;
                    const windowHeight = window.innerHeight;
                    
                    if (scrolled + windowHeight > heroTop && scrolled < heroTop + heroHeight) {
                        hero.style.transform = `translateY(${rate * 0.1}px)`;
                    }
                });
                
                // Fade in cards as they come into view
                const cards = document.querySelectorAll('.tool-card, .article-card');
                cards.forEach(card => {
                    const cardTop = card.offsetTop;
                    const cardBottom = cardTop + card.offsetHeight;
                    
                    if (scrolled + window.innerHeight > cardTop + 100 && scrolled < cardBottom) {
                        card.classList.add('fade-in', 'visible');
                    }
                });
                
                isScrolling = false;
            });
        }
        isScrolling = true;
    });
}

/**
 * Hover Sound Effects (Optional)
 */
function initializeHoverSoundEffects() {
    if (!FuturisticUI.config.sound.enabled) return;
    
    try {
        FuturisticUI.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        const buttons = document.querySelectorAll('.btn, .tool-card, .filter-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (FuturisticUI.audioContext) {
                    playHoverSound(220); // A3 note
                }
            });
            
            button.addEventListener('click', () => {
                if (FuturisticUI.audioContext) {
                    playHoverSound(440); // A4 note
                }
            });
        });
    } catch (e) {
        console.log('Audio not available');
    }
}

/**
 * Play Simple Hover Sound
 */
function playHoverSound(frequency) {
    if (!FuturisticUI.audioContext) return;
    
    const oscillator = FuturisticUI.audioContext.createOscillator();
    const gainNode = FuturisticUI.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(FuturisticUI.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, FuturisticUI.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(FuturisticUI.config.sound.volume, FuturisticUI.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, FuturisticUI.audioContext.currentTime + 0.1);
    
    oscillator.start(FuturisticUI.audioContext.currentTime);
    oscillator.stop(FuturisticUI.audioContext.currentTime + 0.1);
}

/**
 * Cleanup Function
 */
function cleanupFuturisticUI() {
    if (FuturisticUI.animationFrameId) {
        cancelAnimationFrame(FuturisticUI.animationFrameId);
    }
    
    if (FuturisticUI.particleSystem && FuturisticUI.particleSystem.canvas) {
        FuturisticUI.particleSystem.canvas.remove();
    }
    
    if (FuturisticUI.audioContext) {
        FuturisticUI.audioContext.close();
    }
}

/**
 * Initialize when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to let other scripts load first
    setTimeout(initializeFuturisticUI, 1000);
});

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', cleanupFuturisticUI);

/**
 * Reduced motion support
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    FuturisticUI.config.particles.count = 10;
    console.log('🎯 Reduced motion detected - minimizing animations');
}

/**
 * Export for global access
 */
if (typeof window !== 'undefined') {
    window.FuturisticUI = FuturisticUI;
    window.initializeFuturisticUI = initializeFuturisticUI;
    window.cleanupFuturisticUI = cleanupFuturisticUI;
}