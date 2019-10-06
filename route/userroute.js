const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const Auth = require('../controller/Authentication')
const cakeModel = require('../model/Cake')
const Cart = require('../model/Cart');

//---------GET FUNCTION PAGES ROUTE
router.get('/login', function (req, res) {
    res.render('userlogin');
});
router.get('/register', function (req, res) {
    res.render('register');
});
router.get('/dashboard', UserController.getAllCakeDetail, function (req, res) {
    res.render('user_dashboard');
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
    // var products = cart.generateArray();
    // var test = {
    //     item: [{
    //         name:'rishav'
    //     }], total: 120
    // }
    // res.send({ hello: 'world' });
    // res.json(cart.generateArray());
    await res.render('cartDetail', { products: cart.generateArray(), totalPrice: cart.totalPrice })
    // res.render('cartDetail', { products:cart.generateArray(), totalPrice: cart.totalPrice})
})
router.post('/check', UserController.validateCustomerDetail('addUser'), UserController.validateuserdata);
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

});


module.exports = router;
// router.get('/config',function(req,res){
//     // res.sendFile('config.js');
//     res.sendFile(path.join(__dirname, "../config.js"))
// });
// router.get('/login', function (req, resp) {
//     const wt = "Welcome to Yummy Cake";
//     const favoriteThings = [
//         "Red Velvet",
//         "Black Forest"
//     ];

// res.setHeader('Content-Type', 'text/html');
    // cartdata.forEach(element => {

    //     res.json(element);
    // });

//     resp.render('index', { wt, favoriteThings });
// })

// this.app.post('/profile', (req, res) => {                        
//     let password = req.body.password;            
//     let newWallet = operator.createWalletFromPassword(password);
//     let projectedWallet = projectWallet(newWallet);
//     res.render('profile.ejs', {
//       user : req.user,

//       // We are now feeding your EJS template another variable
//       projectedWallet : JSON.stringify(projectedWallet),
//     });
//     console.log(JSON.stringify(projectedWallet));        
//   });


// app.post('/check', [
//   check('username').exists().isLength({ min: 5 }).trim().escape().withMessage('Name must have more than 5 characters'),
//   // expect sunday and saturday
//   check('weekday', 'Choose a weekday').optional().not().isIn(['Sunday', 'Saturday']),
//   // username must be an email
//   check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
//   // password must be at least 5 chars long
//   check('password', 'your password must be at least 8 characters long').isLength({ min: 5 }),
//   //confirm password
//   check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),
//   check('age','not avalid age').isNumeric()
// ],(req, res) => {
//   // Finds the validation errors in this request and wraps them in an object with handy functions
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }

//   var user = {
//     username: req.body.username,
//     weekday: req.body.weekday,
//     email: req.body.email,
//     password: req.body.password,
//     age:req.body.age
//   }
//   res.json(user);
// });
//-----------------------------
