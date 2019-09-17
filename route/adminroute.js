const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const path = require("path");



//route for adding cake details
router.get('/acd', function (req, res) {
    res.render('admin/addcake');
});

//-----------POST FUNCTION ROUTE-------------

router.post('/acake',function (req,res) {
adminController.upload(req,res,(err)=>{
   if (err){
       res.render('admin/addcake',{
          msg:err
       });
   }else {
       console.log(req.file);
       res.send('test');
   }
});
});


module.exports = router;