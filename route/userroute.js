const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");


//---------GET FUNCTION PAGES ROUTE
router.get('/login', function (req, resp) {
    resp.render('login');
});
router.get('/register', function (req, res) {
    res.render('register');
});
router.get('/dashboard', function (req, res) {
    res.render('user_dashboard');
});
router.get('/cp', function (req, res) {
    res.render('changePwd');
});

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