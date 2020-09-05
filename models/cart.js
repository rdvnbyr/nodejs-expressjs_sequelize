const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const ph = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //fetch the previous cart
        fs.readFile(ph, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            //analyze the cart => find existing product
            const existingProductindex = cart.products.findIndex( f => f.id === id);
            let existingProduct = cart.products[existingProductindex];
            let updatedProduct;
            //Add new product / increase quantity
            if(existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductindex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + + productPrice;
            fs.writeFile(ph, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
        
    };

    static deleteProduct(id, productPrice) {
        fs.readFile(ph, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find( prod => prod.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter( f => f.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty

            fs.writeFile(ph, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        });
    };

    static getCart(cb) {
        fs.readFile(ph, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
};