// const products = [];
const Cart = require('./cart');
const db = require('../utils/database');

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        return db.execute("INSERT INTO Product (title, price, description, imageUrl) VALUES (?, ?, ?, ?)", [this.title, this.price, this.description,  this.imageUrl]);
    };

    static deleteById(id) {

    };

    static fetchAll() {
        return db.execute('SELECT * FROM Product');
    }

    static findById = (id) => {
        return db.execute("SELECT * FROM Product WHERE Product.id = ?", [id]);
    };
}