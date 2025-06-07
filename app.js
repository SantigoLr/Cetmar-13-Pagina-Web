const express = require('express');
const path = require('path');
const authRoutes = require('./auth');

const app = express();

// Middleware para leer JSON (importante para login, etc)
app.use(express.json());

// Servir todo lo estático dentro de Servicio-Social
app.use(express.static(path.join(__dirname, 'Servicio-Social')));

// Para que la raíz ("/") cargue Login.html (en Servicio-Social/HTML/)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Servicio-Social', 'HTML', 'Login.html'));
});

// Rutas para autenticación (login, registro, etc)
app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
