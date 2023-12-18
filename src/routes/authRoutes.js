const express = require('express');
const authControllers = require('../controllers/authController');

const router = express.Router();

router.post('/login', authControllers.login_post);
router.get('/login', authControllers.login_get);
router.get('/register', authControllers.register_get);
router.post('/register', authControllers.register_post);
router.get('/logout', authControllers.logout_get);

module.exports = router;
