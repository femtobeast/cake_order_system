const multer = require('multer');
const path = require('path');
var cakemodel = require("../model/Cake");
var flavourmodel = require("../model/Flavour");
var Adminmodel = require("../model/Admin");
var Staffmodel = require("../model/Staff");
var mySeq = require('../config/databaseConfig');
var fs = require('fs');
var bcrypt = require("bcrypt");
var Joi = require("joi");
const jwt = require('jsonwebtoken');



//setting storage engine
const storage = multer.diskStorage({
    destination: './resources/uploads/',
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

})

//get flavour data in option drop down
exports.getFlavourForSelectOption = (req, res, next) => {
    flavourmodel.flavour.findAll()
        .then(function (result) {
            res.status(200);
            res.send(result)
        })
        .catch(function (err) {
            console.log(err)
        });
}

//add flavour details information
exports.addFlavour = (req, res, next) => {
    console.log(req.body)
    flavourmodel.flavour.create(
        {
            flavour_name: req.body.flavourname,
            flavour_type: req.body.flavourtype
        })

        .then(function (result) {
            next();
        })
        .catch(function (err) {
            //to show error if any mistake is occured in addEmployee function.
            //extraNote: whenever we write some thing in next by defaultly it
            //will go to error.
            next({ "status": 500, "message": err });
            console.log(err)
        })

}
var flavour_arry = [];
exports.getflavour = (req, res, next) => {
    // const favoriteThings = [
    //     "Red Velvet",
    //     "Black Forest"
    // ];

    // res.render("admin/addcake", { favoriteThings });
    flavourmodel.flavour.findAll()
        .then(function (result) {
            res.status(200);
            flavour_arry.pop();
            flavour_arry.push(result);

            // res.json(flavour_arry[0]) 

            // flavour_arry = JSON.stringify(result);


            res.render("admin/addcake", { fdata: flavour_arry[0] });
            // console.log(JSON.stringify(result))
            // res.json(result);
        })
        .catch(function (err) {
            console.log(err)
        });
}
//     flavourmodel.flavour.findAll()
//         .then(function (result) {
//             res.status(200);
//             res.json(result);
//             flavour_arry = result;
//             res.render("admin/addcake", { flavour_arry })
//             console.log(res.json(result))
//         })
//         .catch(function (err) {

//         });

// }


// function arrayRemove(arr, value) {

//     return arr.filter(function (ele) {
//         return ele != value;
//     });

// }

//validation for add cake form
exports.cakevalidation = (req, res, next) => {

    const schema = {




        cakename: Joi.string().required(),
        size: Joi.number().required(),
        // filename: Joi.required(),
        flavourtype: Joi.string().required(),
        flavourname: Joi.string(),
        desc: Joi.string().required(),
        price: Joi.number().required(),
        version: Joi.string().required(),
        serve: Joi.number().required()
    }

    const result = Joi.validate(req.body, schema);
    console.log(result);
    if (result.error) {
        //bad request
        res.status(400).send(result.error.details[0].message);
        // req.result.error = result.error.details[0].message
        // console.log(result.error.details[0])
        // res.redirect("http://localhost:1234/admin/acd?msg=" + result.error.details[0].message)

        // res.redirect("http://localhost:1234/admin/acd") + req.result.error.details[0].message;
        return;
        // }
    }
    next()

}

exports.addCake = (req, res, next) => {
    //id reterive 
    flavourmodel.flavour.findOne({
        attributes: ['flavour_id'],
        where: { flavour_name: req.body.flavourname }
    }).then(function (result) {
        res.status(200)
        fid = result.flavour_id;
        console.log(fid)
        //addcake
        cakemodel.cake.create({
            cake_name: req.body.cakename,
            pound: req.body.size,
            cake_image: req.file.filename,
            flavour_type: req.body.flavourtype,
            flavour_id: fid,
            descriptions: req.body.desc,
            cake_price: req.body.price,
            version: req.body.version,
            serves: req.body.serve
        }).then(function (result) {
            // { fdata: flavour_arry[0] }
            next()
        })
    }).catch(function (err) {
        console.log(err);
    })
};
//upload cake image
// exports.addCakeImage = (req, res, next) => {
//     //addcake
//     cakemodel.cake.create({

