const dbConn = require('../config/dbconnection');

const getAll = async () => {
    try {
        const [data] = await dbConn.dbConnectionPool.query('SELECT * FROM product P, category C, licence L WHERE P.licence_id = L.licence_id and P.category_id = C.category_id ORDER BY P.product_id;');
        return data;
    } catch (error) {
        console.log('Error de BD' + error);
    } finally {
        dbConn.dbConnectionPool.releaseConnection();
    }
}

const getOne = async (id) => {
    try {
            const [data] = await dbConn.dbConnectionPool.query('SELECT * FROM product P, category C, licence L WHERE P.licence_id = L.licence_id and P.category_id = C.category_id AND P.product_id = ?;', id);
            return data;
        } catch (error) {
            console.log('Error de BD' + error);
        } finally {
            dbConn.dbConnectionPool.releaseConnection();
        }
}

module.exports = {
    getAll,
    getOne
}
