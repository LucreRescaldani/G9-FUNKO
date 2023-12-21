const express = require('express');
const adminControllers = require('../controllers/adminController');
const path = require('path');
const methodOverride = require('method-override');
const multer = require('multer');

const router = express.Router();

// Configuro MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/nuevos'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// console.log(path.resolve());
// console.log(__dirname);
// console.log(path.join(__dirname, '../../public/img/nuevos'));
// console.log(path.join(path.resolve(), '/public/img/nuevos'));

const upload = multer({storage: storage});
// Fin configuración de MULTER


// Middleware de sesión
const requiereAdmin = (req, res, next) => {
    if (!req.session.esAdmin) {
        return res.redirect('/auth/login');
    }
    next();
}

router.use(methodOverride('_method'));

// Necesité usar este middleware de a continuación para
// que me reconozca el PUT. 
// El DELETE me funcionaba sin necesidad de esto. 
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }));

// Pequeño middleware para inspeccionar el request method
// de las request entrantes.
//
// router.use((req, res, next) => {
//    console.log(req.method);
//    next();
// });

router.get('/', requiereAdmin, adminControllers.admin_get);
router.get('/create', requiereAdmin, adminControllers.admin_create_get);
router.post('/create', requiereAdmin, upload.single('imagenes'), adminControllers.admin_create_post);
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