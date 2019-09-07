const express = require("express"); //server framework
const bodyparser = require("body-parser");
const app = express();
const path = require("path");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "content-type,X-Requested-With,authorization");
  next();
});
app.set("views", __dirname + "/views");
//set the view engine as ejs
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true })); //multipart data for image video giving true
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "resources")));

// app.get('/main',(req,res)=>{
// res.render("index");
// });

app.get('/', function (req, resp) {
  const wt = "Welcome to Yummy Cake";
  const favoriteThings = [
    "Red Velvet",
    "Black Forest"
  ];

  resp.render('index', { wt, favoriteThings });
})


const port = 5000;
app.listen(port, () => {
  try {
    console.log("server running on port -" + port)
  } catch (err) {
    console.log("server not running on port -" + port)
  }
});
module.exports = app;