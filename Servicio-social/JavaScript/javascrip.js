


/* ---- boton ver mas del apartado de NOSOTROS ---- */
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
