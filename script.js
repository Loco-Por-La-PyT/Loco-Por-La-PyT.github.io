const slider = document.getElementById('slider');
const sliderContainer = document.getElementById('slider-container');
const images = slider.querySelectorAll('img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentIndex = 0;
let startX, isDragging = false;

function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSliderPosition();
}

let autoSlide = setInterval(changeImage, 5000);

sliderContainer.addEventListener('mousedown', (e) => {
    clearInterval(autoSlide);
    isDragging = true;
    startX = e.pageX - sliderContainer.offsetLeft;
    slider.style.cursor = 'grabbing';
});

sliderContainer.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        autoSlide = setInterval(changeImage, 5000);
    }
});

sliderContainer.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        autoSlide = setInterval(changeImage, 5000);
    }
});

sliderContainer.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const x = e.pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 3;
        slider.style.transform = `translateX(calc(-${currentIndex * 100}% + ${walk}px))`;
    }
});

sliderContainer.addEventListener('touchstart', (e) => {
    clearInterval(autoSlide);
    isDragging = true;
    startX = e.touches[0].pageX - sliderContainer.offsetLeft;
    slider.style.cursor = 'grabbing';
});

sliderContainer.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
        autoSlide = setInterval(changeImage, 5000);
    }
});

sliderContainer.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const x = e.touches[0].pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 3;
        slider.style.transform = `translateX(calc(-${currentIndex * 100}% + ${walk}px))`;
    }
});

prevButton.addEventListener('click', () => {
    clearInterval(autoSlide);
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSliderPosition();
    autoSlide = setInterval(changeImage, 3000);
});

nextButton.addEventListener('click', () => {
    clearInterval(autoSlide);
    currentIndex = (currentIndex + 1) % images.length;
    updateSliderPosition();
    autoSlide = setInterval(changeImage, 3000);
});
