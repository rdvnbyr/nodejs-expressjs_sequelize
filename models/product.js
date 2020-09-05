// const products = [];
const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const ph = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'product.json'
);

const getProductFormFile = cb => {
    fs.readFile(ph, (err, fileContent) => {
        if (err) {
            // return []; // async return hata verir
            cb([]);// cb func return edildi(async)
        } else {
            // return JSON.parse(fileContent);
            cb(JSON.parse(fileContent));// cb func return edildi(async)
        }
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductFormFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex( f => f.id === this.id);
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;
                fs.writeFile(ph, JSON.stringify(updatedProduct), (err) => {
                    console.log(err);
                })
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(ph, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    };

    static deleteById(id) {
        getProductFormFile( products => {
            const product = products.find( fp => fp.id === id);
            const updatedProducts = products.filter( f => f.id !== id );
            fs.writeFile(ph, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    };

    static fetchAll(cb) {
        getProductFormFile(cb);
    }

    static findById = (id, cb) => {
        getProductFormFile( products => {
            const product = products.find( f => f.id === id );
            cb(product);
        });
    };
}