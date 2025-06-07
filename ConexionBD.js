const sql = require('mssql');

const dbConfig = {
  user: 'admin_user',
  password: 'admin123',
  server: 'R5-34G\\SQLEXPRESS01',
  database: 'CETMAR-13',
  options: {
    trustServerCertificate: true,
    encrypt: false,
  },
};

const poolPromise = sql.connect(dbConfig)
  .then(pool => {
    console.log('Conectado a la base de datos MSSQL');
    return pool;
  })
  .catch(err => {
    console.error('Error conectando a la base de datos:', err);
    throw err;
  });

module.exports = {
  sql,         // para hacer consultas
  poolPromise, // para usar el pool en tus queries
};

