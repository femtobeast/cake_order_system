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
var Ordermodel = require("../model/Order");
var bcrypt = require("bcrypt")
var saltRounds = 10;



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
exports.cakeimagevalidation = (req, res, next) => {
    if (req.file == undefined) {
        // res.send({
        //     "message": "no image selected"
        // })
        res.status(404).send("Please fill all field properly")
        console.log("")
    } else {
        next()
    }

}

//validation for add cake form
exports.cakevalidation = (req, res, next) => {

    const schema = {
        cakename: Joi.string().required(),
        price: Joi.number().required(),
        serve: Joi.number().required(),
        version: Joi.string().required(),
        size: Joi.number().required(),
        flavourtype: Joi.string().required(),
        flavourname: Joi.string(),
        desc: Joi.string().required(),
    }
    const result = Joi.validate(req.body, schema);
    console.log(result);
    if (result.error) {
        //bad request
        fs.unlink(('./resources/uploads/' + req.file.filename), function (err) {
            if (err) throw err;
            console.log("image deleted");
        })
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
            // res.redirect(req.originalUrl)
            res.send({ message: "cake added successfully" })

            // next()
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
    }).then(function (result) {
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
                res.send({ message: "cake delete successfully" })

                // next();
            })

        // res.status(200);
        // res.render("admin/viewcake", { data: result })




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
            res.send({ message: "cake successfully updated" })
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
    }).then(function (result) {
        if (result != null) {
            bcrypt.compare(req.body.password, result.dataValues.password, function (err, res) {
                if (res) {
                    next();
                } else {
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

        sfname: Joi.string().required(),
        slname: Joi.string().required(),
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
    next();

}

// adding method the staff details
exports.addStaff = (req, res, next) => {
    console.log(req.headers)
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
            res.send({ message: "Staff Added" });
            // next();
        })
        .catch(function (err) {
            //to show error if any mistake is occured in addEmployee function.
            //extraNote: whenever we write some thing in next by defaultly it
            //will go to error.
            next({ "status": 500, "message": err });
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
            res.send({ message: "staff delete" })
            // next();
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
            // next();
            res.send({ message: "staff updated" })

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
//verify the token

exports.tokenVerify = (req, res, next) => {
    // console.log(req.headers)

    if (req.headers.authorization == undefined) {

        next({ status: 500, message: 'no authorization header present' })
        // res.send({ message: "token expired" })
        // console.log("token  expiry")
        // res.message("400")


    }
    else {

        let token = req.headers.authorization.slice(6, req.headers.authorization.length)

        jwt.verify(token, 'mySecretKey', function (err, decoded) {
            // console.log(decoded);
            if (err != null) {
                next({ status: 500, message: err.message })
                // next({ error: err })
                // console.log(err)
                // console.log(err);
            }
            else {
                next();
            }
        })

    }
}


//retrieve id of admin for profile page
exports.AdminData = (req, res, next) => {
    Adminmodel.admin.findOne({
        // attributes: ['admin_id'],
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
//-----------------------------ORDER--------------------------------------------------------------
//data of notapproval order
exports.notapprovalorder = (req, res) => {
    mySeq.sequelize.query(
        "select delivery_option,order_phone,delivery_location, order_id,delivery_option ,order_by,order_phone,delivery_location,cake_id,\
            (select cake_name from tblcake where cake_id = o.cake_id) as 'cake_name',\
            (select flavour_type from tblcake where cake_id = o.cake_id) as 'flavour_type'\
        from tblorder o where o.order_status = 'notapproval'",
        { query: mySeq.sequelize.QueryTypes.SELECT })
        .then((result) => {
            res.render("admin/notapproval", { data: result[0] });
            // res.json(result)

        }).catch((err) => {
            console.log(err)

        })
}
//data of completion of making cake

exports.completeorder = (req, res) => {
    mySeq.sequelize.query(
        "select delivery_by,delivery_option,order_phone,delivery_location, order_id,delivery_option ,order_by,order_phone,delivery_location,cake_id,\
            (select cake_name from tblcake where cake_id = o.cake_id) as 'cake_name',\
            (select flavour_type from tblcake where cake_id = o.cake_id) as 'flavour_type'\
        from tblorder o where o.order_status = 'complete'",
        { query: mySeq.sequelize.QueryTypes.SELECT })
        .then((result) => {
            res.render("admin/ordercomplete", { data: result[0] });
            // res.json(result)

        }).catch((err) => {
            console.log(err)

        })
}

//data of progress of making cake
exports.progressorder = (req, res) => {
    mySeq.sequelize.query(
        "select delivery_option,order_phone,delivery_location, order_id,delivery_option ,order_by,order_phone,delivery_location,cake_id,\
            (select cake_name from tblcake where cake_id = o.cake_id) as 'cake_name',\
            (select flavour_type from tblcake where cake_id = o.cake_id) as 'flavour_type'\
        from tblorder o where o.order_status = 'progress'",
        { query: mySeq.sequelize.QueryTypes.SELECT })
        .then((result) => {
            res.render("admin/orderprogress", { data: result[0] });
            // res.json(result)
            // next()

        }).catch((err) => {
            console.log(err)

        })
}

//update not approval order data
exports.updatenotapprovalorder = (req, res, next) => {
    Ordermodel.order.update({
        order_status: req.body.orderstatus,
        delivery_by: req.body.assignwork
    }, {
        where: {
            order_id: req.params.orderid
        }
    }
    )
        .then((result) => {
            res.send({
                message: "order status updated successfully"
            })


        })
        .catch((err) => {

        })
}

//GETTING FIRSTNAME,LASTNAME OF STAFF FOR DELIVERY INFORMATION IN PROGRESS ORDER
exports.Staffdataorder = (req, res) => {
    mySeq.sequelize.query(
        "select first_name,last_name    \
        from tblstaff ts  where ts.department = 'delivery'",
        { query: mySeq.sequelize.QueryTypes.SELECT })
        .then((result) => {
            // res.render("admin/orderprogress", { data: result[0] });
            res.json(result[0])
            console.log(result)

        }).catch((err) => {
            console.log(err)

        })
}

//data of delivered cake order
exports.deliveredorder = (req, res) => {
    mySeq.sequelize.query(
        "select delivery_by,delivery_option,order_phone,delivery_location, order_id,delivery_option ,order_by,order_phone,delivery_location,cake_id,\
            (select cake_name from tblcake where cake_id = o.cake_id) as 'cake_name',\
            (select flavour_type from tblcake where cake_id = o.cake_id) as 'flavour_type'\
        from tblorder o where o.order_status = 'delivered'",
        { query: mySeq.sequelize.QueryTypes.SELECT })
        .then((result) => {
            res.render("admin/deliveredorder", { data: result[0] });
            // res.json(result)
            // next()

        }).catch((err) => {
            console.log(err)

        })
}




//-----------------------------END OF ORDER--------------------------------------------------------------

//dashboard
// get total number of total delivery
exports.countdelivery = (req, res) => {
    mySeq.sequelize.query(
        "select count(order_id) co from tblorder o where o.order_status='delivered' ",
        { query: mySeq.sequelize.QueryTypes.SELECT })
        .then((result) => {
            // res.render("admin/deliveredorder", { data: result[0] });
            res.json(result[0])
            // next()

        }).catch((err) => {
            console.log(err)

        })
}

//get total number of order 
// select * from tbl_name
// where datecolumn = cast(getdate() as Date)
exports.counttotalorder = (req, res) => {
    mySeq.sequelize.query(
        "select count(order_id) co from tblorder o where o.order_status <>'delivered' ",
        { query: mySeq.sequelize.QueryTypes.SELECT })
        .then((result) => {
            // res.render("admin/deliveredorder", { data: result[0] });
            res.json(result[0])
            // next()

        }).catch((err) => {
            console.log(err)

        })
}
//total sales amount
exports.countsaleamount = (req, res) => {
    mySeq.sequelize.query(
        // "select tblcake.cake_price from tblcake left join tblorder  where cake_id.tblcake = tblorder.cake_id   ",
        "select sum(order_total) totalsale1 from tblorder;",
        { query: mySeq.sequelize.QueryTypes.SELECT })
        .then((result) => {
            // res.render("admin/deliveredorder", { data: result[0] });
            res.json(result[0])
            // next()

        }).catch((err) => {
            console.log(err)

        })
}
//hash update password
exports.hashGenerator = (req, res, next) => {
    // req.body.password // this is plain text password /
    bcrypt.hash(req.body.updateadminpassword, saltRounds)
        .then(function (hash) {
            console.log(hash);
            req.hashvalue = hash;
            next();
        })
        .catch(function (err) {
            console.log(err)
        })
}
//udateadmin profile
exports.updateadminprofile = (req, res, next) => {
    Adminmodel.admin.update({
        first_name: req.body.updateadminfname,
        last_name: req.body.updateadminlname,
        email: req.body.updateadminemail,
        addresss: req.body.updateadminaddress,
        phone: req.body.updateadminphone,
        password: req.hashvalue
    }, {
        where: {
            admin_id: req.params.adminid
        }
    }
    )
        .then((result) => {
            res.send({
                message: "admin profile status updated successfully"
            })


        })
        .catch((err) => {

        })
}

//validation for the admin profile
exports.adminprofilevalidation = (req, res, next) => {
    // console.log(req.body)
    const schema = {

        updateadminfname: Joi.string().required(),
        updateadminlname: Joi.string().required(),
        updateadminaddress: Joi.string().required(),
        updateadminemail: Joi.string().email().required(),
        updateadminphone: Joi.number().required(),
        updateadminpassword: Joi.string().required().min(8)
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






