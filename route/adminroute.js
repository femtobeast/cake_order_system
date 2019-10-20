const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const giftController = require("../controller/giftController");
const path = require("path");


// ---------START OF cake get post delete and update method -------------
//GET method for getting adding cake page
router.get('/acd', adminController.getflavour);
// router.get('/acd', function (req, res, next) {
//     res.render("admin/addcake")
// });


//GET method for getting cake data from database
router.get('/vc', adminController.getcake);

//POST method for adding cake
router.post('/cakeAdd', adminController.upload.single('cakeimage'), adminController.cakevalidation, adminController.addCake, function (req, res, next) {
    res.redirect("http://localhost:1234/admin/acd");
});
//image upload method
// router.post('/cakeimageAdd', adminController.upload, adminController.addCakeImage, function (req, res, next) {
//     res.redirect("http://localhost:1234/admin/acd");
// });
// DELETE method for cake
router.delete('/cakedelete/:cid', adminController.deleteCake, function (req, res, next) {
    res.redirect("http://localhost:1234/admin/vc");
});

//GET method to get individual cake data
router.get('/getindividualcake/:cid', adminController.getindividualCake, function (req, res, next) {
})

//UPDATE method to get individual cake data
router.put("/updatecake/:cid", adminController.updateCake, function (req, res, next) {
    // res.redirect("http://localhost:1234/admin/vc");
    console.log("data updated")
});

//GET method to get login page
router.get("/login", function (req, res, next) {
    res.render("admin/adminlogin");
})




//--------------END OF cake get post delete and update method------------------


// ---------START OF FLAVOUR get post delete and update method-------------

//GET method for getting adding flavour page
router.get('/af', function (req, res) {
    res.render('admin/addflavour');
});

//POST method for adding flavour
router.post('/flavourAdd', adminController.addFlavour,
    function (req, res, next) {
        res.render("admin/addflavour", { "message": "Flavour data successfully saved" })


    }
);

//GET method for getting flavour data for select option
router.get('/gffso', adminController.getFlavourForSelectOption);

//----------END OF cake get post delete and update method------------------








// router.post('/acake', function (req, res) {
//     adminController.upload(req, res, (err) => {
//         if (err) {
//             res.render('admin/addcake', {
//                 msg: err
//             });

//         } else {
//             if (req.file == undefined) {
//                 res.render('admin/addcake', {
//                     msg: 'Error: no file selected!!'
//                 });
//             } else {
//                 res.render('admin/addcake', {
//                     file: `./resources/uploads/${req.file.filename}`
//                 });
//             }

//             console.log(req.file);
//             res.send('test');
//         }
//     });
// });

//AUTHENTICATION FOR ADMIN LOGIN
router.post("/auth", adminController.verify, adminController.check, adminController.jwtTokenGen, adminController.AdminData, function (req, res, next) {
    res.send(
        {
            "message": "Login success !",
            "token": req.genToken,
        }
    );
    // res.redirect("http://localhost:1234/admin/acd");
});

//METHOD FOR STAFF

//get add staff
router.get("/astaff", function (req, res, next) {
    res.render("admin/addstaff")
});

router.post("/as", adminController.staffvalidation, adminController.addStaff, function (req, res, next) {
    res.redirect("http://localhost:1234/admin/astaff");
});

//get view cake page
router.get("/vstaff", adminController.getstaff, function (req, res, next) {
    res.render("admin/viewstaff")
});

//delete method for individual staff
router.delete('/staffdelete/:sid', adminController.deleteStaff, function (req, res, next) {
    res.redirect("http://localhost:1234/admin/vstaff");
});

//get method to get individual staff data
router.get('/getindividualstaff/:sid', adminController.getindividualStaff, function (req, res, next) {
})

//UPDATE method to get individual cake data
router.put("/updatestaff/:sid", adminController.staffvalidation, adminController.updateStaff, function (req, res, next) {
    // res.redirect("http://localhost:1234/admin/vc");
    console.log("data updated")
});


//END OF METHOD FOR STAFF

//update admin profile get page 
router.get("/profile", function (req, res, next) {
    res.render("admin/adminprofile")
})




//END OF METHOD FOR gift

//get method for addgift page 
router.get("/addgift", function (req, res, next) {
    res.render("admin/addgift");
});

//POST METHOD TO ADD GIFT DATA IN DATABASE
router.post("/agift", giftController.upload, giftController.imagevalidation, giftController.giftvalidation, giftController.addGift, function (req, res, next) {
    // res.redirect("http://localhost:1234/admin/addgift");
})

//GET METHOD FOR VIEWGIFT PAGE
router.get("/viewgift", giftController.getgift, function (req, res, next) {
    res.render("admin/viewgift");
});

//DELETE METHOD TO DELETE INDVIDUAL GIFT DATA
router.delete('/giftdelete/:gid', giftController.deleteCake, function (req, res, next) {
    // res.redirect("http://localhost:1234/admin/vc");
});

//get method to get individual gift data
router.get('/getindividualgift/:gid', giftController.getindividualGift, function (req, res, next) {
})

//UPDATE method to get individual gift data
router.put("/updategift/:gid", giftController.giftvalidation, giftController.updateGift, function (req, res, next) {
    // res.redirect("http://localhost:1234/admin/vc");
    console.log("data updated")
});





//END OF METHOD FOR ORDER

//data of login data
// router.get("/profiledata", adminController.loginadmindata, function (req, res) {
//     // console.log(req.body);
//     // console.log(req.headers)
//     res.render("admin/adminprofile");
// })
//------------------------------------ORDER-------------------------------------
//get data of order where status is not approval
router.get("/ordernotapproval", adminController.notapprovalorder, function (req, res) {

});

// update method for notapproval order
router.put("/updateordernotapproval/:orderid", adminController.updatenotapprovalorder, function (req, res) {

});

//get data of order where status is complete
router.get("/orderprogress", adminController.progressorder, function (req, res) {

});


//get data of order where status is complete
router.get("/ordercomplete", adminController.completeorder, function (req, res) {

});


//------------------------------------end of ORDER-------------------------------------








module.exports = router;