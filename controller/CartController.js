
const Cart = require('../model/Cart');
const cakeModel = require('../model/Cake');

exports.addToCart = (req, res, next) => {
    var cakeId = req.params.id;
    var cart = new Cart(req.cookies.carttemp ? req.cookies.carttemp : {});
    if (cakeId) {
        // var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });

        cakeModel.cake.findOne({
            where: { cake_id: cakeId }
        }).then(function (result) {
            cart.add(result.dataValues, result.dataValues.cake_id);
            res.cookie("carttemp", cart);
            // req.session.cart = cart;
            // req.session.totalCart = req.cookies.carttemp.totalQty;
            res.redirect('/user/dashboard');

        }).catch(function (err) {
            //error handling
            next();
        });
    }


}
exports.shoppingCart = async (req, res, next) => {
    console.log(res.locals.carttemp)
    if (!req.cookies.carttemp) {
        return res.render('cartDetail', { product: null })
    }
    res.status(201);
    var cart = new Cart(req.cookies.carttemp);
    await res.render('cartDetail', { products: cart.generateArray(), totalPrice: cart.totalPrice })
    // res.render('cartDetail', { products:cart.generateArray(), totalPrice: cart.totalPrice})
}