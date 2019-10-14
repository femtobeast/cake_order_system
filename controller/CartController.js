
const Cart = require('../model/Cart');
const cakeModel = require('../model/Cake');
const HOURS = 1000 * 60 * 60 * 24;
exports.addToCart = (req, res, next) => {
    var cakeId = req.params.id;
    var cart = new Cart(req.cookies.carttemp ? req.cookies.carttemp : {});
    if (cakeId) {
        // var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });

        cakeModel.cake.findOne({
            where: { cake_id: cakeId }
        }).then(function (result) {
            cart.add(result.dataValues, result.dataValues.cake_id);
            res.cookie("carttemp", cart, { maxAge: HOURS, httpOnly: true });

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
    await renderCartDetail(req,res,'cartDetail');

}
exports.orderDetail = async (req, res, next) => {
   await renderCartDetail(req,res,'checkout');
}

 function renderCartDetail(req,res,renderpage) {
    console.log(res.locals.carttemp)
    if (!req.cookies.carttemp) {
        return res.render(renderpage, { product: null })
    }
    res.status(201);
    var cart = new Cart(req.cookies.carttemp);
     res.render(renderpage, { products: cart.generateArray(), totalPrice: cart.totalPrice })

}

exports.deleteItemByOne = (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.cookies.carttemp ? req.cookies.carttemp : {});
    cart.reduceByOne(productId);
    res.cookie("carttemp", cart);
    res.redirect("/user/shopping-cart")

}
exports.removeItem = async(req, res, next) => {
 await removeItem(req,res,'/user/shopping-cart')
}
exports.removeItemCheckout = async (req, res, next) => {
   await removeItem(req,res,'/user/checkout')
}

function removeItem(req,res,page) {
    var productId = req.params.id;
    var cart = new Cart(req.cookies.carttemp ? req.cookies.carttemp : {});
    cart.removeItem(productId);
    res.cookie("carttemp", cart);
    res.redirect(page);
}