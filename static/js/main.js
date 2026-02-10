// Dropdown de experiência mais estático
document.addEventListener('DOMContentLoaded', function () {
    const expDropdown = document.querySelector('.experience-dropdown');
    if (expDropdown) {
        let timeoutId;
        expDropdown.addEventListener('mouseenter', function () {
            clearTimeout(timeoutId);
            expDropdown.classList.add('open');
        });
        expDropdown.addEventListener('mouseleave', function () {
            timeoutId = setTimeout(() => {
                expDropdown.classList.remove('open');
            }, 200); // Pequeno delay para evitar fechamento acidental
        });
        // Permite clicar para abrir em mobile; no desktop permite navegação para #experience
        const expMainLink = expDropdown.querySelector('.experience-link');
        if (expMainLink) {
            expMainLink.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    expDropdown.classList.toggle('open');
                } else {
                    // desktop: allow default navigation/scroll (global handler or specific handler will run)
                }
            });
        }
        // Intercepta cliques nas opções do dropdown e faz scroll compensado
        const expLinks = expDropdown.querySelectorAll('.experience-dropdown-content a');
        expLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                const id = href && href.startsWith('#') ? href.slice(1) : href;
                
                // Para academic-experience, scroll para o subtítulo em vez da lista
                let target;
                if (id === 'academic-experience') {
                    target = document.querySelector('.academic-subtitle');
                } else {
                    target = document.getElementById(id);
                }
                
                if (target) {
                    scrollToElementWithNavOffset(target);
                    // update URL hash without jumping
                    if (id) history.pushState(null, '', '#' + id);
                }
                expDropdown.classList.remove('open');
            });
        });
    }
});
// Translation and Theme Management

// Load translations
let translations = {};
let currentLang = localStorage.getItem('language') || 'pt';

// Load translation file
async function loadTranslations(lang) {
    try {
        const response = await fetch(`/static/translations/${lang}.json`);
        translations = await response.json();
        applyTranslations();
        currentLang = lang;
        localStorage.setItem('language', lang);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Apply translations to elements with data-i18n
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations;
        
        for (const k of keys) {
            value = value[k];
            if (!value) break;
        }
        
        if (value) {
            element.textContent = value;
        }
    });
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Language Selector
function changeLanguage(lang) {
    loadTranslations(lang);
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-lang') === lang);
    });
    // Close dropdown after selection
    document.querySelector('.lang-dropdown')?.classList.remove('active');
}

// Close language dropdown when clicking outside
document.addEventListener('click', function(event) {
    const langSelector = document.querySelector('.lang-selector');
    const langDropdown = document.querySelector('.lang-dropdown');
    
    if (langSelector && langDropdown && !langSelector.contains(event.target)) {
        langDropdown.classList.remove('active');
    }
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Smooth Scrolling with Enhanced Animation
// Helper: smooth scroll to an element compensating for fixed navbar
function scrollToElementWithNavOffset(target) {
    const navbar = document.querySelector('.navbar');
    const navHeight = navbar ? navbar.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // Duration in ms
    let start = null;

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Ignore anchors that are inside the experience dropdown (handled separately),
        // but allow the main header link to `#experience` to be handled normally.
        if (this.closest && this.closest('.experience-dropdown') && this.getAttribute('href') !== '#experience') return;
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            scrollToElementWithNavOffset(target);
            // Update URL hash
            history.pushState(null, '', href);
            // Close mobile menu if open
            document.querySelector('.nav-links')?.classList.remove('active');
            document.querySelector('.hamburger')?.classList.remove('active');
        }
    });
});

// Navbar scroll effect and section tracking
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update URL hash based on visible section
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveSection();
            ticking = false;
        });
        ticking = true;
    }
    
    lastScroll = currentScroll;
});

// Update URL hash based on currently visible section
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPosition = window.pageYOffset + 150; // Offset for navbar
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentHash = window.location.hash.slice(1);
            if (currentHash !== sectionId && sectionId) {
                history.replaceState(null, '', '#' + sectionId);
            }
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadTranslations(currentLang);
    
    // Set active language option
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-lang') === currentLang);
    });

    // Initialize carousel with delay and retry mechanism
    let initAttempts = 0;
    const maxAttempts = 3;
    
    function tryInitCarousel() {
        initAttempts++;
        
        const track = document.querySelector('.carousel-track');
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        if (track && items.length > 0 && prevBtn && nextBtn) {
            initCarousel();
        } else if (initAttempts < maxAttempts) {
            setTimeout(tryInitCarousel, 200);
        }
    }
    
    setTimeout(tryInitCarousel, 150);
    // If page loaded with a hash, scroll to it with offset
    if (window.location.hash) {
        const id = window.location.hash.slice(1);
        const target = document.getElementById(id);
        if (target) {
            // small timeout to allow layout to stabilize
            setTimeout(() => scrollToElementWithNavOffset(target), 80);
        }
    }
});

// Carousel Functionality
function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track || items.length === 0) {
        return;
    }

    let currentIndex = 0;
    let itemsToShow = 1;

    function getItemsToShow() {
        return 1;
    }

    function getMaxSlides() {
        return items.length;
    }

    function updateCarousel() {
        const gap = 32;
        const itemWidth = items[0].getBoundingClientRect().width;
        const moveAmount = itemWidth + gap;
        const offset = -(currentIndex * moveAmount);
        
        track.style.transform = `translateX(${offset}px)`;
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        updateDots();
    }

    function updateDots() {
        const maxIndex = items.length - 1;
        
        dots.forEach((dot, index) => {
            dot.style.display = 'block';
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        const maxIndex = items.length - 1;
        
        if (index < 0) {
            currentIndex = maxIndex;
        } else if (index > maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        updateCarousel();
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            goToSlide(index);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarousel();
        }, 250);
    });

    updateCarousel();
}

// Smooth Section Reveal on Scroll
const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('section-hidden');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});

// Don't hide hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.classList.remove('section-hidden');
}
