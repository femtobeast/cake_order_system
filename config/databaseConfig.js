///////////database connection to mysql,mariadb
var Sequelize = require("sequelize"); //setting up connection
var sequelize = new Sequelize("cakedb", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

sequelize
  .authenticate()
  .then(function() {
    console.log("databases connected");
  })
  .catch(function(err) {
    console.log(err);
  });

console.log("i am here");

module.exports = {
  sequelize, //connection
  Sequelize //define datatype of database
};