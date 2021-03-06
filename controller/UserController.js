const usermodel = require("../model/Customer");
const cakemodel = require("../model/Cake");
const feedbackmodel = require("../model/Feedback");
const flavourmodel = require("../model/Flavour");
const giftModel = require("../model/Gift");
const { check, validationResult } = require('express-validator');
const mySeq = require('../config/databaseConfig');
const Sequelize = require('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;
const cakeArrTemp = [];


//USER REGISTRATION FUNCTION ----------------
exports.addUser = (req, res, next) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // res.json( {error:errors.array()[0].msg});      
            // return next({ "status": 409, "message": res.json(errors.array()) }) 
            //  res.redirect('/user/register')
            // res.json({ errors: errors.array() });
            return res.status(422).jsonp(errors.array());
            //  next({ "status": 422, "message": errors.array()})


        } else {
            usermodel.customer.create({
                cust_email: req.body.email,
                cust_password: req.myhash,
                cust_phone: req.body.phone,
                cust_dob: moment.utc(req.body.birthday, 'DD-MM-YYYY'),
                cust_address: req.body.address,
                cust_gender: req.body.gender,
                cust_fname: req.body.firstname,
                cust_lname: req.body.lastname
            }).then(function (result) {
                res.send({ message: "Registration Successfull!!!" });
            }).catch(function (err) {
                next({ "status": 500, "message": err });
                console.log(err)
            })
        }


    } catch (err) {
        return next({ "status": 500, "message": "Something went wrong try catch" });
    }

}
//USER REGISTRATION FUNCTION ----------------
exports.addGoogleUser = (req, res, next) => {
    usermodel.customer.findOne({
        where: { cust_email: req.body.email }
    }).then(function (result) {
        if (result.dataValues != "") {
            req.session.customerEmail = result.dataValues.cust_email;
            req.session.fname = result.dataValues.cust_fname;
            req.session.lname = result.dataValues.cust_lname;
            res.redirect('/user/dashboard');
        }
    }).catch(function (err) {
        usermodel.customer.create({
            cust_email: req.body.email,
            cust_password: req.myhash,
            cust_phone: req.body.phone,
            cust_address: req.body.address,
            cust_gender: req.body.gender,
            cust_fname: req.body.firstname,
            cust_lname: req.body.lastname
        }).then(function (result) {
            req.session.customerEmail = result.dataValues.cust_email;
            req.session.fname = result.dataValues.cust_fname;
            req.session.lname = result.dataValues.cust_lname;
            res.redirect('/user/dashboard');
        })
    })

}

exports.updateUser = function (req, res, next) {
    var updateDetail = {
        cust_email: req.body.email,
        cust_password: req.myhash,
        cust_phone: req.body.phone,
        cust_address: req.body.address,
        // cust_gender: req.body.gender,
        cust_dob: moment.utc(req.body.birthday, 'DD-MM-YYYY'),
        cust_fname: req.body.firstname,
        cust_lname: req.body.lastname
    }
    usermodel.customer.update(updateDetail, { where: { cust_email: req.body.email } })
        .then(function (result) {
            next();
        }).catch(function (err) {
            console.log(err);
            next({
                "status": 500,
                "message": "Couldnot Register User, Database Error ! "
            });
        })
}

//CHECKING USER CUSTOMER EMAIL INTO DATABASE--------------
exports.checkUserEmail = (req, res, next) => {
    // console.log(req.body)
    usermodel.customer.findOne({
        where: { cust_email: req.body.email }
    }).then(function (result) {
        if (result.dataValues != "") {

            next({ "status": 409, "message": result.dataValues.cust_email + ' | email already exists' })
        }
    }).catch(function (err) {
        next();
    })

}

///GET CUSTOMER PROFILE DETAIL
exports.getProfileDetail = (req, res, next) => {
    usermodel.customer.findAll({
        where: { cust_email: req.session.customerEmail }
    }).then(function (result) {
       
        const birthday =  moment(result[0].dataValues.cust_dob).format('DD/MM/YYYY');
       
        if (result.dataValues != "") {
            res.render('userProfile', { customerD: result,dob:birthday })
        } 
    }).catch(function (err) {
        //error handling
        console.log(err)
        // res.redirect('/user/dashboard');
    });
};

exports.getflavourForPlan = (req, res, next) => {
    flavourmodel.flavour.findAll({
        attributes:['flavour_name']
    })
        .then(function (result) {
            res.status(200);
            // res.json(result)
            // flavour_arry.pop();
            // flavour_arry.push(result);
            res.render("cakeplan", { fdata: result });
        })
        .catch(function (err) {
            console.log(err)
        });
}

///GET CAKE PLAN DETAIL
exports.getSelectPlanCakeDetail = (req, res, next) => {
    console.log(req.body)
    mySeq.sequelize.query("SELECT * \
            FROM tblcake c \
            WHERE c.serves = :serves AND \
            c.pound =:pound AND \
            c.version = :version AND \
            c.flavour_id = (SELECT f.flavour_id FROM tblflavour f WHERE f.flavour_name = :flvname) AND\
            c.cake_price <= :cakeprice;",
        {
            replacements: {
                serves: req.body.serves,
                pound: req.body.pound,
                version: req.body.version,
                flvname: req.body.flvname,
                cakeprice: req.body.cakeprice

            }, type: mySeq.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.json(result)
        // res.render('cakeplan', {carray:result})
        // next();
    }).catch(err => {
        next({ "status": 500, "message": err });
    })
};

