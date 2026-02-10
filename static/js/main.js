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
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Smooth Scrolling with Enhanced Animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800; // Duration in ms
            let start = null;

            // Easing function for smooth animation
            function easeInOutCubic(t) {
                return t < 0.5 
                    ? 4 * t * t * t 
                    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            }

            // Animation function
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
            
            // Close mobile menu if open
            document.querySelector('.nav-links')?.classList.remove('active');
            document.querySelector('.hamburger')?.classList.remove('active');
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

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
        console.log(`Attempting to initialize carousel (attempt ${initAttempts}/${maxAttempts})`);
        
        const track = document.querySelector('.carousel-track');
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        if (track && items.length > 0 && prevBtn && nextBtn) {
            initCarousel();
            console.log('✓ Carousel initialized successfully');
        } else if (initAttempts < maxAttempts) {
            console.warn('Carousel elements not ready, retrying...');
            setTimeout(tryInitCarousel, 200);
        } else {
            console.error('Failed to initialize carousel after', maxAttempts, 'attempts');
        }
    }
    
    setTimeout(tryInitCarousel, 150);
});

// Carousel Functionality
function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    console.log('Carousel init:', { 
        carouselContainer: !!carouselContainer, 
        track: !!track, 
        itemsCount: items.length, 
        prevBtn: !!prevBtn, 
        nextBtn: !!nextBtn, 
        dotsCount: dots.length 
    });
    
    if (prevBtn && nextBtn) {
        console.log('🎯 Both buttons found!');
        console.log('  Prev classes:', prevBtn.className);
        console.log('  Next classes:', nextBtn.className);
    }
    
    if (!track || items.length === 0) {
        console.warn('Carousel elements not found');
        return;
    }

    let currentIndex = 0;
    let itemsToShow = 1; // Always show 1 project at a time (simple!)

    // Calculate items to show based on screen size
    function getItemsToShow() {
        return 1; // Simplified: always show one item
    }

    // Calculate max slides
    function getMaxSlides() {
        return items.length; // One slide per item
    }

    // Update carousel position
    function updateCarousel() {
        const gap = 32; // 2rem in pixels
        
        // Get the actual width of one item from the DOM
        const itemWidth = items[0].getBoundingClientRect().width;
        const moveAmount = itemWidth + gap;
        
        const offset = -(currentIndex * moveAmount);
        track.style.transform = `translateX(${offset}px)`;
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        updateDots();
        
        console.log('Update carousel:', {
            currentIndex,
            itemsToShow,
            itemWidth: itemWidth.toFixed(2),
            moveAmount: moveAmount.toFixed(2),
            offset: offset.toFixed(2),
            maxSlides: getMaxSlides()
        });
    }

    // Update active dot
    function updateDots() {
        const maxSlides = getMaxSlides();
        const maxIndex = maxSlides - 1;
        
        console.log('UpdateDots called:', {
            currentIndex,
            maxSlides,
            maxIndex,
            totalDots: dots.length,
            itemsToShow
        });
        
        dots.forEach((dot, index) => {
            // Show only dots for actual slides
            if (index > maxIndex) {
                dot.style.display = 'none';
                console.log(`  Dot ${index}: hidden (beyond maxIndex ${maxIndex})`);
            } else {
                dot.style.display = 'block';
                dot.classList.toggle('active', index === currentIndex);
                console.log(`  Dot ${index}: shown, active=${index === currentIndex}`);
            }
        });
        
        // Update button states (don't hide buttons)
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= maxIndex;
        }
        
        console.log('Buttons state:', {
            prevDisabled: currentIndex === 0,
            nextDisabled: currentIndex >= maxIndex,
            maxIndex
        });
    }

    // Navigate to specific slide
    function goToSlide(index) {
        const maxSlides = getMaxSlides();
        const maxIndex = maxSlides - 1;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        console.log('Go to slide:', { index, currentIndex, maxSlides, maxIndex });
        updateCarousel();
    }

    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }

    // Next slide
    function nextSlide() {
        const maxSlides = getMaxSlides();
        const maxIndex = maxSlides - 1;
        console.log('Next slide called:', { currentIndex, maxIndex });
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        } else {
            console.log('Already at last slide');
        }
    }

    // Event listeners for buttons - Direct and simple
    if (prevBtn) {
        console.log('✓ Setting up PREV button listener');
        prevBtn.addEventListener('click', function(e) {
            console.log('🔴 PREV BUTTON CLICKED! currentIndex:', currentIndex);
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
        });
        
        prevBtn.addEventListener('mousedown', (e) => {
            console.log('🔴 PREV BUTTON MOUSEDOWN');
        });
    } else {
        console.error('✗ PREV button not found!');
    }
    
    if (nextBtn) {
        console.log('✓ Setting up NEXT button listener');
        nextBtn.addEventListener('click', function(e) {
            console.log('🔵 NEXT BUTTON CLICKED! currentIndex:', currentIndex);
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
        });
        
        nextBtn.addEventListener('mousedown', (e) => {
            console.log('🔵 NEXT BUTTON MOUSEDOWN');
        });
    } else {
        console.error('✗ NEXT button not found!');
    }

    // Event listeners for dots
    console.log('Setting up', dots.length, 'dot listeners');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            console.log('Dot clicked:', index);
            goToSlide(index);
        });
    });
    
    if (dots.length === 0) {
        console.warn('⚠️ No dots found!');
    }

    // Removed touch/mouse drag events to prevent interference with buttons
    // Only keyboard, button clicks, and dot clicks are available for navigation

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Recalculate on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarousel();
        }, 250);
    });

    // Initialize
    updateCarousel();
    
    // Test button click right after initialization
    setTimeout(() => {
        console.log('🧪 TESTING BUTTONS AFTER 1 SECOND:');
        if (prevBtn) {
            const prevRect = prevBtn.getBoundingClientRect();
            console.log('  Prev button rect:', prevRect);
            console.log('  Prev button visible:', prevRect.width > 0 && prevRect.height > 0);
            console.log('  Prev button computed style:', {
                display: window.getComputedStyle(prevBtn).display,
                pointerEvents: window.getComputedStyle(prevBtn).pointerEvents,
                zIndex: window.getComputedStyle(prevBtn).zIndex
            });
        }
        if (nextBtn) {
            const nextRect = nextBtn.getBoundingClientRect();
            console.log('  Next button rect:', nextRect);
            console.log('  Next button visible:', nextRect.width > 0 && nextRect.height > 0);
            console.log('  Next button computed style:', {
                display: window.getComputedStyle(nextBtn).display,
                pointerEvents: window.getComputedStyle(nextBtn).pointerEvents,
                zIndex: window.getComputedStyle(nextBtn).zIndex
            });
        }
    }, 1000);
    
    // MANUAL TEST: Click next button after 3 seconds
    setTimeout(() => {
        console.log('🧪🧪🧪 AUTO-CLICKING NEXT BUTTON IN 3 SECONDS');
        if (nextBtn) {
            console.log('  Triggering nextSlide() programmatically...');
            nextSlide();
            console.log('  Done! Check if carousel moved.');
        }
    }, 3000);
    
    // Add a global click listener for debugging
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.projects')) {
            console.log('Click in projects section:', {
                target: target.tagName,
                className: target.className,
                isButton: target.closest('.carousel-btn') !== null,
                isDot: target.closest('.carousel-dot') !== null
            });
        }
    });
    
    console.log('╔════════════════════════════════════════╗');
    console.log('║   CAROUSEL INITIALIZED                 ║');
    console.log('╠════════════════════════════════════════╣');
    console.log('  Total Items:', items.length);
    console.log('  Items To Show:', itemsToShow);
    console.log('  Max Slides:', getMaxSlides());
    console.log('  Can Navigate To Index:', getMaxSlides() - 1);
    console.log('  Window Width:', window.innerWidth + 'px');
    console.log('  Total Dots:', dots.length);
    
    // Debug element positions
    if (prevBtn && nextBtn) {
        const prevRect = prevBtn.getBoundingClientRect();
        const nextRect = nextBtn.getBoundingClientRect();
        
        console.log('  ');
        console.log('  BUTTON POSITIONS:');
        console.log('  Prev:', {
            left: prevRect.left.toFixed(0) + 'px',
            top: prevRect.top.toFixed(0) + 'px',
            width: prevRect.width.toFixed(0) + 'px',
            visible: prevRect.width > 0 && prevRect.height > 0,
            zIndex: window.getComputedStyle(prevBtn).zIndex,
            pointerEvents: window.getComputedStyle(prevBtn).pointerEvents
        });
        console.log('  Next:', {
            left: nextRect.left.toFixed(0) + 'px',
            top: nextRect.top.toFixed(0) + 'px',
            width: nextRect.width.toFixed(0) + 'px',
            visible: nextRect.width > 0 && nextRect.height > 0,
            zIndex: window.getComputedStyle(nextBtn).zIndex,
            pointerEvents: window.getComputedStyle(nextBtn).pointerEvents
        });
        
        // Check what element is at button positions
        const prevCenter = {
            x: prevRect.left + prevRect.width / 2,
            y: prevRect.top + prevRect.height / 2
        };
        const nextCenter = {
            x: nextRect.left + nextRect.width / 2,
            y: nextRect.top + nextRect.height / 2
        };
        
        const elementAtPrev = document.elementFromPoint(prevCenter.x, prevCenter.y);
        const elementAtNext = document.elementFromPoint(nextCenter.x, nextCenter.y);
        
        console.log('  ');
        console.log('  CLICKABILITY TEST:');
        
        if (elementAtPrev === prevBtn || elementAtPrev?.parentElement === prevBtn) {
            console.log('  ✓ Prev button is clickable');
        } else {
            console.warn('  ✗ PREV BUTTON COVERED BY:', elementAtPrev?.className || elementAtPrev?.tagName);
        }
        
        if (elementAtNext === nextBtn || elementAtNext?.parentElement === nextBtn) {
            console.log('  ✓ Next button is clickable');
        } else {
            console.warn('  ✗ NEXT BUTTON COVERED BY:', elementAtNext?.className || elementAtNext?.tagName);
        }
    }
    
    // Check dots visibility
    if (dots.length > 0) {
        const firstDot = dots[0];
        const dotRect = firstDot.getBoundingClientRect();
        const dotStyle = window.getComputedStyle(firstDot);
        
        console.log('  ');
        console.log('  DOTS INFO:');
        console.log('  Total:', dots.length);
        console.log('  First dot display:', dotStyle.display);
        console.log('  First dot visibility:', dotStyle.visibility);
        console.log('  First dot opacity:', dotStyle.opacity);
        console.log('  First dot position:', {
            top: dotRect.top.toFixed(0) + 'px',
            left: dotRect.left.toFixed(0) + 'px',
            visible: dotRect.width > 0 && dotRect.height > 0
        });
    }
    
    console.log('╚════════════════════════════════════════╝');
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
