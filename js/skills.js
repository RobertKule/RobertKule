// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Observer for skill items
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const progressBar = entry.target.querySelector('.skill-progress');
            const level = entry.target.dataset.level;
            if (progressBar) {
                progressBar.style.transform = `scaleX(${level / 100})`;
            }
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer for language circles
const languagesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circle = entry.target;
            const progress = circle.dataset.progress;
            circle.style.background = `conic-gradient(
                var(--primary) ${progress}%,
                var(--border-color) ${progress}%
            )`;
            circle.classList.add('animate');
            languagesObserver.unobserve(circle);
        }
    });
}, observerOptions);

// Initialize observers
document.addEventListener('DOMContentLoaded', () => {
    // Observe skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        skillsObserver.observe(item);
    });

    // Observe language circles
    document.querySelectorAll('.language-circle').forEach(circle => {
        languagesObserver.observe(circle);
    });

    // Add hover effects for tools
    document.querySelectorAll('.tool-item').forEach(tool => {
        tool.addEventListener('mouseenter', () => {
            const icon = tool.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
        });

        tool.addEventListener('mouseleave', () => {
            const icon = tool.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add hover effects for certification cards
    document.querySelectorAll('.certification-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.certification-icon');
            icon.style.transform = 'scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.certification-icon');
            icon.style.transform = 'scale(1)';
        });
    });

    // Animate section intro
    const sectionIntro = document.querySelector('.section-intro');
    if (sectionIntro) {
        sectionIntro.classList.add('fade-in');
    }

    // Add scroll-triggered animations for skills categories
    const skillsCategories = document.querySelectorAll('.skills-category');
    skillsCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = 'all 0.6s ease';
        category.style.transitionDelay = `${index * 0.2}s`;

        const categoryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    categoryObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        categoryObserver.observe(category);
    });

    // Add parallax effect to certifications
    const certifications = document.querySelector('.certifications');
    if (certifications) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            certifications.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }
}); 