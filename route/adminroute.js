const express = require("express");
const router = express.Router();

//route for adding cake details
router.get('/acd', function (req, res) {
    res.render('admin/addcake');
});

module.exports = router;