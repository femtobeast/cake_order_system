
const express = require("express"); //server framework
const bodyparser = require("body-parser");//packages body-parser
const app = express(); //express method 
const path = require("path");
const cookieParser = require('cookie-parser');

var expressSession = require('express-session');



//--------------------------------------
const userRoute = require('./route/userroute');//userroute for url path
const adminRoute = require('./route/adminroute');//adminroute url


//------------------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "content-type,X-Requested-With,authorization,ERR_HTTP_HEADERS_SENT");
  next();
});
// app.engine('ejs',ejs({
//   extname:'ejs',defaultLayout:'layout',layoutDir:__dirname+'/views',
// }))
app.set("views", __dirname + "/views");//set view folder
app.set("view engine", "ejs");//set the view engine as ejs
app.use(bodyparser.urlencoded({ extended: true })); //multipart data for image video giving true
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "resources")));//hosting public folder 
// app.use(check());
app.use(expressSession({
  secret: 'max',
  saveUninitialized: false,
  resave: false
}))

// app.post('/check', [
//   check('username').exists().isLength({ min: 5 }).trim().escape().withMessage('Name must have more than 5 characters'),
//   // expect sunday and saturday
//   check('weekday', 'Choose a weekday').optional().not().isIn(['Sunday', 'Saturday']),
//   // username must be an email
//   check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
//   // password must be at least 5 chars long
//   check('password', 'your password must be at least 8 characters long').isLength({ min: 5 }),
//   //confirm password
//   check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),
//   check('age','not avalid age').isNumeric()
// ],(req, res) => {
//   // Finds the validation errors in this request and wraps them in an object with handy functions
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }

//   var user = {
//     username: req.body.username,
//     weekday: req.body.weekday,
//     email: req.body.email,
//     password: req.body.password,
//     age:req.body.age
//   }
//   res.json(user);
// });
//-----------------------------


// app.use(express.static('./resources'));
// app.use(express.static('resources'));
// app.use(express.static('route'));

//ignore favicon problem
function ignoreFavicon(req, res, next) {
  if (req.originalUrl == './favicon.ico') {
    res.status(204).json({ nope: true });

  } else if (req.originalUrl == '/map-red.png') {
    res.status(204).json({ nope: true });
  } else if (req.originalUrl == '/Roboto-Bold.woff2') {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
}
app.use(ignoreFavicon);
//----------------------------------------------


//----route defination
app.get("/", (req, res) => {
  const wt = "Yummy Cake";
  const redirect = [{
    title:"WARNING!!! Redirect to login: [server address: localhost:1234/, port: 1234]",
    login:"http://localhost:1234/user/login",
    subtitle:"this is root page!!!"
  }];
  console.log(redirect)
  res.render('welcome', { wt,redirect });
});
app.use("/user", userRoute);
app.use("/admin", adminRoute);



//---error defining 
app.use((err, req, res, next) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600) res.status(err.status);
  else res.status(500);
  res.send({ "message": err.message });
});
//--------------------------





//route for upload folders
//Serves all the request which includes /images in the url from Images folder
var publicDir = require('path').join(__filename, '/resources/uploads');
app.use(express.static(publicDir));

app.use(express.static('public'));
app.use('/upload', express.static(__dirname + '/resources/uploads'));
app.get("/upload", function (req, res, next) {
  res.send(publicDir)
})
//end of route for upload folders



// const port =1234;//set port
// curl -X GET http://localhost:1234/user/login -v
app.listen(process.env.PORT, () => {
  try {
    console.log("server running on port: " + process.env.PORT)
  } catch (err) {
    console.log("server not running on port: " + process.env.PORT)
  }
});//port listen function




module.exports = app;