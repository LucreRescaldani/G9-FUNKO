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

const deleteByID = async (id) => {
    try {
        // const [data] = await dbConn.dbConnectionPool.query('DELETE FROM product WHERE product_id = ?;', id);
        await dbConn.dbConnectionPool.query('DELETE FROM product WHERE product_id = ?;', id);
        // return data;
    } catch (error) {
        console.log('Error de BD' + error);
    } finally {
        dbConn.dbConnectionPool.releaseConnection();
    }
}

const editItemInDB = async (itemId, itemData) => {
    // console.log('Editando item en BD');
    // console.log('Item ' + itemId);
    // console.log('Item ' + JSON.stringify(itemData));
    try {
        const camposConData = {
            product_name: itemData.nombre,
            product_description: itemData.descripcion,
            price: itemData.precio,
            stock: itemData.stock,
            discount: itemData.descuento,
            sku: itemData.sku
        }
        // dues: itemData.cuotas,
        // image_front: itemData.,
        // image_back: itemData.
        await dbConn.dbConnectionPool.query('UPDATE product SET ? WHERE product_id = ?', [camposConData, itemId]);
        const itemDevuelto = await getOne(itemId); 
        // console.log('Item actualizado' + JSON.stringify(itemDevuelto));         
        return itemDevuelto;
    } catch (error) {
        console.log('Error de BD' + error);
    } finally {
        dbConn.dbConnectionPool.releaseConnection();
    }
};

const addItemInDB = async (itemId, itemData) => {
    // console.log('Editando item en BD');
    // console.log('Item ' + itemId);
    // console.log('Item ' + JSON.stringify(itemData));
    try {
        const camposConData = {
            product_name: itemData.nombre,
            product_description: itemData.descripcion,
            price: itemData.precio,
            stock: itemData.stock,
            discount: itemData.descuento,
            sku: itemData.sku
        }
        // dues: itemData.cuotas,
        // image_front: itemData.,
        // image_back: itemData.
        await dbConn.dbConnectionPool.query('INSERT INTO product SET ? WHERE product_id = ?', [camposConData, itemId]);
        // const itemDevuelto = await getOne(itemId); 
        // console.log('Item actualizado' + JSON.stringify(itemDevuelto));         
        // return itemDevuelto;
    } catch (error) {
        console.log('Error de BD' + error);
    } finally {
        dbConn.dbConnectionPool.releaseConnection();
    }
};

module.exports = {
    getAll,
    getOne,
    deleteByID,
    editItemInDB,
    addItemInDB
}
