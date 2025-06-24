const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider img');
let index = 0;

setInterval(() => {
    index = (index + 1) % slides.length;
    slider.scrollTo({
    left: slider.clientWidth * index,
        behavior: 'smooth'
    });
}, 6000);