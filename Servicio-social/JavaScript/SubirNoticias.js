// Verifica si el usuario está logueado y redirige si no
console.log('SubirNoticias.js cargado');


// Manejo del formulario de subida de noticias
document.getElementById('form-subir-noticia').addEventListener('submit', async (e) => {
  e.preventDefault();

  const noticia = {
    titulo: e.target.titulo.value,
    texto: e.target.contenido.value,
    imagen_url: e.target.imagen_url.value
  };

  try {
    const res = await fetch('/noticias/subir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(noticia)
    });

    const data = await res.json();
    alert(data.mensaje);
  } catch (error) {
    console.error("Error al subir la noticia:", error);
    alert("Hubo un error al subir la noticia. Intenta nuevamente.");
  }
});
