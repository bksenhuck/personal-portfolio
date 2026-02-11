/**
 * Carousel Module
 * Handles project carousel functionality including navigation, dots, and responsive behavior
 */

export function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const wrapper = document.querySelector('.carousel-wrapper');
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    console.log('Carousel init:', { track: !!track, wrapper: !!wrapper, items: items.length, prevBtn: !!prevBtn, nextBtn: !!nextBtn });
    
    if (!track || items.length === 0) {
        console.log('Carousel init failed - missing track or items');
        return;
    }

    let currentIndex = 0;
    const itemsToShow = 1;

    function updateCarousel() {
        const offset = -(currentIndex * 100);
        track.style.transform = `translateX(${offset}%)`;
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        console.log('Updated carousel to index:', currentIndex);
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
            console.log('Prev button clicked');
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            console.log('Next button clicked');
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
