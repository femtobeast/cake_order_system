
const express = require("express"); //server framework
const bodyparser = require("body-parser");//packages body-parser
const app = express(); //express method 
const path = require("path");
//setRoute for url path
const userRoute = require('./route/userroute');
const adminRoute = require('./route/adminroute');
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

app.use(express.static(path.join(__dirname, "resources")));
//public folder
app.use(express.static('./resources'));

// app.use(express.static('resources'));
// app.use(express.static('route'));

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


//----route defination
app.use("/user", userRoute);
app.use("/admin", adminRoute);




app.use((err, req, res, next) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600) res.status(err.status);
  else res.status(500);
  res.send({ "message": err.message });
});






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
});




module.exports = app;