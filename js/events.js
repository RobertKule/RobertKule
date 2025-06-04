document.addEventListener('DOMContentLoaded', function() {
    // Initialize Vanilla-tilt for event cards
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.05
    });

    // Animate timeline years on scroll
    const timelineYears = document.querySelectorAll('.year');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    timelineYears.forEach(year => {
        timelineObserver.observe(year);
    });

    // Animate event cards on scroll
    const eventCards = document.querySelectorAll('.event-card, .upcoming-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
                entry.target.style.opacity = '1';
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    eventCards.forEach(card => {
        card.style.opacity = '0';
        cardObserver.observe(card);
    });

    // Add parallax effect to hero section
    const eventsHero = document.querySelector('.events-hero');
    if (eventsHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            eventsHero.style.transform = `translateY(${scrolled * 0.4}px)`;
        });
    }

    // Add hover effect to event cards
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            this.addEventListener('mousemove', function(e) {
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                const rotateX = (mouseY / cardCenterY) * -10;
                const rotateY = (mouseX / cardCenterX) * 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}); 