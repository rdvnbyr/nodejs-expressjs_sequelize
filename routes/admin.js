const path = require('path');

const express = require('express');

// const rootDir = require('../utils/path');

const adminController = require('../controllers/admin');

// expressjs leri birbirine baglariz.
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct );

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminController.getEditProduct );

// /admin/edit-product => POST
router.post('/edit-product', adminController.postEditProduct);

// /admin/delete-product => POST
router.post('/delete-product', adminController.deleteProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

module.exports =  router;