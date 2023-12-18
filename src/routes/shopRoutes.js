const express = require('express');
const shopControllers = require('../controllers/shopController');

const router = express.Router();
 
router.get('/', shopControllers.shop_get);
router.get('/item/:id', shopControllers.shop_item_get);
router.post('/item/:id/add', shopControllers.shop_item_post);
router.get('/cart', shopControllers.shop_cart_get);
router.post('/cart', shopControllers.shop_cart_post);

module.exports = router;