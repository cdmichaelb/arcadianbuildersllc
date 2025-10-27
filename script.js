let slides = [];
let dotsContainer;
let prevButton;
let nextButton;
let yearSpan;
let currentIndex = 0;
let autoPlayId;
const AUTO_PLAY_INTERVAL = 5000;

function cacheDom() {
    slides = Array.from(document.querySelectorAll('.slide'));
    dotsContainer = document.querySelector('.slideshow-dots');
    prevButton = document.getElementById('prev-slide');
    nextButton = document.getElementById('next-slide');
    yearSpan = document.getElementById('current-year');
}

function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateSlides(newIndex) {
    slides[currentIndex].classList.remove('active');
    dotsContainer.children[currentIndex]?.classList.remove('active');

    currentIndex = (newIndex + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    dotsContainer.children[currentIndex]?.classList.add('active');
}

function goToSlide(index) {
    updateSlides(index);
    restartAutoPlay();
}

function goToNextSlide() {
    updateSlides(currentIndex + 1);
}

function goToPrevSlide() {
    updateSlides(currentIndex - 1);
}

function startAutoPlay() {
    stopAutoPlay();
    autoPlayId = setInterval(goToNextSlide, AUTO_PLAY_INTERVAL);
}

function stopAutoPlay() {
    if (autoPlayId) {
        clearInterval(autoPlayId);
    }
}

function restartAutoPlay() {
    startAutoPlay();
}

function setupControls() {
    nextButton.addEventListener('click', () => {
        goToNextSlide();
        restartAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        goToPrevSlide();
        restartAutoPlay();
    });

    const slideshow = document.querySelector('.slideshow');
    slideshow.addEventListener('mouseenter', stopAutoPlay);
    slideshow.addEventListener('mouseleave', startAutoPlay);
}

function updateYear() {
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function init() {
    cacheDom();

    if (!slides.length || !dotsContainer || !prevButton || !nextButton) {
        return;
    }

    createDots();
    updateSlides(0);
    setupControls();
    startAutoPlay();
    updateYear();
}

document.addEventListener('DOMContentLoaded', init);
