const path = require('path');

const express = require('express');

// const rootDir = require('../utils/path');
// const adminData = require('./admin');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.deleteProductFromCart);

router.get('/orders', shopController.getOrders);

router.post('/create-order', shopController.postOrder);

router.get('/products', shopController.getProducts);

router.get('/checkout', shopController.getCheckout);

module.exports = router;