const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");


//---------GET FUNCTION PAGES ROUTE
router.get('/login', function (req, resp) {
    resp.render('login');
});
router.get('/register', function (req, res) {
    res.render('register')
});
router.get('/dashboard', function (req, res) {
    res.render('user_dashboard')
});
//-----------POST FUNCTION ROUTE-------------
router.post('/registerAdd', UserController.addUser,
    function (req, res, next) {
        res.render("register", { "message": "User successfully Registered" })
    }
);


module.exports = router;

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