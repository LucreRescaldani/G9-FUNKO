const express = require('express');
const mainControllers = require('../controllers/mainController');

const router = express.Router();

// router.use('/', (req, res)=>res.redirect('/home'));
router.get('/', mainControllers.home);    // Antes: "/home"
router.get('/contact', mainControllers.contact);
router.get('/about', mainControllers.about);
router.get('/faqs', mainControllers.faqs);

module.exports = router;
