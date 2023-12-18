const express = require('express');
const adminControllers = require('../controllers/adminController');
const methodOverride = require('method-override');

const router = express.Router();

// Middleware de sesión
const requiereAdmin = (req, res, next) => {
    if (!req.session.esAdmin) {
        return res.redirect('/auth/login');
    }
    next();
}

router.use(methodOverride('_method'));

router.get('/', requiereAdmin, adminControllers.admin_get);
router.get('/create', requiereAdmin, adminControllers.admin_create_get);
router.post('/create', requiereAdmin, adminControllers.admin_create_post);
router.get('/edit/:id', requiereAdmin, adminControllers.admin_edit_get);
router.put('/edit/:id', requiereAdmin, adminControllers.admin_edit_put);
router.delete('/delete/:id', requiereAdmin, adminControllers.admin_delete);

module.exports = router;

// *** Podríamos ver el objeto importado:
// console.log(adminControllers);

// *** Se podría hacer una desestructuración
// const {
//     admin_get,
//     admin_create_get,
//     admin_create_post,
//     admin_edit_get,
//     admin_edit_put,
//     admin_delete
// } = require('../controllers/adminController');
// *** Y luego llamar a las rutas del siguiente modo:
// router.get('/', admin_get);
// *** A mi me gusta más así como lo dejo hecho.