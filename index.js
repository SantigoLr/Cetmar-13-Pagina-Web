require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Para leer JSON en body

// Configuración de la conexión a SQL Server
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // si usas Azure o conexión segura
    trustServerCertificate: true, // para desarrollo local
  },
};

// Ruta POST /login
app.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ ok: false, mensaje: 'Faltan datos' });
  }

  try {
    // Conectar a la base de datos
    await sql.connect(dbConfig);

    // Buscar usuario activo por correo
    const result = await sql.query`
      SELECT * FROM Usuarios WHERE Correo = ${correo} AND Estado = 'Activo'
    `;

    if (result.recordset.length === 0) {
      return res.status(401).json({ ok: false, mensaje: 'Usuario no encontrado o inactivo' });
    }

    const usuario = result.recordset[0];

    // Verificar contraseña (usando bcrypt)
    const match = await bcrypt.compare(contraseña, usuario.Contraseña);

    if (!match) {
      return res.status(401).json({ ok: false, mensaje: 'Contraseña incorrecta' });
    }

    // Login exitoso
    res.json({ ok: true, usuario: { id: usuario.Id, nombre: usuario.Nombre, rol: usuario.Rol } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
