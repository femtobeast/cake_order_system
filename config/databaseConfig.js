///////////database connection to mysql,mariadb
var Sequelize = require("sequelize"); //setting
var sequelize = new Sequelize("cakedb", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

sequelize
  .authenticate()
  .then(function () {
    console.log("databases connected");
  })
  .catch(function (err) {
    console.log(err);
  });
module.exports = {
  
  sequelize, //connection
  Sequelize//define datatype of database
};