//         cake_image: req.file.filename,
//         // cake_name: req.body.cakename,
//         // pound: req.body.size,
//         // flavour_type: req.body.flavourtype,
//         // flavour_id: fid,
//         // descriptions: req.body.desc,
//         // cake_price: req.body.price,
//         // version: req.body.version,
//         // serves: req.body.serve


//     }).then(function (result) {
//         // { fdata: flavour_arry[0] }
//         next()
//     }).catch(function (err) {
//         console.log(err);
//     })
// };
//retrieve cake 
exports.getcake = (req, res, next) => {
    mySeq.sequelize.query(
        "select cake_name,\
        cake_id,\
        cake_image,\
        flavour_id,\
        (select flavour_name from tblflavour where flavour_id=tc.flavour_id) as `flavour_name`\
        from tblcake tc", //query for counting user
        { type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            // res.json(result);
            res.render('admin/viewcake', { data: result })
        }).catch(err => {
            next({ "status": 500, "message": "counting user invalid" });

        })
}
exports.deleteCake = (req, res, next) => {
    cakemodel.cake.findOne({
        attributes: ['cake_image'],
        where: { cake_id: req.params.cid }
    })
        .then(function (result) {
            console.log(result.cake_image);
            fs.unlink(('./resources/uploads/' + result.cake_image), function (err) {
                if (err) throw err;
                console.log("image deleted");
            })
            cakemodel.cake.destroy({
                where: { cake_id: req.params.cid }
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

// exports.deleteCake = (req, res, next) => {
//     cakemodel.cake.destroy({
//         where: { cake_id: req.params.cid }
//     })
//         .then(function () {

//             // res.status(200);
//             // res.render("admin/viewcake", { data: result })
//             // next()
//         })
//         .catch(function (err) {
//             next({ "status": 500, "message": "couldnot deleted" })
//             console.log(err)
//         })
//     next()
// }

exports.getindividualCake = (req, res, next) => {
    mySeq.sequelize.query(
        "select * \
        ,(select flavour_name from tblflavour where flavour_id=tc.flavour_id) as `flavour_name`\
        from tblcake tc where tc.cake_id = :cake_id", //query for selecting individual cake
        { replacements: { cake_id: req.params.cid }, type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.status(200);
            res.json(result[0]);
            // res.render('admin/viewcake', { data: result })
        }).catch(err => {
            next({ "status": 500, "message": "counting user invalid" });

        })
    // cakemodel.cake.findOne({
    //     where: { cake_id: req.params.cid }
    // })
    //     .then(function (result) {
    //             res.status(200);
    //         res.json(result);
    //     })
    //     .catch(function (err) {
    //         res.json(err);
    //     })
}

//UPDATE INDIVIDUAL CAKE DATA
exports.updateCake = (req, res, next) => {
    // id reterive 
    flavourmodel.flavour.findOne({
        attributes: ['flavour_id'],
        where: { flavour_name: req.body.flavourname }
    }).then(function (result) {
        res.status(200)
        fid = result.flavour_id;
        console.log(fid)
        // addcake
        cakemodel.cake.update({
            cake_name: req.body.cakename,
            pound: req.body.size,
            // cake_image: req.file.filename,
            flavour_type: req.body.flavourtype,
            flavour_id: fid,
            descriptions: req.body.desc,
            cake_price: req.body.price,
            version: req.body.version,
            serves: req.body.serve
            ,
        }, {
            where: {
                cake_id: req.params.cid
            }
        }
        ).then(function (result) {
            // { fdata: flavour_arry[0] }
            // res.send({ "message": "deleted" })
            console.log("mes")
            next()
        })
            // })
            .catch(function (err) {
                console.log(err);
            })
    });
};



exports.verify = (req, res, next) => {

    Adminmodel.admin.findOne({

        where: {
            email: req.body.email
        }
    })
        //user have been rergistered
        .then(function (result) {
            // console.log(result)
            if (result != null) {
                next();
            } else {
                next({ "status": 409, "message": "Credential didn't match" });
                // res.render("admin/adminlogin", { "message": "Credential didn't match." });

            }
        })
        .catch(function (err) {
            next({ "status": 409, "message": err });
        })
    // next();

}


exports.check = (req, res, next) => {
    Adminmodel.admin.findOne({
        where: { email: req.body.email }
    })

        .then(function (result) {
            if (result != null) {
                bcrypt.compare(req.body.password, result.dataValues.password, function (err, res) {
                    if (res) {

                        next();

                    }

                    else {
                        next({ "status": 500, "message": "Credential didn't match." });
                        // res.render("admin/adminlogin", { "message": "Credential didn't match." });

                    }
                });
            } else {
                next({ "status": 500, "message": "Credential didn't match." });
                // res.render("admin/adminlogin", { "message": "Credential didn't match." });


            }

        })
        .catch(function (err) {
            next({ "status": 500, "message": "Error Occured" });
            console.log(err)
        })
}

//STAFF CONTROLLER 

//validation for add staff form
exports.staffvalidation = (req, res, next) => {
    // console.log(req.body)
    const schema = {

        staff_firstname: Joi.string().required(),
        staff_lastname: Joi.string().required(),
        saddress: Joi.string().required(),
        email: Joi.string().email().required(),
        phonenumber: Joi.number().required(),
        department: Joi.string().required()
    }

    const result = Joi.validate(req.body, schema);

    if (result.error) {
        //bad request
        res.status(400).send(result.error.details[0].message);
        // res.render("admin/viewstaff", { "message": result.error.details[0].message })
        return;
        // }
    }
    next()

}

// adding method the staff details
exports.addStaff = (req, res, next) => {



    Staffmodel.staff.create(
        {
            first_name: req.body.staff_firstname,
            last_name: req.body.staff_lastname,
            email: req.body.email,
            address: req.body.saddress,
            phonenumber: req.body.phonenumber,
            department: req.body.department

        })
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

//get all data of staff
exports.getstaff = (req, res, next) => {
    mySeq.sequelize.query(
        "select * \
        from tblstaff ", //query for counting user
        { type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            // res.json(result);

            res.render('admin/viewstaff', { data: result })
        }).catch(err => {
            next({ "status": 500, "message": "counting user invalid" });

        })
}

//delete individual staff data
exports.deleteStaff = (req, res, next) => {

    Staffmodel.staff.destroy({
        where: { staff_id: req.params.sid }
    })
        .then(function () {

            // res.status(200);
            // res.render("admin/viewcake", { data: result })
            next();
        })



        .catch(function (err) {
            console.log(err)
        })
}

//get individual staff data
exports.getindividualStaff = (req, res, next) => {
    Staffmodel.staff.findOne({
        where: { staff_id: req.params.sid }
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
exports.updateStaff = (req, res, next) => {
    console.log(req.body)


    Staffmodel.staff.update(
        {
            first_name: req.body.sfname,
            last_name: req.body.slname,
            email: req.body.email,
            address: req.body.saddress,
            phonenumber: req.body.phonenumber,
            department: req.body.department

        }
        , {
            where: {
                staff_id: req.params.sid
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





//END OF STAFF CONTROLLER

//AUTHENTICATION OF admin login

//generate the token 
exports.jwtTokenGen = (req, res, next) => {

    jwt.sign({
        email: req.body.email,
        accessLevel: 'admin'
    }, 'mySecretKey', {
        expiresIn: "10h"
    },

        function (err, token) {
            if (err != null || undefined) {
                console.log(err)
                next({ "status": 401, "message": "Unauthorized token" })
            }
            else {
                req.genToken = token;
                res.header("token", token);
                next();
                // console.log(token)
            }
            res.json(result);

        }
    )
    // next()

}
//verify the

//retrieve id of admin for profile page
exports.AdminData = (req, res, next) => {
    Adminmodel.admin.findOne({
        attributes: ['admin_id'],
        where: { email: req.body.email }
    })
        .then(function (result) {
            if (result != null) {
                // res.json(result)
                res.send(
                    {
                        status: 201,
                        "message": "Login success",
                        "token": req.genToken,
                        "result": result,
                        success: true
                    });
            }
        })


        .catch(function (err) {
            // res.json(err);
            next({ "status": 500, "message": err });
        })
    // next()
}


//END OF AUTHENTICATION OF admin login

//LOGIN USER DATA

exports.loginadmindata = (req, res, next) => {
    console.log(req.body.adminid)

    Adminmodel.admin.findOne({
        where: { admin_id: req.params.adminid }
    })
        .then(function (result) {
            res.status(200);
            res.json(result);
            // console.log(result)



        })
        .catch(function (err) {
            res.json(err);
        })
    // next() 
}








