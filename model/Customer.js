var mysequelize = require("../config/databaseConfig");
var customer = mysequelize.sequelize.define(
  "tblcustomer",
  {
    id: {
      type: mysequelize.Sequelize.BIGINT(10),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: mysequelize.Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: mysequelize.Sequelize.STRING,
      allowNull: false
    },
    firstname: {
      type: mysequelize.Sequelize.STRING,
      allowNull: true
    },
    lastname: {
      type: mysequelize.Sequelize.STRING,
      allowNull: true
    },
    address: {
      type: mysequelize.Sequelize.STRING,
      allowNull: false
    }
    // userphoto: {
    //   type: mysequelize.Sequelize.STRING(100),
    //   allowNull: true
    // }
  },
  {
    freezeTableName: true,
    tableName: "tblcustomer"
  }
);
customer
  .sync({ force: false }) //first time is true second should be false. repeatedly creating tables new
  .then(function () {
    console.log("user table created");
  })
  .catch(function (err) {
    console.log("err in creating table");
  });

module.exports = { customer };