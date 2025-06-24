const sql = require('mssql');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER, // por ejemplo: cetmar13.database.windows.net
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
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
  sql,
  poolPromise,
};


