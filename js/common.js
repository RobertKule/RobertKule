// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme
function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        const theme = prefersDarkScheme.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Mobile menu functionality
const mobileMenu = document.querySelector('.mobile-menu');
const navElements = document.querySelector('.nav-elements');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    navElements.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

// Close mobile menu when clicking outside
function handleClickOutside(event) {
    if (navElements.classList.contains('active') &&
        !navElements.contains(event.target) &&
        !mobileMenu.contains(event.target)) {
        toggleMobileMenu();
    }
}

// Close mobile menu when clicking on a link
function handleLinkClick() {
    if (navElements.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                mobileMenu.classList.remove('active');
                navElements.classList.remove('active');
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scrolling down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scrolling up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// Page Transitions
function initPageTransitions() {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('page-loaded');
    });

    document.querySelectorAll('a:not([href^="#"])').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('mailto:')) {
                e.preventDefault();
                document.body.classList.add('page-transition');
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    setInitialTheme();

    // Theme toggle event listener
    themeToggle.addEventListener('click', toggleTheme);

    // Mobile menu event listeners
    mobileMenu.addEventListener('click', toggleMobileMenu);
    document.addEventListener('click', handleClickOutside);

    // Add click event listeners to nav links
    document.querySelectorAll('.nav-elements a').forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });

    // Handle system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Add scroll event listener for navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scrolling down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scrolling up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });

    initSmoothScroll();
    initNavbarScroll();
    initPageTransitions();
}); 