const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll( products => {
        // inject into to template(shop.pug) prods key tanimasini saglaycak
        res.render(
            'shop/product-list',
            {
                prods: products,
                pageTitle: 'All products',
                path: '/products'
            }
        );
    });

    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    // res.send('<h1>Hello ExpressJs</h1>');
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render(
            'shop/product-detail',
            {
                product: product,
                pageTitle: product.title,
                path: '/products'
            }
        )
    })
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll( products => {
        // inject into to template prods key tanimasini saglaycak
        res.render(
            'shop/index',
            {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            }
        );
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart( cart => {
        Product.fetchAll( products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find( fp => fp.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render(
                'shop/cart',
                {
                    path: '/cart',
                    pageTitle: 'Your Cart',
                    products: cartProducts
                }
            );
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
};

exports.deleteProductFromCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
};

exports.getOrders = (req, res, next) => {
    res.render(
        'shop/orders',
        {
            path: '/orders',
            pageTitle: 'Your Orders',
        }
    )
};

exports.getCheckout = (req, res, next) => {
    res.render(
        'shop/checkout',
        {
            path: '/checkout',
            pageTitle: 'Checkout'
        }
    )
};

