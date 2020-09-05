const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// // handlebars
// const expressHbs = require('express-handlebars');

// create app object
const app = express();

// // handlebars Method
// app.engine('hbs', expressHbs());
// app.set('view engine', 'hbs');
// app.set('views', 'views');

// // pug method
// app.set('view engine', 'pug');
// app.set('views', 'views');

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

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(page404);

app.listen(3000);