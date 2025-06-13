fetch('/noticias/listar')
  .then(res => res.json())
  .then(noticias => {
    const contenedor = document.getElementById('contenedorNoticias');

    noticias.forEach(noticia => {
      const div = document.createElement('div');
div.className = 'noticia';

div.innerHTML = `
  <div class="Linea-Fuerte"><p></p></div>
  <h3 class="titulo-noticia">${noticia.Titulo}</h3>
  <p class="Autor"><strong>Autor:</strong> ${noticia.Nombre} ${noticia.Apellidos}</p>
  <p class="Fecha"><strong>Fecha:</strong> ${new Date(noticia.FechaPublicacion).toLocaleString()}</p>

  <div class="texto-minimizado">
    <div class="contenido-noticia">
      <p class="texto-completo">${noticia.Texto}</p>
    </div>
  </div>
  
`;

if (noticia.imagenes.length > 0) {
  const contImg = document.createElement('div');
  contImg.className = 'imagenes';

  noticia.imagenes.forEach(img => {
    const tagImg = document.createElement('img');
    tagImg.src = img.UrlImagen;
    contImg.appendChild(tagImg);
  });

  div.appendChild(contImg);
}

contenedor.appendChild(div);

    });
  })
  .catch(err => {
    console.error('Error al cargar noticias:', err);
    alert('No se pudieron cargar las noticias.');
  });

