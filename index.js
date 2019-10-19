// color code- #f66 | text color - #424040  |  normal- #fff

const express = require("express"); //server framework
const bodyparser = require("body-parser");//packages body-parser
const app = express(); //express method 
const path = require("path");
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('express-flash');
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

app.set("views", __dirname + "/views");//set view folder
app.set("view engine", "ejs");//set the view engine as ejs
app.use(bodyparser.urlencoded({ extended: true })); //multipart data for image video giving true
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "resources")));//hosting public folder 

// -- SESSION CODE BELOW START
const HOURS = 1000 * 60 * 60 * 24;
const {
  PORT = process.env.PORT,
  SESS_NAME = 'sid',
  SESS_SECRET = 'JHGF>,./?;;LJ8#$?,KL:>>>,,KJJJDHE',
  NODE_ENV = 'development',
  SESS_LIFETIME = HOURS
} = process.env
const IN_PROD = NODE_ENV === 'production'

app.use(cookieParser());
app.use(expressSession({
  // genid: function (req) {
  //   return i++ // use UUIDs for session IDs
  // },
  name: SESS_NAME,
  resave: false,
  secret: 'max',
  saveUninitialized: false,
  cookie: { maxAge: SESS_LIFETIME, sameSite: true, secure: IN_PROD }
}))
app.use(flash());
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.carttemp = req.cookies.carttemp;
  const { customerId,customerEmail,token } = res.locals.session;
  if (token) {
    res.locals.custid = customerId;
    res.locals.custemail = customerEmail;
  }
  next();
})
// app.use(function (req, res, next) {
//   res.locals.carttemp = req.cookies.carttemp;
//   next();
// });
//----route defination
app.get("/", (req, res) => {
  const { userId } = req.session;
  const wt = "Yummy Cake";
  const redirect = [{
    title: "WARNING!!! Redirect to login: [server address: localhost:1234/, port: 1234]",
    login: "http://localhost:1234/user/login",
    subtitle: "this is root page!!!"
    // userid: `${userId}`
  }];
  res.render('welcome', { wt, redirect, userId });
});

//---------SESSION CODE END 
app.use("/user", userRoute);
app.use("/admin", adminRoute);


//---error defining 
app.use((err, req, res, next) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600) res.status(err.status);
  else res.status(500);
  return res.send({ "status": err.status, "message": err.message });
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


// const port =1234;//set port
// curl -X GET http://localhost:1234/user/login -v
app.listen(PORT, () => {
  try {
    console.log(`server running on port:  ${PORT}`)
  } catch (err) {
    console.log(`server not running on port:  ${PORT} `)
  }
});//port listen function



module.exports = app;
