/**
 * Main Application Entry Point
 * Orchestrates initialization of all modules
 */

import { tryInitCarousel } from './carousel.js';
import { 
    initExperienceDropdown, 
    initSmoothScroll, 
    initNavbarScroll, 
    handleInitialHash,
    initMobileMenu 
} from './navigation.js';
import { initTheme, initLanguageSelector } from './theme.js';
import { initSectionReveal } from './animations.js';

/**
 * Initialize all application features
 */
function initApp() {
    // Theme and translations
    initTheme();
    initLanguageSelector();
    
    // Navigation
    initExperienceDropdown();
    initSmoothScroll();
    initNavbarScroll();
    initMobileMenu();
    
    // Animations
    initSectionReveal();
    
    // Carousel with delayed initialization
    setTimeout(() => tryInitCarousel(), 150);
    
    // Handle initial hash on page load
    handleInitialHash();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
