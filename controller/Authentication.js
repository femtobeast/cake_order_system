const cm = require("../model/Customer");
const Bcrypt = require("bcrypt");
const Sequelize = require('sequelize');
var mySeq = require("../config/databaseConfig");

//password encryption
var saltRounds = 15;
exports.passwordHashGenerate = async (req, res, next) => {
    console.log(req.body.password);
    // await Bcrypt.hash(req.body.password, saltRounds)
    //     .then(function (hash) {
    //         req.myhash = hash;
    //         console.log(hash);
    //         next();
    //     })
    //     .catch(function (err) {
    //         // next();
    //         console.log(err);
    //     });
}

