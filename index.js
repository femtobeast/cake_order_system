const express = require("express"); //server framework
const bodyparser = require("body-parser");
const app = express();
const path = require("path");
//setRoute for url path
const userRoute = require('./route/userroute');
//------------------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "content-type,X-Requested-With,authorization");
  next();
});
app.set("views", __dirname + "/views");//set view folder
app.set("view engine", "ejs");//set the view engine as ejs
app.use(bodyparser.urlencoded({ extended: true })); //multipart data for image video giving true
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "resources")));



app.use("/user", userRoute);



const port =1234;//set port
app.listen(port, () => {
  try {
    console.log("server running on port: " + port)
  } catch (err) {
    console.log("server not running on port: " + port)
  }
});
module.exports = app;