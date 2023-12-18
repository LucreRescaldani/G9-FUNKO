const dbConn = require('../config/dbconnection');

const getUserByEmail = async (email) => {
    try {
            const [user] = await dbConn.dbConnectionPool.query('SELECT name, email, password FROM user WHERE email = ?;', email);
            return user;
        } catch (error) {
            console.log('Error de BD' + error);
        } finally {
            dbConn.dbConnectionPool.releaseConnection();
        }
}

module.exports = {
    getUserByEmail
}