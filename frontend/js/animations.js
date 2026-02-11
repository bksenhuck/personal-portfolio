/**
 * Animation Module
 * Handles scroll-based animations and section reveal effects
 */

/**
 * Initialize smooth section reveal on scroll
 */
export function initSectionReveal() {
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
}
