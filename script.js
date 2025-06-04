// Initialisation de la base de données SQLite
let db;

function initDatabase() {
    return new Promise((resolve, reject) => {
        // Vérifier si le navigateur supporte SQLite
        if (!window.openDatabase) {
            console.warn('SQLite n\'est pas supporté dans ce navigateur. Les messages seront stockés dans localStorage.');
            db = {
                transaction: (fn) => {
                    try {
                        fn({
                            executeSql: (query, params, success, error) => {
                                if (query.startsWith('CREATE TABLE')) return success();
                                if (query.startsWith('INSERT INTO')) {
                                    const messages = JSON.parse(localStorage.getItem('messages') || []);
                                    messages.push({
                                        name: params[0],
                                        email: params[1],
                                        subject: params[2],
                                        message: params[3],
                                        date: new Date().toISOString()
                                    });
                                    localStorage.setItem('messages', JSON.stringify(messages));
                                    return success();
                                }
                                if (query.startsWith('SELECT')) {
                                    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
                                    return success(null, { rows: { length: messages.length, item: (i) => messages[i] } });
                                }
                            }
                        });
                    } catch (e) {
                        error(e);
                    }
                }
            };
            return resolve();
        }

        // Créer ou ouvrir la base de données
        db = window.openDatabase('PortfolioDB', '1.0', 'Portfolio Database', 2 * 1024 * 1024);

        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, subject TEXT, message TEXT, date TEXT)',
                [],
                () => resolve(),
                (tx, error) => {
                    console.error('Erreur lors de la création de la table:', error);
                    reject(error);
                }
            );
        });
    });
}

// Sauvegarder un message dans la base de données
function saveMessageToDatabase(name, email, subject, message) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO messages (name, email, subject, message, date) VALUES (?, ?, ?, ?, ?)',
                [name, email, subject, message, new Date().toISOString()],
                (tx, result) => resolve(result),
                (tx, error) => reject(error)
            );
        });
    });
}

// Récupérer tous les messages (pour l'administration)
function getAllMessages() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM messages ORDER BY date DESC',
                [],
                (tx, result) => resolve(result.rows),
                (tx, error) => reject(error)
            );
        });
    });
}
// Mode sombre
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Vérifier le préférence système
if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.classList.add('active');
}

// Basculer entre les modes
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.classList.remove('active');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.classList.add('active');
        localStorage.setItem('theme', 'dark');
    }
});

// Vérifier le thème sauvegardé
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.classList.add('active');
} else if (savedTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.classList.remove('active');
}
// Effet Typewriter
class Typewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.texts = JSON.parse(element.getAttribute('data-text')) || [element.getAttribute('data-text') || ''];
        this.speed = options.speed || 100;
        this.delay = options.delay || 2000;
        this.loop = options.loop !== false;
        this.currentText = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.timeout = null;
        
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.currentText];
        
        if (this.isDeleting) {
            this.charIndex--;
        } else {
            this.charIndex++;
        }
        
        this.element.textContent = currentText.substring(0, this.charIndex);
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            this.isDeleting = true;
            this.timeout = setTimeout(() => this.type(), this.delay);
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.currentText = (this.currentText + 1) % this.texts.length;
            this.timeout = setTimeout(() => this.type(), 500);
        } else {
            const speed = this.isDeleting ? this.speed / 2 : this.speed;
            this.timeout = setTimeout(() => this.type(), speed);
        }
    }
    
    destroy() {
        clearTimeout(this.timeout);
    }
}

// Initialiser les effets typewriter
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElements = document.querySelectorAll('.typewriter');
    const subtitleElement = document.querySelector('.typewriter-subtitle');
    
    typewriterElements.forEach(el => {
        new Typewriter(el, {
            speed: 100,
            delay: 2000,
            loop: true
        });
    });
    
    if (subtitleElement) {
        new Typewriter(subtitleElement, {
            speed: 50,
            delay: 5000,
            loop: true
        });
    }
});
// Observer pour les animations
const animateOnScroll = () => {
    const skills = document.querySelectorAll('.skill-item');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Pour les compétences, animer les barres de progression
                if (entry.target.classList.contains('skill-item')) {
                    const progress = entry.target.querySelector('.progress');
                    if (progress) {
                        const width = progress.style.width;
                        progress.style.width = '0';
                        setTimeout(() => {
                            progress.style.width = width;
                        }, 300);
                    }
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    skills.forEach(skill => observer.observe(skill));
    timelineItems.forEach(item => observer.observe(item));
};

// Appeler cette fonction au chargement et au scroll
document.addEventListener('DOMContentLoaded', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Dans votre script.js
const projectCards = document.querySelectorAll('.project-card');
const modals = document.querySelectorAll('.modal');
const closeModalBtns = document.querySelectorAll('.close-modal');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});
// Initialiser la base de données au chargement de la page
document.addEventListener('DOMContentLoaded', initDatabase);

// Animation des progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Déclencher l'animation quand la section est visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}