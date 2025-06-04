// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Observer for about cards
const aboutCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            aboutCardsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer for timeline items
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            timelineObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer for fade-in paragraphs
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize observers
document.addEventListener('DOMContentLoaded', () => {
    // Observe about cards
    document.querySelectorAll('.about-card').forEach(card => {
        aboutCardsObserver.observe(card);
    });

    // Observe timeline content
    document.querySelectorAll('.timeline-content').forEach((content, index) => {
        content.style.transitionDelay = `${index * 0.2}s`;
        timelineObserver.observe(content);
    });

    // Observe paragraphs
    document.querySelectorAll('.about-description p').forEach(p => {
        fadeInObserver.observe(p);
    });

    // Add hover effects for timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const dot = item.querySelector('.timeline-dot');
            const content = item.querySelector('.timeline-content');
            
            if (dot) {
                dot.style.transform = 'scale(1.5)';
                dot.style.transition = 'transform 0.3s ease';
            }
            
            if (content) {
                content.style.transform = 'translateY(-5px)';
                content.style.boxShadow = 'var(--shadow-lg)';
            }
        });

        item.addEventListener('mouseleave', () => {
            const dot = item.querySelector('.timeline-dot');
            const content = item.querySelector('.timeline-content');
            
            if (dot) {
                dot.style.transform = 'scale(1)';
            }
            
            if (content) {
                content.style.transform = 'translateY(0)';
                content.style.boxShadow = 'var(--shadow-md)';
            }
        });
    });

    // Add scroll-triggered animations for timeline blocks
    const timelineBlocks = document.querySelectorAll('.timeline-block');
    timelineBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'all 0.6s ease';
        block.style.transitionDelay = `${index * 0.3}s`;

        const blockObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    blockObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        blockObserver.observe(block);
    });
});

// Parallax effect for profile image
const profileContainer = document.querySelector('.profile-container');
if (profileContainer) {
    window.addEventListener('mousemove', e => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;

        profileContainer.style.transform = `
            translate(${mouseX}px, ${mouseY}px)
            rotateX(${-mouseY}deg)
            rotateY(${mouseX}deg)
        `;
    });
}

// Hover effect for about cards
document.querySelectorAll('.about-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Timeline animation enhancement
document.querySelectorAll('.timeline-content').forEach(content => {
    content.addEventListener('mouseenter', () => {
        content.style.transform = 'scale(1.05)';
        content.style.boxShadow = 'var(--shadow-lg)';
        content.style.transition = 'all 0.3s ease';
    });

    content.addEventListener('mouseleave', () => {
        content.style.transform = 'scale(1)';
        content.style.boxShadow = 'var(--shadow-md)';
    });
});

// Personal info hover effect
document.querySelectorAll('.info-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const label = item.querySelector('.info-label');
        const value = item.querySelector('.info-value');
        
        label.style.transform = 'translateX(10px)';
        value.style.transform = 'translateX(-10px)';
        label.style.transition = 'transform 0.3s ease';
        value.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', () => {
        const label = item.querySelector('.info-label');
        const value = item.querySelector('.info-value');
        
        label.style.transform = 'translateX(0)';
        value.style.transform = 'translateX(0)';
    });
});

// Text reveal animation
const revealText = document.querySelector('.reveal-text');
if (revealText) {
    const text = revealText.textContent;
    revealText.textContent = '';
    
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.3s ease ${i * 0.05}s`;
        revealText.appendChild(span);
    });

    // Trigger animation after a short delay
    setTimeout(() => {
        revealText.querySelectorAll('span').forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }, 500);
}

// Add smooth scroll behavior for timeline
document.querySelector('.timeline').addEventListener('wheel', (e) => {
    if (window.innerWidth > 992) {
        e.preventDefault();
        const timeline = document.querySelector('.timeline');
        timeline.scrollLeft += e.deltaY;
    }
}, { passive: false }); 