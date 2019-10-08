const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const Auth = require('../controller/Authentication')
const cakeModel = require('../model/Cake')
const Cart = require('../model/Cart');

//---------GET FUNCTION PAGES ROUTE
router.get('/login',Auth.redirectToHome, function (req, res) {
    res.render('userLogin');
});
router.get('/register', function (req, res) {
    res.render('register');
});
router.get('/dashboard', UserController.getAllCakeDetail, function (req, res) {

});
router.get('/cp', function (req, res) {
    res.render('changePwd');
});
router.get('/csp', (req, res) => {

    res.render('searchAllCake');
})
router.get('/item', (req, res) => {

    res.render('itemDetail');
})
router.get('/cart', (req, res) => {
    res.render('cartView');
})
router.get('/shopping-cart', async (req, res) => {
    if (!req.session.cart) {
        return res.render('cartDetail', { product: null })
    }
    res.status(201);
    var cart = new Cart(req.session.cart);
    await res.render('cartDetail', { products: cart.generateArray(), totalPrice: cart.totalPrice })
    // res.render('cartDetail', { products:cart.generateArray(), totalPrice: cart.totalPrice})
})
router.post('/check', UserController.checkUserEmail);
router.get('/gcustomer', UserController.getCustomerDetali);
router.get('/add-to-cart/:id', function (req, res, next) {
    var cakeId = req.params.id;
    // var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cakeModel.cake.findOne({
        where: { cake_id: cakeId }
    }).then(function (result) {
        //  console.log(result.dataValues)
        cart.add(result.dataValues, result.dataValues.cake_id);
        req.session.cart = cart;
        req.session.totalCart = cart.totalQty;
        // console.log(req.session.cart)
        res.redirect('/user/dashboard');

    }).catch(function (err) {
        //error handling
        next();
    });

});
//-----------POST METHOD ROUTER-------------------
//-- ADDING CUSTOMER POST METHOD
router.post('/registerAdd',
    UserController.validateCustomerDetail('addUser'),
    Auth.passwordHashGenerate,
    UserController.checkUserEmail,
    UserController.addUser);

//-- SEARCHING CAKE DETAIL POST METHOD
router.post('/cakeSearchQuery', UserController.searchCakeDetail, function (req, res, next) {
    res.status(201);
})

//-- LOGIN POST METHOD
router.post('/sendLogin',
    Auth.loginValidation,
    Auth.generateJwtToken, function (req, res, next) {
        const data = [req.session.customerEmail, req.session.customerId, req.session.token];
        res.redirect('/user/dashboard')
    });

router.get('/logout', Auth.redirectToLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }
        res.clearCookie('sid');
        res.redirect('/user/dashboard')

    })
})

module.exports = router;