/**
 * Main Application Entry Point (API Version)
 * Orchestrates initialization and data loading from API
 */

import { api, initAPI } from './api.js';
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
 * Render portfolio data into HTML
 */
function renderPortfolioData(data) {
    const { profile, skills, fun_facts } = data;
    
    // Render profile/hero section
    if (profile) {
        document.querySelector('.hero-title span + span')?.remove();
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const nameSpan = document.createElement('span');
            nameSpan.textContent = profile.name;
            heroTitle.appendChild(nameSpan);
        }
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = profile.title;
        
        const profileImg = document.querySelector('.profile-img');
        if (profileImg && profile.photo) {
            profileImg.src = `images/${profile.photo}`;
        }
        
        // Social links
        const emailLink = document.querySelector('a[href^="mailto:"]');
        if (emailLink && profile.email) {
            emailLink.href = `mailto:${profile.email}`;
        }
        
        const githubLink = document.querySelector('a[title*="GitHub"]');
        if (githubLink && profile.github) {
            githubLink.href = profile.github;
        }
        
        const linkedinLink = document.querySelector('a[title*="LinkedIn"]');
        if (linkedinLink && profile.linkedin) {
            linkedinLink.href = profile.linkedin;
        }
    }
    
    // Render fun facts (support normalized backend `type`: 'metric' or 'card')
    if (fun_facts && fun_facts.length > 0) {
        const funFactsGrid = document.querySelector('.fun-facts-grid');
        if (funFactsGrid) {
            const lang = (typeof window !== 'undefined' && localStorage.getItem('language')) ? localStorage.getItem('language') : 'pt';
            const localize = (field) => {
                if (!field) return '';
                if (typeof field === 'object') return field[lang] || field.pt || Object.values(field)[0] || '';
                return field;
            };

            funFactsGrid.innerHTML = fun_facts.map((fact, idx) => {
                // Use explicit type when provided
                if (fact && fact.type === 'metric') {
                    const label = localize(fact.label);
                    return `
                        <article class="fun-fact-item metric">
                            <div class="metric-value">${fact.value}</div>
                            <div class="metric-label">${label}</div>
                        </article>
                    `;
                }

                if (fact && fact.type === 'card') {
                    const position = fact.position || (idx % 2 === 0 ? 'left' : 'right');
                    const title = localize(fact.title);
                    const desc = localize(fact.description);
                    let imgSrc = '';
                    if (fact.image) imgSrc = fact.image;
                    const imgHtml = imgSrc ? `<div class="fact-image"><img src="${imgSrc}" alt="${title}" onerror="this.style.display='none'"></div>` : '';
                    return `
                        <article class="fun-fact-item fun-fact-${position}">
                            ${imgHtml}
                            <div class="fact-content">
                                ${title ? `<h3 class="fact-title">${title}</h3>` : ''}
                                ${desc ? `<p class="fact-description">${desc}</p>` : ''}
                            </div>
                        </article>
                    `;
                }

                // Fallback for legacy items: metric detection
                if (fact && fact.label && typeof fact.value !== 'undefined') {
                    const label = localize(fact.label);
                    return `
                        <article class="fun-fact-item metric">
                            <div class="metric-value">${fact.value}</div>
                            <div class="metric-label">${label}</div>
                        </article>
                    `;
                }

                // Generic fallback: render as a simple card
                const fallbackPosition = fact.position || (idx % 2 === 0 ? 'left' : 'right');
                const fallbackTitle = localize(fact.title || fact.label);
                const fallbackDesc = localize(fact.description);
                const fallbackImg = fact.image || '';
                const fallbackImgHtml = fallbackImg ? `<div class="fact-image"><img src="${fallbackImg}" alt="${fallbackTitle}" onerror="this.style.display='none'"></div>` : '';
                return `
                    <article class="fun-fact-item fun-fact-${fallbackPosition}">
                        ${fallbackImgHtml}
                        <div class="fact-content">
                            ${fallbackTitle ? `<h3 class="fact-title">${fallbackTitle}</h3>` : ''}
                            ${fallbackDesc ? `<p class="fact-description">${fallbackDesc}</p>` : ''}
                        </div>
                    </article>
                `;
            }).join('');
        }
    }
}

/**
 * Render projects into carousel
 */
