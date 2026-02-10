/**
 * Carousel Module
 * Handles project carousel functionality including navigation, dots, and responsive behavior
 */

export function initCarousel() {
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
    const itemsToShow = 1;

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

    // Button event listeners
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

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Responsive resize handling
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => updateCarousel(), 250);
    });

    // Initialize
    updateCarousel();
}

// Carousel initialization with retry
export function tryInitCarousel(attempt = 1, maxAttempts = 3) {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (track && items.length > 0 && prevBtn && nextBtn) {
        initCarousel();
    } else if (attempt < maxAttempts) {
        setTimeout(() => tryInitCarousel(attempt + 1, maxAttempts), 200);
    }
}
