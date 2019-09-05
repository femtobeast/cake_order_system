
const express = require("express"); //server framework
const bodyparser = require("body-parser");
const app = express();
var path = require("path");

app.set("views", __dirname + "/views");
//set the view engine as ejs
app.set("view engine", "ejs");

app.use(bodyparser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "content-type,X-Requested-With,authorization");
  next();
});

app.get('/main',(req,res)=>{
    res.render("index");
});

app.listen(process.env.PORT, () => {
    try {
        console.log('Server is up and running on port numner ' + process.env.PORT);
    } catch (error) {
        console.log('Server not running on port' + process.env.PORT);

    }
});
module.exports = app;
// app.listen(process.env.PORT);