const  multer=  require('multer');
const path = require('path');
var cakemodel = require("../model/Cake");

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


module.exports={
    upload

};