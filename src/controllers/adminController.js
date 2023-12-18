const productModel = require('../model/productModel');

const adminControllers = {
    admin_get : async (req, res) => {
        const data = await productModel.getAll();
        res.render('admin/admin',{data});
    },
    admin_create_get : (req, res) => res.render('admin/create',{}),
    admin_create_post : (req, res) => res.send("Ruta para Create x post"),
    admin_edit_get : async (req, res) => {
        const [data] = await productModel.getOne(req.params.id);
        res.render('admin/edit',{data});
    },
    admin_edit_put : (req, res) => res.send("Ruta para Edit x put"),
    admin_delete : (req, res) => res.send(`Se *borró* el item con id ${req.params.id}`)
}

module.exports = adminControllers;

// admin_get :  async (req, res) => {
//     const data = await productModel.getAll();
//     console.log(data);
//     res.render('admin/admin', {data});
// }
