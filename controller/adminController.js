const multer = require('multer');
const path = require('path');
var cakemodel = require("../model/Cake");

var flavourmodel = require("../model/Flavour");
var database = require("../config/databaseConfig")


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
const upload = multer({
    storage: storage,
    limit: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);

    },

}).single('cakeimage');

//add flavour details information
function addFlavour(req, res, next) {
    console.log(req.body)
    flavourmodel.flavour.create(
        {
            flavour_name: req.body.flavourname
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
function getflavour(req, res, next) {
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

var fid;
function addCake(req, res, next) {
    //id reterive 
    flavourmodel.flavour.findOne({
        attributes: ['flavour_id'],
        where: { flavour_name: req.body.flavourname }
    }).then(function (result) {
        res.status(200)
        fid = result.flavour_id;
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






var cake_arry = [];
function getcake(req, res, next) {
    cakemodel.cake.findAll()
        .then(function (result) {
            res.status(200);
            cake_arry.pop();
            cake_arry.push(result);
            res.render("admin/vc", { fdata: cake_arry[0] });

        })
        .catch(function (err) {
            console.log(err)
        });
}




module.exports = {
    upload,
    addFlavour,
    getflavour,
    addCake

};