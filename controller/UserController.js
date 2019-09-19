var usermodel = require("../model/Customer");

//insert user data into database
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


///checking username in database already exist or not
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


// module.exports = {
//     addUser
// }