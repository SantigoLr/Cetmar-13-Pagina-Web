const express = require('express');
const path = require('path');

const app = express();

// Servir todo lo estático dentro de Servicio-Social
app.use(express.static(path.join(__dirname, 'Servicio-Social')));

// Para que la raíz ("/") cargue index.html (que está en Servicio-Social/HTML/index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Servicio-Social', 'HTML', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
