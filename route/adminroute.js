const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const path = require("path");


//-----------GET FUNCTION ROUTE-------------
//route for adding cake details
// router.get('/acd', function (req, res) {
//     res.render('admin/addcake');
// });
router.get('/acd', adminController.getflavour);



router.get('/af', function (req, res) {
    res.render('admin/addflavour');
});

router.get('/vc', adminController.getcake);

//-----------END OF GET FUNCTION ROUTE------






//-----------POST FUNCTION ROUTE-------------

router.post('/acake', function (req, res) {
    adminController.upload(req, res, (err) => {
        if (err) {
            res.render('admin/addcake', {
                msg: err
            });

        } else {
            if (req.file == undefined) {
                res.render('admin/addcake', {
                    msg: 'Error: no file selected!!'
                });
            } else {
                res.render('admin/addcake', {
                    file: `./resources/uploads/${req.file.filename}`
                });
            }

            console.log(req.file);
            res.send('test');
        }
    });
});

router.post('/flavourAdd', adminController.addFlavour,
    function (req, res, next) {
        res.render("admin/addflavour", { "message": "Flavour data successfully saved" })


    }
);

router.post('/cakeAdd', adminController.upload, adminController.addCake, function (req, res, next) {

    res.redirect("http://localhost:1234/admin/acd")
});
//-----------END OF POST FUNCTION ROUTE-------------







module.exports = router;