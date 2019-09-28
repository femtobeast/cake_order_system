const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const path = require('path')


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
router.get('/vc',(req,res)=>{
    res.render('viewcake');
})
router.post('/check', UserController.validate('validateuserdata'),UserController.validateuserdata);
router.get('/gcustomer',UserController.getCustomerDetali);

//-----------POST FUNCTION ROUTE-------------
//adding user data
router.post('/registerAdd',
    UserController.addUser,
    function (req, res) {
        res.status(201);
        res.send({ message: "Registeration Successful!!" });
        // res.render("register", { "message": "User successfully Registered" })
    }
);


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
