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
    
    // Render fun facts
    if (fun_facts && fun_facts.length > 0) {
        const funFactsGrid = document.querySelector('.fun-facts-grid');
        if (funFactsGrid) {
            funFactsGrid.innerHTML = fun_facts.map(fact => `
                <article class="fun-fact-item fun-fact-${fact.position || 'left'}">
                    <div class="fact-image">
                        <img src="${fact.image}" alt="${fact.title}">
                    </div>
                    <div class="fact-content">
                        <h3 class="fact-title">${fact.title}</h3>
                        <p class="fact-description">${fact.description}</p>
                    </div>
                </article>
            `).join('');
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
    const carouselDots = document.querySelector('.carousel-dots');
    
    if (carouselTrack) {
        carouselTrack.innerHTML = projects.map(project => `
            <div class="carousel-item">
                <article class="project-card">
                    <div class="project-image">
                        <img src="images/${project.image}" 
                             alt="${project.title} - Data Science Project"
                             onerror="this.src='images/placeholder.jpg'">
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tech">
                            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <p class="project-impact">
                            <i class="fas fa-chart-line"></i> ${project.impact}
                        </p>
                        <a href="${project.url}" target="_blank" rel="noopener" class="project-link">
                            <span data-i18n="projects.view">Ver Projeto</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
            </div>
        `).join('');
    }
    
    if (carouselDots) {
        carouselDots.innerHTML = projects.map((_, index) => 
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
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
