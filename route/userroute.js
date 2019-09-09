const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");


router.get('/login', function (req, resp) {
    resp.render('login');
});
router.get('/rp',function(req,res){
   res.render('register')
});



router.post('/register',UserController.addUser,
    function(req,res,next){
    res.render("register",{"message": "User successfully Registered"})
        // console.log(req.body);
        // // if any thing post then status should be 201.
        // res.status(201);
        // //message after successfully post
        // res.send({"message": "User successfully Registered"})
        // next();

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
