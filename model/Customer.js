var mysequelize = require("../config/databaseConfig");
const TIMESTAMP = require("sequelize-mysql-timestamp")(mysequelize.sequelize);

var customer = mysequelize.sequelize.define(
    "tblcustomer", {
    cust_id: {
        type: mysequelize.Sequelize.BIGINT(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cust_email: {
        type: mysequelize.Sequelize.STRING,
        unique: true,
        allowNull: true
    },
    cust_fname: {
        type: mysequelize.Sequelize.STRING,
        allowNull: true
    },
    cust_lname: {
        type: mysequelize.Sequelize.STRING,
        allowNull: true
    },
    cust_password: {
        type: mysequelize.Sequelize.STRING,
        allowNull: true
    },
    cust_phone: {
        type: mysequelize.Sequelize.STRING,
        allowNull: true
    },
    cust_dob: {
        type: mysequelize.Sequelize.DATEONLY,
        allowNull: true
    },
    cust_address: {
        type: mysequelize.Sequelize.STRING,
        allowNull: true
    },
    cust_gender: {
        type: mysequelize.Sequelize.STRING,
        allowNull: true
    }
}, {
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