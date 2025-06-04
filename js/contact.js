// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Observer for info cards
const infoCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            infoCardsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize observers
document.addEventListener('DOMContentLoaded', () => {
    // Observe info cards
    document.querySelectorAll('.info-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        infoCardsObserver.observe(card);
    });

    // Add hover effects for info cards
    document.querySelectorAll('.info-card').forEach(card => {
        const icon = card.querySelector('.info-icon');
        
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Add floating label effect
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        if (input && label) {
            // Set initial state
            if (input.value) {
                label.classList.add('active');
            }

            // Handle input events
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
        }
    });

    function showAlert(element) {
        element.style.display = 'block';
        element.classList.add('show');
        setTimeout(() => {
            element.classList.remove('show');
            setTimeout(() => {
                element.style.display = 'none';
            }, 300);
        }, 5000);
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Add loading state
            submitBtn.classList.add('loading');

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Send email using EmailJS
            emailjs.send(
                // TODO: Replace with your EmailJS service ID
                // Get it from: Email Services → [Your Service] → Service ID
                'YOUR_SERVICE_ID',
                
                // TODO: Replace with your EmailJS template ID
                // Get it from: Email Templates → [Your Template] → Template ID
                'YOUR_TEMPLATE_ID',
                
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_name: 'Robert KULE',
                    to_email: 'kulewakangitsirobert@gmail.com'
                }
            ).then(
                function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    submitBtn.classList.remove('loading');
                    showAlert(successMessage);
                    contactForm.reset();
                },
                function(error) {
                    console.log('FAILED...', error);
                    submitBtn.classList.remove('loading');
                    showAlert(errorMessage);
                }
            );
        });
    }

    // Initialize map (replace with actual map implementation)
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        // Example: Add Google Maps
        // Note: You'll need to add your Google Maps API key and replace the coordinates
        const mapScript = document.createElement('script');
        mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY';
        mapScript.defer = true;
        
        mapScript.onload = () => {
            const map = new google.maps.Map(mapContainer, {
                center: { lat: -1.6777926, lng: 29.2431123 }, // Goma coordinates
                zoom: 15
            });

            const marker = new google.maps.Marker({
                position: { lat: -1.6777926, lng: 29.2431123 },
                map: map,
                title: 'Robert KULE'
            });
        };

        // Uncomment the following line when you have your API key
        // document.head.appendChild(mapScript);
    }

    // Add parallax effect to info cards
    window.addEventListener('mousemove', e => {
        const cards = document.querySelectorAll('.info-card');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        cards.forEach(card => {
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
        const cards = document.querySelectorAll('.info-card');
        cards.forEach(card => {
            card.style.transform = 'none';
        });
    });
}); 