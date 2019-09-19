const  multer=  require('multer');
const path = require('path');
var cakemodel = require("../model/Cake");
var flavourmodel = require("../model/Flavour");


//setting storage engine
const storage = multer.diskStorage({
    destination: './resources/uploads/',
    filename:function (req,file,cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//check File Type
function checkFileType(file,cb){
    //allowed ext
    const filetypes = /jpeg|jpg|png/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true)
    }else {
        cb('Error: Image only!!!!!')
    }
}

//Init upload
const upload = multer({
    storage: storage,
    limit:{fileSize: 1000000},
    fileFilter: function (req,file,cb) {
        checkFileType(file,cb);
        
    }
}).single('cakeimage');

//add flavour details information
function addFlavour(req,res,next){
    usermodel.customer.create(
        {
            flavour_name:req.body.flavourname,
            flavour_type: req.body.flavourtype
        })
        .then(function (result) {
            next();
        })
        .catch(function (err) {
            //to show error if any mistake is occured in addEmployee function.
            //extraNote: whenever we write some thing in next by defaultly it
            //will go to error.
            next({"status": 500, "message": "Something went wrong"});
            console.log(err)
        })

}


module.exports={
    upload,
    addFlavour

};