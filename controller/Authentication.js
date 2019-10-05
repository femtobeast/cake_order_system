const CustomerModel = require("../model/Customer");
const Bcrypt = require("bcrypt");
const Sequelize = require('sequelize');
var mySeq = require("../config/databaseConfig");

//--PASSWORD ENCRYPTION 
var saltRounds = 15;
exports.passwordHashGenerate = async (req, res, next) => {
    console.log(req.body.password);
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

   CustomerModel.customer.findOne({
        attributes: [
            'cust_password',
            'cust_email'
        ],
        where: { cust_email: req.body.cust_email }
    }).then(function (result) {
        console.log(result)
            // if (result != null) {
            //     bcrypt.compare(req.body.password, result.dataValues.cust_password, function (err, res) {
            //         if (res) {
            //             next();
            //         } else {
            //             next({ "status": 409, "message": "Password didnot match" });
            //         }
            //     });
            // } else {
            //     next({ status: 409, "message": "Not matched" });
            // }
        })
        .catch(function (err) {
            // console.log(err);
            next({ status: 409, "message": " Email not found" });
        })
}
//-----------------------------------------------------
//--GENERATE TOKEN 
exports.generateJwtToken = (req, res, next) => {
    // jwt.sign({
    //     username: req.body.cust_email,
    //     accessLevel: 'superadmin'
    // }, 'this-is-secret-key', {
    //     expiresIn: "2h"
    // },
    //     function (err, token) {
    //         if (err != null || undefined) {
    //             console.log(err)
    //             next({ "status": 401, "message": "Unauthorized token" })
    //         } else {
    //             req.genToken = token;
    //             next();
    //             // console.log(token)	
    //         }
    //     }
    // )
    
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
            console.log(decoded);
            if (err != null) {
                next({ status: 500, message: err.message })
                console.log(err);
            } else {
                next();
            }
        })

    }
}
