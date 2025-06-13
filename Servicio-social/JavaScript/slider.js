/* =============== parte slider =============== */

document.querySelectorAll('.slider-nav a').forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado
        const slider = document.querySelector('.slider');
        slider.scrollTo({
            left: slider.offsetWidth * index, // Desplaza al slide correspondiente
            behavior: 'smooth' // Desplazamiento suave
        });
    });
});