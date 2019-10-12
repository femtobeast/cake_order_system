const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const Auth = require('../controller/Authentication')
const CartController = require('../controller/CartController');

//---------GET FUNCTION PAGES ROUTE
router.get('/login',Auth.redirectToHome, (req, res)=>res.render('userLogin'));
router.get('/register', (req, res)=> res.render('register'));
router.get('/dashboard', UserController.getAllCakeDetail);
router.get('/product', UserController.browseAllCakeProduct,(req,res)=>{
    res.render('product');
});
router.get('/checkout', function (req, res) {
    res.render('checkout');
});
router.get('/cp', function (req, res) {
    res.render('changePwd');
});
router.get('/csp', (req, res) => {
    res.render('viewDetails');
})
router.get('/vp/:id',UserController.selectCakeById);
router.get('/shopping-cart',CartController.shoppingCart)//DISPLAY CART DETAIL FOR CHECKOUT: CART FUNCTION
router.get('/add-to-cart/:id', CartController.addToCart)//ADD-TO-CART: CART FUNCTION
router.get('/reduce/:id', CartController.deleteItemByOne)//REDUCE ITEM BY ONE: CART FUNCTION
router.get('/removeItem/:id',CartController.removeItem)//REMOVE ITEM FROM CART: CART FUNCTION

router.post('/check', UserController.checkUserEmail);
router.get('/gcustomer', UserController.getCustomerDetali);
router.get('/carr', UserController.browseAllCakeProduct, UserController.getArrayCake);

//-----------POST METHOD ROUTER-------------------
//-- ADDING CUSTOMER POST METHOD
router.post('/registerAdd',
    UserController.validateCustomerDetail('addUser'),
    Auth.passwordHashGenerate,
    UserController.checkUserEmail,
    UserController.addUser);
//-- SEARCHING CAKE DETAIL POST METHOD
router.post('/cakeSearchQuery', UserController.searchCakeDetail,(req, res, next)=>res.status(201));
//-- LOGIN POST METHOD // const data = [req.session.customerEmail, req.session.customerId, req.session.token];
router.post('/sendLogin',Auth.loginValidation,Auth.generateJwtToken, (req, res, next)=> res.redirect('/user/dashboard'));
router.get('/logoutCart', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/user/dashboard');
        }
        res.clearCookie('carttemp');
        res.redirect('/user/shopping-cart')

    })
})
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