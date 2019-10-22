const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const OrderController = require("../controller/OrderController");
const Auth = require('../controller/Authentication')
const CartController = require('../controller/CartController');

//---------GET FUNCTION PAGES ROUTE
router.get('/login', Auth.redirectToHome, (req, res) => res.render('userLogin'));
router.get('/register', (req, res) => res.render('register'));
router.get('/dashboard', UserController.getAllCakeDetail);
router.get('/product', UserController.browseAllCakeProduct);
router.get('/checkout', CartController.orderDetail);
router.get('/cplan', (req, res) => { res.render('cakeplan'); });
router.get('/profile', UserController.getProfileDetail, function (req, res) {
    res.render('userProfile');
}); 
router.get('/gift', function (req, res) {
    res.render('giftDetail');
});
router.get('/order', OrderController.getNotApproveOrder, (req, res) => {
    res.render('orderDetail');
})
router.get('/vp/:id', UserController.selectCakeById);
router.get('/shopping-cart', CartController.shoppingCart)//DISPLAY CART DETAIL FOR CHECKOUT: CART FUNCTION
router.get('/add-to-cart/:id', CartController.addToCart)//ADD-TO-CART: CART FUNCTION
router.get('/reduce/:id', CartController.deleteItemByOne)//REDUCE ITEM BY ONE: CART FUNCTION
router.get('/removeItem/:id', CartController.removeItem)//REMOVE ITEM FROM CART: CART FUNCTION
router.get('/removeItemCheckout/:id', CartController.removeItemCheckout)//REMOVE ITEM FROM CART: CART FUNCTION

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
router.post('/gdata', Auth.generateJwtToken,
    UserController.addGoogleUser);
//-- SEARCHING CAKE DETAIL POST METHOD
router.post('/cakeSearchQuery', UserController.searchCakeDetail, (req, res, next) => res.status(201));
//-- LOGIN POST METHOD // const data = [req.session.customerEmail, req.session.customerId, req.session.token];
router.post('/sendLogin', Auth.loginValidation, Auth.generateJwtToken, (req, res, next) => res.send({ status: true }));
router.post('/sendFeedback', UserController.addFeedback)
router.post('/sendOrder', OrderController.placeOrder, (req, res) => {
    res.status(201);
    res.send({ status: true });
});
router.post('/sendUpdate', Auth.passwordHashGenerate, UserController.updateUser, (req, res, next) => {
    res.status(201);
    res.send({ message: "Updated Successful!!" });
});

router.post('/sendCplan', UserController.getSelectPlanCakeDetail);
//------------------------------------------
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
            return res.redirect('/user/dashboard');
        }
        res.clearCookie('sid');
        res.redirect('/user/dashboard')

    })
})
module.exports = router;