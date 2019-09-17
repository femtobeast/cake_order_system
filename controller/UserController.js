var usermodel = require("../model/Customer");
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


// module.exports = {
//     addUser
// }