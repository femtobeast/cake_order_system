const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const Auth = require('../controller/Authentication')
const CartController = require('../controller/CartController');

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
router.get('/shopping-cart',CartController.shoppingCart)
router.get('/add-to-cart/:id',CartController.addToCart)
router.post('/check', UserController.checkUserEmail);
router.get('/gcustomer', UserController.getCustomerDetali);

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