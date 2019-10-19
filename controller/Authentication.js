const CustomerModel = require("../model/Customer");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
var mySeq = require("../config/databaseConfig");

//--PASSWORD ENCRYPTION 
var saltRounds = 15;
exports.passwordHashGenerate = async (req, res, next) => {

    await Bcrypt.hash(req.body.password, saltRounds)
        .then(function (hash) {
            req.myhash = hash;
            next();
        })
        .catch(function (err) {
            console.log(err);
        });
}

//--LOGIN VALIDATION 
exports.loginValidation = (req, res, next) => {
    const { email, password } = req.body;
    CustomerModel.customer.findOne({
        attributes: [
            'cust_fname',
            'cust_lname',
            'cust_phone',
            'cust_id',
            'cust_password',
            'cust_email'
        ],
        where: { cust_email: email }
    }).then(function (result) {
        if (result != null) {
            Bcrypt.compare(password, result.dataValues.cust_password, function (err, res) {
                if (res) {
                    req.session.fname = result.dataValues.cust_fname;
                    req.session.lname = result.dataValues.cust_lname;
                    req.session.mobile = result.dataValues.cust_phone;


                    req.session.customerEmail = result.dataValues.cust_email;
                    req.session.customerId = result.dataValues.cust_id;
                    next(); //////
                } else {                
                    next({ "status": 409, "message": "Password didnot match" });
                }
            });
        } else {
            next({ status: 409, "message": "Email not found | " + req.body.email });
        }
    }).catch(function (err) {
        next({ status: 409, "message": " Email not found" });
    })
}
//-----------------------------------------------------
//--GENERATE TOKEN 
exports.generateJwtToken = (req, res, next) => {
    jwt.sign({
        cust_email: req.body.email,
        accessLevel: 'superadmin'
    }, 'secretkey', {
        expiresIn: "2h"
    },
        function (err, token) {
            if (err != null || undefined) {
                next({ "status": 401, "message": "Unauthorized token" })
            } else {
                // req.genToken = token;
                req.session.token = token;
                // res.send({ token: req.session.token });
                next();
            }
        }
    )
}
// -----------------------------------------------------
// --VERIFY TOKEN FOR AUTHENTICATION
exports.verifyToken = function (req, res, next) {
    console.log(req.headers);
    if (req.headers.authorization == undefined) {
        next({ status: 500, message: 'no authorization header present' })
    } else {

        let token = req.headers.authorization.slice(7, req.headers.authorization.length)

        jwt.verify(token, 'thisissecretkey', function (err, decoded) {

            if (err != null) {
                next({ status: 500, message: err.message })
                console.log(err);
            } else {
                next();
            }
        })

    }
}

//REDIRECT TO LOGIN PAGE IF NOT LOGED IN
exports.redirectToLogin = (req, res, next) => {
    console.log(req.session.token + " redirect to login")
    if (!req.session.token) {
        res.redirect('/user/login');//redirect to clone
    } else {
        next();
    }
}

//REDIRECT TO DASHBOARD IF LOGED IN
exports.redirectToHome = (req, res, next) => {
    console.log(req.session.token + " not authenticate | token not generated")
    if (req.session.token) {
        res.redirect('/user/dashboard');
    } else {
        next();
    }
}

