
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


/* =============== Parte modal =============== */
function abrirModal(carrera) {
    document.getElementById(`modal-${carrera}`).style.display = "flex";
}

function cerrarModal(carrera) {
    document.getElementById(`modal-${carrera}`).style.display = "none";
}

// Cerrar modal al hacer clic fuera del contenido
/* window.onclick = function(event) {
    if (event.target.className === "modal") {
        event.target.style.display = "none";
    }
}; */

/* ---- boton ver mas ---- */
const botonExpandir = document.querySelector('.btn-expandir');
const textoCompleto = document.querySelector('.texto-completo');
const imagenNoticia = document.querySelector('.imagen-noticia');
const textoMinimizado = document.querySelector('.texto-minimizado');
const contenidoNoticia = document.querySelector('.contenido-noticia');

botonExpandir.addEventListener('click', function () {
  const expandido = textoCompleto.style.maxHeight === 'none';

  if (expandido) {
    // Contraer
    textoCompleto.style.maxHeight = '100px';
    imagenNoticia.style.maxHeight = '100px';
    contenidoNoticia.style.flexDirection = 'row';
    botonExpandir.textContent = 'v Ver más';
  } else {
    // Expandir
    textoCompleto.style.maxHeight = 'none';
    imagenNoticia.style.maxHeight = '500px';
    contenidoNoticia.style.flexDirection = 'column';
    botonExpandir.textContent = 'ʌ Ver menos';
  }
});