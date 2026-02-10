/**
 * Theme and Translation Module
 * Handles theme switching and internationalization
 */

let translations = {};
let currentLang = localStorage.getItem('language') || 'pt';

/**
 * Load translation file for specified language
 */
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

/**
 * Apply translations to elements with data-i18n attribute
 */
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

/**
 * Initialize theme functionality
 */
export function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

/**
 * Update theme toggle button icon
 */
function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/**
 * Change application language
 */
export function changeLanguage(lang) {
    loadTranslations(lang);
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-lang') === lang);
    });
    // Close dropdown after selection
    document.querySelector('.lang-dropdown')?.classList.remove('active');
}

/**
 * Initialize language selector
 */
export function initLanguageSelector() {
    // Load initial language
    loadTranslations(currentLang);
    
    // Set active language option
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-lang') === currentLang);
    });

    // Close language dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const langSelector = document.querySelector('.lang-selector');
        const langDropdown = document.querySelector('.lang-dropdown');
        
        if (langSelector && langDropdown && !langSelector.contains(event.target)) {
            langDropdown.classList.remove('active');
        }
    });
}

// Make functions globally available
window.toggleTheme = toggleTheme;
window.changeLanguage = changeLanguage;