function renderProjects(data) {
    const { projects } = data;
    
    if (!projects || projects.length === 0) return;
    
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselIndicators = document.querySelector('.carousel-indicators');
    
    if (carouselTrack) {
        carouselTrack.innerHTML = projects.map(project => `
            <div class="carousel-item">
                <article class="project-card">
                    <div class="project-image">
                        <img src="images/${project.image}" 
                             alt="${project.title} - Data Science Project"
                             onerror="this.style.display='none'">
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        ${project.impact ? `
                        <p class="project-impact">
                            <i class="fas fa-chart-line"></i> 
                            <span data-i18n="projects.impact">Impacto:</span> ${project.impact}
                        </p>
                        ` : ''}
                        <div class="project-tech">
                            ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                        <a href="${project.url}" target="_blank" rel="noopener" class="project-link">
                            <span data-i18n="projects.view">Ver Projeto</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
            </div>
        `).join('');
    }
    
    if (carouselIndicators) {
        carouselIndicators.innerHTML = projects.map((_, index) => 
            `<button class="carousel-dot ${index === 0 ? 'active' : ''}" 
                     aria-label="Go to project ${index + 1}"></button>`
        ).join('');
    }
}

/**
 * Render experience section
 */
function renderExperience(data) {
    const { experience } = data;
    
    if (!experience || experience.length === 0) return;
    
    const experienceList = document.querySelector('.experience-list');
    if (!experienceList) return;
    
    experienceList.innerHTML = experience.map(exp => `
        <article class="experience-item">
            <div class="exp-image">
                <img src="${exp.image}" alt="${exp.company}">
            </div>
            <div class="exp-content">
                <h3 class="exp-title">${exp.role}</h3>
                <p class="exp-company">${exp.company}</p>
                <p class="exp-period">${exp.period}</p>
                <p class="exp-location">${exp.location}</p>
                <p class="exp-description">${exp.description}</p>
            </div>
        </article>
    `).join('');
}

/**
 * Render education section
 */
function renderEducation(data) {
    const { education } = data;
    
    if (!education || education.length === 0) return;
    
    // Render academic experience (inside experience section)
    const academicList = document.querySelector('.academic-list');
    if (academicList) {
        academicList.innerHTML = education.map(edu => `
            <article class="academic-item">
                <div class="academic-image">
                    <img src="${edu.image}" alt="${edu.degree}">
                </div>
                <div class="academic-content">
                    <h3 class="academic-title">${edu.degree}</h3>
                    <p class="academic-institution">${edu.institution}</p>
                    <p class="academic-period">${edu.period}</p>
                    <p class="academic-description">${edu.description}</p>
                    ${edu.highlights ? `
                        <ul class="academic-highlights">
                            ${edu.highlights.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            </article>
        `).join('');
    }
    
    // Render education section (formal education)
    const educationList = document.querySelector('.education-list');
    if (educationList) {
        educationList.innerHTML = education.map(edu => `
            <article class="education-item">
                <div class="edu-image">
                    <img src="${edu.image}" alt="${edu.degree}">
                </div>
                <div class="edu-content">
                    <h3 class="edu-degree">${edu.degree}</h3>
                    <p class="edu-institution">${edu.institution}</p>
                    <p class="edu-period">${edu.period}</p>
                    <p class="edu-description">${edu.description}</p>
                    ${edu.highlights ? `
                        <ul class="edu-highlights">
                            ${edu.highlights.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            </article>
        `).join('');
    }
}

/**
 * Load all data from API
 */
async function loadData() {
    try {
        // Show loading indicator (optional)
        document.body.classList.add('loading-data');
        
        // Fetch all data in one request
        const data = await api.getAll();
        
        // Render each section
        renderPortfolioData(data);
        renderProjects(data);
        renderExperience(data);
        renderEducation(data);
        
        // Initialize carousel after projects are rendered
        setTimeout(() => tryInitCarousel(), 200);
        
        // Hide loading indicator
        document.body.classList.remove('loading-data');
        
        console.log('✓ Portfolio data loaded successfully');
        
    } catch (error) {
        console.error('Failed to load portfolio data:', error);
        document.body.classList.add('data-load-error');
        
        // Show user-friendly error message (optional)
        const errorMsg = document.createElement('div');
        errorMsg.className = 'data-error-banner';
        errorMsg.innerHTML = `
            <p>⚠️ Could not load portfolio data. Please refresh the page.</p>
            <button onclick="location.reload()">Refresh</button>
        `;
        document.body.prepend(errorMsg);
    }
}

// Expose helpers for debugging in DevTools
if (typeof window !== 'undefined') {
    window.loadData = loadData;
    window.reloadData = async function() {
        api.clearCache();
        await loadData();
    };
}

/**
 * Initialize all application features
 */
function initApp() {
    // Initialize API client
    initAPI();
    
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
    
    // Load data from API
    loadData();
    
    // Handle initial hash on page load
    handleInitialHash();

    // Listen for language changes from the theme module and reload data
    window.addEventListener('languageChanged', (evt) => {
        // Clear API cache so we fetch fresh translated data, then reload
        api.clearCache();
        loadData();
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
