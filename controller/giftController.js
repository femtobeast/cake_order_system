const multer = require('multer');
const path = require('path');
var giftmodel = require("../model/Gift");
var Joi = require("joi");
var mySeq = require('../config/databaseConfig');
var fs = require('fs');



//setting storage engine
const storage = multer.diskStorage({
    destination: './resources/giftuploads/',

    filename: function (req, file, cb) {

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//check File Type
function checkFileType(file, cb) {

    //allowed ext
    const filetypes = /jpeg|jpg|png/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Image only!!!!!')
    }
}

//Init upload
exports.upload = multer({
    storage: storage,
    limit: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);

    },

}).single("giftimage");
// console.log(this.upload)

exports.imagevalidation = (req, res, next) => {
    if (req.file == undefined) {
        // res.send({
        //     "message": "no image selected"
        // })
        res.status(404).send({ message: "Please fill all field properly" })
        console.log("")
    } else {
        next()
    }

}

//gift validation 
exports.giftvalidation = (req, res, next) => {

    const schema = {
        giftname: Joi.string().required(),
        giftprice: Joi.number().required()
        // giftimage: Joi.string().required()
    }

    const result = Joi.validate(req.body, schema);
    // console.log(result);
    // console.log(req.file.filename);
    if (result.error) {

        fs.unlink(('./resources/giftuploads/' + req.file.filename), function (err) {
            if (err) throw err;
            console.log("image deleted");
        })
        res.status(400).send(result.error.details[0].message);


        return;

    }
    next()

}


//addgift
exports.addGift = (req, res, next) => {
    // console.log(req.body)
    giftmodel.gift.create(
        {
            gift_name: req.body.giftname,
            gift_price: req.body.giftprice,
            gift_image: req.file.filename
        })

        .then(function (result) {
            res.render("admin/addgift")
            next();
        })
        .catch(function (err) {
            //to show error if any mistake is occured in addEmployee function.
            //extraNote: whenever we write some thing in next by defaultly it
            //will go to error.
            next({ "status": 500, "message": err });
            // console.log(err)
        })
    // next()

}

//view gift data
exports.getgift = (req, res, next) => {
    mySeq.sequelize.query(
        "select * \
        from tblgift ",
        { type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            // res.json(result);

            res.render('admin/viewgift', { data: result })
        }).catch(err => {
            next({ "status": 500, "message": " gift invalid" });

        })
}

//delete individual gift data
exports.deleteCake = (req, res, next) => {
    giftmodel.gift.findOne({
        attributes: ['gift_image'],
        where: { gift_id: req.params.gid }
    })
        .then(function (result) {
            console.log(result.gift_image);
            fs.unlink(('./resources/giftuploads/' + result.gift_image), function (err) {
                if (err) throw err;
                console.log("image deleted");
            })
            giftmodel.gift.destroy({
                where: { gift_id: req.params.gid }
            })
                .then(function () {

                    // res.status(200);
                    // res.render("admin/viewcake", { data: result })
                    next();
                })


        })
        .catch(function (err) {
            console.log(err)
        })
}

//get individual gift data
exports.getindividualGift = (req, res, next) => {
    giftmodel.gift.findOne({
        where: { gift_id: req.params.gid }
    })
        .then(function (result) {
            res.status(200);
            res.json(result);
            // console.log(result)

        })
        .catch(function (err) {
            res.json(err);
        })
}

// update individual staff data
exports.updateGift = (req, res, next) => {
    console.log(req.body)


    giftmodel.gift.update(
        {
            gift_name: req.body.giftname,
            gift_price: req.body.giftprice,
        }
        , {
            where: {
                gift_id: req.params.gid
            }
        }
    )
        .then(function (result) {
            next();
        })
        .catch(function (err) {
            //to show error if any mistake is occured in addEmployee function.
            //extraNote: whenever we write some thing in next by defaultly it
            //will go to error.
            next({ "status": 500, "message": "Something went wrong" });
            console.log(err)
        })
}



