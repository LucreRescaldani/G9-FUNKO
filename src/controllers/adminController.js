const productModel = require('../model/productModel');

const adminControllers = {
    admin_get : async (req, res) => {
        const data = await productModel.getAll();
        res.render('admin/admin',{data});
    },
    admin_create_get : (req, res) => res.render('admin/create',{}),
    admin_create_post : async (req, res) => {
        const newProductData = req.body;
        console.log("Estoy por agregar el siguiente a la BD: " + JSON.stringify(newProductData));
        try {
            await productModel.addItemToDB(newProductData);
            console.log("Nuevo producto agregado...supuestamente");
            res.redirect("/admin" + "?mensaje=Usuario agregado");
        } catch (err) {
            console.error('Error al agregar producto: ', err);
            res.status(500).send('Internal Server Error.');
        }
    },
    admin_edit_get : async (req, res) => {
        try {
            const [item] = await productModel.getOne(req.params.id);
            if (item) {  // El producto con ese id existe.
                res.render('admin/edit',{item});
            } else {
                res.send(404).send('Producto no encontrado.');
            }
        } catch(err) {
            console.error('Error al agregar producto: ', err);
            res.status(500).send('Internal Server Error.');
        }
    },
    admin_edit_put : async (req, res) => {
        // console.log('Estoy en el admin edit put ');
        const itemData = req.body;
        const itemId = req.params.id;
        try {
            const updatedItem = await productModel.editItemInDB(itemId, itemData);
            if (updatedItem) {
                res.redirect('/admin' + '?mensaje=Producto actualizado.');
            } else {
                res.status(404).send('Error editando item: item no encontrado.');
            }
        } catch(err) {
            console.error('Error al editar item: ', err);
            res.status(500).send('Internal Server Error.');
        }
    },
    admin_delete : async (req, res) => {
        await productModel.deleteByID(req.params.id);
        res.redirect('/admin');
        // res.send(`Se *borró* el item con id ${req.params.id}`);
    }
}

module.exports = adminControllers;

// admin_get :  async (req, res) => {
//     const data = await productModel.getAll();
//     console.log(data);
//     res.render('admin/admin', {data});
// }
