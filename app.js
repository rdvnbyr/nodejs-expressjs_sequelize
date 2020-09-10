const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item')

// create app object
const app = express();

// ejs method
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const page404 = require('./routes/page404');

// default olarak parse etmez nodejs, onun icin bu yapilmali
app.use(bodyParser.urlencoded({extended: false}));

// public folder icin erisim izni
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(page404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem});

sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then( user => {
        if(!user) {
            return User.create({name: 'Max', email: 'test@test.de'})
        }
        return user;
    })
    .then( user => {
        // console.log(user);
        return user.createCart();
    })
    .then( user => {
        app.listen(3000);
    })
    .catch(err => console.log(err));

