const express = require("express");
const router = express.Router();


router.get('/login', function (req, resp) {
    resp.render('login');
})


module.exports = router;

// router.get('/login', function (req, resp) {
//     const wt = "Welcome to Yummy Cake";
//     const favoriteThings = [
//         "Red Velvet",
//         "Black Forest"
//     ];

//     resp.render('index', { wt, favoriteThings });
// })
