/**
 * Navigation Module
 * Handles smooth scrolling, dropdown menus, URL hash updates, and navbar behavior
 */

/**
 * Smooth scroll to element with navbar offset compensation
 */
export function scrollToElementWithNavOffset(target) {
    const navbar = document.querySelector('.navbar');
    const navHeight = navbar ? navbar.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
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

/**
 * Initialize experience dropdown functionality
 */
export function initExperienceDropdown() {
    const expDropdown = document.querySelector('.experience-dropdown');
    if (!expDropdown) return;

    let timeoutId;

    expDropdown.addEventListener('mouseenter', function () {
        clearTimeout(timeoutId);
        expDropdown.classList.add('open');
    });

    expDropdown.addEventListener('mouseleave', function () {
        timeoutId = setTimeout(() => {
            expDropdown.classList.remove('open');
        }, 200);
    });

    // Mobile toggle
    const expMainLink = expDropdown.querySelector('.experience-link');
    if (expMainLink) {
        expMainLink.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                expDropdown.classList.toggle('open');
            }
        });
    }

    // Dropdown link handlers
    const expLinks = expDropdown.querySelectorAll('.experience-dropdown-content a');
    expLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const id = href && href.startsWith('#') ? href.slice(1) : href;
            
            let target;
            if (id === 'academic-experience') {
                target = document.querySelector('.academic-subtitle');
            } else {
                target = document.getElementById(id);
            }
            
            if (target) {
                scrollToElementWithNavOffset(target);
                if (id) history.pushState(null, '', '#' + id);
            }
            expDropdown.classList.remove('open');
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Skip dropdown links (handled separately)
            if (this.closest && this.closest('.experience-dropdown') && this.getAttribute('href') !== '#experience') {
                return;
            }
            
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                scrollToElementWithNavOffset(target);
                history.pushState(null, '', href);
                
                // Close mobile menu
                document.querySelector('.nav-links')?.classList.remove('active');
                document.querySelector('.hamburger')?.classList.remove('active');
            }
        });
    });
}

/**
 * Update URL hash based on visible section
 */
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPosition = window.pageYOffset + 150;
    
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

/**
 * Initialize navbar scroll effects and section tracking
 */
export function initNavbarScroll() {
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
}

/**
 * Handle initial page load with hash
 */
export function handleInitialHash() {
    if (window.location.hash) {
        const id = window.location.hash.slice(1);
        const target = document.getElementById(id);
        if (target) {
            setTimeout(() => scrollToElementWithNavOffset(target), 80);
        }
    }
}

/**
 * Mobile menu toggle
 */
export function initMobileMenu() {
    window.toggleMobileMenu = function() {
        const nav = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    };
}
