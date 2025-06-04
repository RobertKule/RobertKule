// Project filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.add('visible');
            }, 100);
        } else {
            card.classList.remove('visible');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        filterProjects(btn.dataset.filter);
    });
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Observer for project cards
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            projectObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer for GitHub stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumber(entry.target.querySelector('.stat-number'));
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Number animation function
function animateNumber(element) {
    const finalNumber = parseInt(element.textContent);
    let currentNumber = 0;
    const duration = 2000; // 2 seconds
    const stepTime = 50; // Update every 50ms
    const steps = duration / stepTime;
    const increment = finalNumber / steps;

    const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            element.textContent = finalNumber + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentNumber) + '+';
        }
    }, stepTime);
}

// Initialize observers
document.addEventListener('DOMContentLoaded', () => {
    // Observe project cards
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });

    // Observe GitHub stats
    document.querySelectorAll('.stat-card').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add hover effects for project cards
    projectCards.forEach(card => {
        const links = card.querySelectorAll('.project-link');
        
        card.addEventListener('mouseenter', () => {
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'translateY(0)';
                    link.style.opacity = '1';
                }, index * 100);
            });
        });

        card.addEventListener('mouseleave', () => {
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'translateY(20px)';
                    link.style.opacity = '0';
                }, index * 100);
            });
        });
    });

    // Animate section intro
    const sectionIntro = document.querySelector('.section-intro');
    if (sectionIntro) {
        sectionIntro.classList.add('fade-in');
    }

    // Initialize GitHub activity calendar
    // Note: You'll need to integrate with GitHub's API or use a library like github-calendar
    const githubCalendar = document.querySelector('.github-calendar');
    if (githubCalendar) {
        // Example: Add placeholder content
        githubCalendar.innerHTML = `
            <div style="text-align: center; padding: var(--spacing-lg);">
                <p>GitHub activity calendar will be displayed here.</p>
                <p>Integration with GitHub API required.</p>
            </div>
        `;
    }

    // Add parallax effect to project cards
    window.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        projectCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const distanceX = (e.clientX - cardCenterX) / 30;
            const distanceY = (e.clientY - cardCenterY) / 30;

            card.style.transform = `
                perspective(1000px)
                rotateY(${distanceX}deg)
                rotateX(${-distanceY}deg)
                translateZ(10px)
            `;
        });
    });

    // Reset card transform on mouse leave
    window.addEventListener('mouseleave', () => {
        projectCards.forEach(card => {
            card.style.transform = 'none';
        });
    });
}); 