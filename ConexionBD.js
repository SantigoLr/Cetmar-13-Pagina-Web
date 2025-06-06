const express = require('express');
const sql = require('mssql');

const app = express();
const PORT = 3000;

app.use(express.json());

// Configuración para SQL Server
const dbConfig = {
  user: 'admin_user',
  password: 'admin123',
  server: 'R5-34G\\SQLEXPRESS01', // ¡Importante las dobles barras!
  database: 'CETMAR-13',
  options: {
    trustServerCertificate: true,
    encrypt: false,
  },
};

// Ruta de prueba
app.get('/api/prueba', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT GETDATE() AS fecha_actual');
    res.json({ ok: true, fecha: result.recordset[0].fecha_actual });
  }catch (err) {
  console.error('Error de conexión:', err); // MOSTRAR DETALLE EN CONSOLA
  res.status(500).json({ error: err.message }); // MOSTRAR DETALLE EN RESPUESTA
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
