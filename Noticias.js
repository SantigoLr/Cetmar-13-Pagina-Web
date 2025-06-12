const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('./ConexionBD'); // importa conexión

// Middleware para usuarios autenticados
function soloAutenticados(req, res, next) {
  if (!req.session.usuario) {
    return res.status(401).json({ mensaje: 'No autorizado. Iniciá sesión.' });
  }
  next();
}
router.post('/subir', soloAutenticados, async (req, res) => {
  try {
    const { titulo, texto, imagen_url } = req.body;
    const idUsuario = req.session.usuario.id;

    if (!titulo || !texto) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }

    const pool = await poolPromise;

    // Insertar la noticia y obtener el Id generado
    const resultNoticia = await pool.request()
      .input('IdUsuario', sql.Int, idUsuario)
      .input('Titulo', sql.NVarChar(100), titulo)
      .input('Texto', sql.NVarChar(sql.MAX), texto)
      .query(`
        INSERT INTO Noticias (IdUsuario, Titulo, Texto, Estado)
        VALUES (@IdUsuario, @Titulo, @Texto, 'Publicado');
        SELECT SCOPE_IDENTITY() AS idNoticia;
      `);

    const idNoticia = resultNoticia.recordset[0].idNoticia;

    // Si no hay imágenes, responde aquí
    if (!imagen_url || imagen_url.length === 0) {
      return res.json({ mensaje: 'Noticia guardada sin imágenes' });
    }

    // imagen_url puede ser un string o un array de strings
    const imagenes = Array.isArray(imagen_url) ? imagen_url : [imagen_url];

    // Insertar las imágenes una por una
    for (let i = 0; i < imagenes.length; i++) {
      await pool.request()
        .input('IdNoticia', sql.Int, idNoticia)
        .input('UrlImagen', sql.NVarChar(300), imagenes[i])
        .input('Orden', sql.Int, i)
        .query(`
          INSERT INTO ImagenesNoticias (IdNoticia, UrlImagen, Orden)
          VALUES (@IdNoticia, @UrlImagen, @Orden)
        `);
    }

    res.json({ mensaje: 'Noticia y sus imágenes guardadas correctamente' });

  } catch (error) {
    console.error('Error al guardar noticia o imágenes:', error);
    res.status(500).json({ mensaje: 'Error al guardar la noticia o imágenes', error: error.message });
  }
});

//PETICION DE NOTICIAS PARA QUE SE VEAN 

router.get('/listar', async (req, res) => {
  try {
    const pool = await poolPromise;

    // Obtener noticias con el nombre del autor
    const resultNoticias = await pool.request().query(`
      SELECT N.Id, N.Titulo, N.Texto, N.FechaPublicacion, U.Nombre, U.Apellidos
      FROM Noticias N
      INNER JOIN Usuarios U ON N.IdUsuario = U.Id
      WHERE N.Estado = 'Publicado'
      ORDER BY N.FechaPublicacion DESC
    `);

    const noticias = resultNoticias.recordset;

    // Para cada noticia, obtener sus imágenes
    for (const noticia of noticias) {
      const resultImagenes = await pool.request()
        .input('IdNoticia', sql.Int, noticia.Id)
        .query(`
          SELECT UrlImagen, Orden FROM ImagenesNoticias
          WHERE IdNoticia = @IdNoticia
          ORDER BY Orden
        `);

      noticia.imagenes = resultImagenes.recordset;
    }

    res.json(noticias);
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    res.status(500).json({ mensaje: 'Error al obtener noticias', error: error.message });
  }
});

module.exports = router;
