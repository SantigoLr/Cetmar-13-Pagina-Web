const express = require('express');
const path = require('path');
const session = require('express-session');

const authRoutes = require('./auth');
const noticiasRoutes = require('./Noticias'); // Ajusta la ruta si Noticias.js está en otra carpeta

const app = express();

app.use(session({
  secret: 'una_clave_segura',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 60 * 60 * 1000 }
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'Servicio-Social')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Servicio-Social', 'HTML', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'Servicio-social')));

app.use('/auth', authRoutes);
app.use('/noticias', noticiasRoutes);  // <==== Aquí registrás el router de noticias

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
