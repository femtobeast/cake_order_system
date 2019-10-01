var usermodel = require("../model/Customer");
var cakemodel = require("../model/Cake");
var flavourmodel = require("../model/Flavour");
const { check, validationResult } = require('express-validator');
const mySeq = require('../config/databaseConfig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.addUser = (req, res, next) => {
    usermodel.customer.create(
        {
            cust_email: req.body.email,
            cust_password: req.body.password,
            cust_phone: req.body.phone,
            cust_dob: req.body.birthday,
            cust_address: req.body.address,
            cust_gender: req.body.gender,
            cust_fname: req.body.firstname,
            cust_lname: req.body.lastname
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


//checking username in database already exist or not
exports.checkUserEmail = async (req, res, next) => {
    await cm.customer.findOne({
        where: { cust_email: req.body.email }
    })
        .then(function (result) {
            console.log(result.dataValues);
            if (result.dataValues != "") {
                next({ "status": 409, "message": 'email already exists' })
            }
        })
        .catch(function (err) {
            //error handling
            next();
        });
}


var info = {};
//getting all user 
exports.getCustomerDetali = (req, res, next) => {
    // request(url, function (error, response, body) {
    //     const info = JSON.parse(body);
    //     res.render('user_dashboard', { info });
    // });

    usermodel.customer.findAll({})
        .then(function (result) {
            // console.log(result[0].cust_id);
            if (result.dataValues != "") {
                res.render('user_dashboard', {
                    info: result
                });
                // var carray = JSON.parse(result);
                // carray.pop();
                // carray.push(result);
                // res.json(result);
                // res.render('user_dashboard',{carray})
            }
        })
        .catch(function (err) {
            //error handling
            next({ "status": 500, "message": "no user detail saved" });
        });
};


//cake data reterival
var cake_arry = [];
exports.getAllCakeDetail = (req, res, next) => {
    cakemodel.cake.findAll()
        .then(function (result) {
            // res.status(200);
            cake_arry.pop();
            cake_arry.push(result);
            // res.json(cake_arry[0])
            // flavour_arry = JSON.stringify(result);
            res.render("user_dashboard", { cdata: cake_arry[0] });
            // console.log(JSON.stringify(result))
            // res.json(result);
        })
        .catch(function (err) {
            console.log(err)
        });
}
exports.validate = (method) => {
    switch (method) {
        case 'validateuserdata': {
            return [
                check('username').exists().isLength({ min: 5 }).trim().escape().withMessage('Name must have more than 5 characters'),
                // expect sunday and saturday
                check('weekday', 'Choose a weekday').optional().not().isIn(['Sunday', 'Saturday']),
                // username must be an email
                check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
                // password must be at least 5 chars long
                check('password', 'your password must be at least 8 characters long').isLength({ min: 5 }),
                //confirm password
                check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),
                check('age', 'not avalid age').isNumeric()
            ]
        }
    }
}
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

///search function for cake detail
exports.searchCakeDetail = async (req, res, next) => {
    mySeq.sequelize.query("SELECT \
            c.cake_name, c.cake_price, c.pound, c.version, f.flavour_name\
            FROM tblcake c \
            INNER JOIN  tblflavour f\
            on c.flavour_id = f.flavour_id \
            WHERE c.cake_name \
            LIKE :cakeN \
            ORDER BY c.pound DESC ",
        { replacements: { cakeN: req.body.cn + '%' }, type: mySeq.sequelize.QueryTypes.SELECT }
    ).then(cakeresult => {
      res.json(cakeresult)
    })
}


// flavourmodel.flavour.findAll({
//     attributes: ['flavour_id']
// }).then(function (flavourResult) {
//     cakemodel.cake.findAll({
//         where: {
//             cake_name:
//             {
//                 [Op.like]: req.body.cn + '%'
//             }
//         }
//     }).then(function (cakeResult) {
//         console.table(flavourResult);
//     })

// })