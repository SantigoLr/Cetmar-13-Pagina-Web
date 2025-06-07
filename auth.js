const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { sql, poolPromise } = require('./ConexionBD'); // aquí importa la conexión modular

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ ok: false, mensaje: 'Faltan datos' });
  }

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('correo', sql.NVarChar, correo)
      .query('SELECT * FROM Usuarios WHERE Correo = @correo AND Estado = \'Activo\'');

    if (result.recordset.length === 0) {
      return res.status(401).json({ ok: false, mensaje: 'Usuario no encontrado o inactivo' });
    }

    const usuario = result.recordset[0];

    const coincide = contraseña === usuario.Contraseña;

    if (!coincide) {
      return res.status(401).json({ ok: false, mensaje: 'Contraseña incorrecta' });
    }

    res.json({
      ok: true,
      usuario: {
        id: usuario.Id,
        nombre: usuario.Nombre,
        rol: usuario.Rol
      }
    });

  } catch (error) {
    console.error('Error en /auth/login:', error);
    res.status(500).json({ ok: false, mensaje: 'Error del servidor' });
  }
});

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { nombre, apellidos, correo, contraseña, celular, rol } = req.body;

  if (!nombre || !apellidos || !correo || !contraseña) {
    return res.status(400).json({ ok: false, mensaje: 'Faltan datos obligatorios' });
  }

  try {
    const pool = await poolPromise;

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    await pool.request()
      .input('nombre', sql.NVarChar, nombre)
      .input('apellidos', sql.NVarChar, apellidos)
      .input('correo', sql.NVarChar, correo)
      .input('hashedPassword', sql.NVarChar, hashedPassword)
      .input('celular', sql.NVarChar, celular)
      .input('rol', sql.NVarChar, rol || 'Profesor')
      .query(`
        INSERT INTO Usuarios (Nombre, Apellidos, Correo, Contraseña, Celular, Rol)
        VALUES (@nombre, @apellidos, @correo, @hashedPassword, @celular, @rol)
      `);

    res.json({ ok: true, mensaje: 'Usuario registrado correctamente' });

  } catch (error) {
    if (error.message.includes('Violation of UNIQUE KEY constraint')) {
      return res.status(409).json({ ok: false, mensaje: 'El correo ya está registrado' });
    }
    console.error('Error en /auth/register:', error);
    res.status(500).json({ ok: false, mensaje: 'Error al registrar usuario' });
  }
});

module.exports = router;
