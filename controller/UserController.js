var usermodel = require("../model/Customer");
exports.addUser =(req, res, next) =>{
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

const url = 'http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=3a3188bfc5bb7c5d2eff1a4985214289';

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
