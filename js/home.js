// Typewriter Effect
class Typewriter {
    constructor(element) {
        this.element = element;
        this.words = JSON.parse(element.getAttribute('data-text'));
        this.wait = parseInt(element.getAttribute('data-wait') || 3000);
        this.currentWordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        // Add or remove characters
        if (this.isDeleting) {
            this.txt = currentWord.substring(0, this.txt.length - 1);
        } else {
            this.txt = currentWord.substring(0, this.txt.length + 1);
        }

        // Update DOM
        this.element.textContent = this.txt;

        // Initial typing speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2; // Faster when deleting
        }

        // Check if word is complete
        if (!this.isDeleting && this.txt === currentWord) {
            typeSpeed = this.wait; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('.hero');
    const profileContainer = document.querySelector('.profile-container');
    const techStack = document.querySelector('.tech-stack');
    
    window.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        if (profileContainer) {
            profileContainer.style.transform = `
                translate(
                    ${mouseX * 20}px,
                    ${mouseY * 20}px
                )
            `;
        }
        
        if (techStack) {
            techStack.style.transform = `
                translate(
                    ${mouseX * -30}px,
                    ${mouseY * -30}px
                )
            `;
        }
    });
}

// Floating Animation for Tech Icons
function initFloatingAnimation() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach((icon, index) => {
        icon.style.animation = `
            floating ${2 + Math.random()}s ease-in-out infinite ${index * 0.2}s
        `;
    });
}

// Scroll Animation
function initScrollAnimation() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.7';
        }
    });
}

// Initialize Glitch Effect
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        const text = glitchText.textContent;
        glitchText.setAttribute('data-text', text);
    }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typewriter effect
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        new Typewriter(typewriterElement);
    }
    
    // Initialize other effects
    initParallax();
    initFloatingAnimation();
    initScrollAnimation();
    initGlitchEffect();
    
    // Add animation classes to elements
    document.querySelector('.hero-text').classList.add('slide-in');
    document.querySelector('.hero-visual').classList.add('slide-up');
    
    // Add floating animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
    `;
    document.head.appendChild(style);
}); 