//--GETTING CUSTOMER DETAIL----------------
var info = {};
exports.getCustomerDetali = (req, res, next) => {
    usermodel.customer.findAll({})
        .then(function (result) {
            if (result.dataValues != "") {
                // var carray = JSON.parse(result);
                // carray.pop();
                // carray.push(result);
                // res.json(result);
                res.render('profile', { customerD: result })
            }
        })
        .catch(function (err) {
            //error handling
            next({ "status": 500, "message": "no user detail saved" });
        });
};
//-- RETERIVE ALL CAKE DETAIL BUT LIMIT----------------
var cake_arry = [];
exports.getAllCakeDetail = (req, res, next) => {
    cakemodel.cake.findAll({
        offset: 0, limit: 12
    })
        .then(function (result) {
            // res.status(200);
            cake_arry.pop();
            cake_arry.push(result);
            res.render("user_dashboard", { cdata: cake_arry[0] });
        })
        .catch(function (err) {
            next({ "status": 500, "message": err });
        });
}///

//BROWSE ALL CAKE FOR SELECTING
exports.browseAllCakeProduct = (req, res, next) => {
    cakemodel.cake.findAll()
        .then(function (result) {
            res.status(200);
            cakeArrTemp.pop(result);//Store all cake detail temp
            cakeArrTemp.push(result);//Store all cake detail temp
            console.log(cakeArrTemp[0])
            res.render("product", { cdata: result });
        })
        .catch(function (err) {
            next({ "status": 500, "message": err });
        });
}

//SELECT CAKE DETAIL BY ID
exports.selectCakeById = (req, res, next) => {
    mySeq.sequelize.query(`SELECT c.cake_id,
        c.cake_name,c.descriptions,c.cake_image,c.flavour_type,
        c.serves,cake_price,c.pound,c.version,f.flavour_name
        FROM tblcake c 
        INNER JOIN  tblflavour f
        on c.flavour_id = f.flavour_id 
        WHERE c.cake_id =:cake_id;`,
        { replacements: { cake_id: req.params.id }, type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.status(200);
            // res.json(result);
            res.render('viewDetails', { cdata: result })
        }).catch(err => {
            next({ "status": 500, "message": err });

        })
}

exports.getArrayCake = (req, res, next) => {
    res.status(200);
    res.json(cakeArrTemp[0]);
    // const filteredItem = cakeArrTemp[0].find((item) => {
    //     return item.dataValues.cake_name === "Apple Cake ";
    // })
    res.json(filteredItem);
}

//--SEARCH CAKE DETAIL FUNCTION FROM DATABASE
exports.searchCakeDetail = async (req, res, next) => {
    mySeq.sequelize.query("SELECT \
                    c.cake_id,c.cake_name, c.cake_price, c.pound, c.version,c.cake_image, f.flavour_name\
                    FROM tblcake c \
                    INNER JOIN  tblflavour f\
                    on c.flavour_id = f.flavour_id \
                    WHERE c.cake_name \
                    LIKE :cakeN \
                    ORDER BY c.pound DESC ",
        { replacements: { cakeN: req.body.cn + '%' }, type: mySeq.sequelize.QueryTypes.SELECT }
    ).then(cakeresult => {

        // res.json(cakeresult)
        res.render('searchAllCake', { cakeresult })
    })
}

//--SEARCH CAKE DETAIL FUNCTION FROM DATABASE
exports.getGiftDetail = async (req, res, next) => {

    giftModel.gift.findAll()
    .then(function (result) {
        res.status(200);
        // res.json(result)
        res.render("giftDetail", { cdata: result });
    })
    .catch(function (err) {
        next({ "status": 500, "message": err });
    });
}

//VALIDATION OF CUSTOMER DETAIL FUNCTION
exports.validateCustomerDetail = (method) => {
    switch (method) {
        case 'addUser': {
            return [
                // username must be an email
                check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail().withMessage('email incorrect'),
                check('password', 'your password must be at least 5 characters long').isLength({ min: 5 }).not().isIn(['12345', 'password', '54321']).withMessage('Do not use a common word as the password'),
                check('cpassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),
                check('phone', 'not a valid phone number').isNumeric(),
                check('birthday', 'date cannot be empty').not().isEmpty(),
                check('address', 'address cannot be empty').not().isEmpty(),
                check('gender', 'gender has invalid value').isIn(['Male', 'Female', 'Other']),
                check('firstname', 'gender cannot be empty').not().isEmpty(),
                check('lastname', 'gender cannot be empty').not().isEmpty(),

                // check('username').exists().isLength({ min: 5 }).trim().escape().withMessage('Name must have more than 5 characters'),
                // expect sunday and saturday
                // check('weekday', 'Choose a weekday').optional().not().isIn(['Sunday', 'Saturday']),
                // check('age', 'not avalid age').isNumeric()
            ]
        }
    }
}
//VALIDATION OF CUSTOMER DETAIL FUNCTION
exports.validateuserdata = async (req, res, next) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        var user = {
            username: req.body.username,
            weekday: req.body.weekday,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age
        }
        res.json(user);
    } catch (err) {
        return next(err)
    }
}

//------FEEDBACK----------------
//USER REGISTRATION FUNCTION ----------------
exports.addFeedback = (req, res, next) => {

    // const { desc, email, cid } = req.body;
    feedbackmodel.feedback.create({
        feedback_desc: req.body.desc,
        cust_email: req.body.email,
        cake_id: req.body.cid
    }).then(function (result) {
        res.json({ message: "Feedback added!!!" });
    }).catch(function (err) {
        next({ "status": 500, "message": err });

    })
}
