const mysql = require('mysql2');
require('dotenv').config();

const connectionPool = mysql.createPool({
    user: process.env.USER,
    password: process.env.DBPASS,
    host: process.env.HOST,
    port: 3306,
    database: 'funko',
    connectionLimit: 5,
    waitForConnections: true,
    queueLimit: 0
});

connectionPool.getConnection((err, conn) => {
    if (err) {
        console.log('Error en la conexión a la BD:' + err);
    } else {
        console.log('Conectado a la BD con éxito.');
        conn.release();
    }
});

module.exports = {
    dbConnectionPool: connectionPool.promise()
}
