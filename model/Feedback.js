
var mysequelize = require("../config/databaseConfig");
 feedback = mysequelize.sequelize.define(
    "tblfeedback",
    {
        feedback_id: {
            type: mysequelize.Sequelize.INTEGER(10),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        feedback_desc: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        cust_email: {
            type: mysequelize.Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        cake_id: {
            type: mysequelize.Sequelize.INTEGER,
            allowNull: false
        }
    },
    {

        freezeTableName: true,
        tableName: "tblfeedback"
    }
);
feedback
    .sync({ force: false }) //first time is true second should be false. repeatedly creating tables new
    .then(function () {
        console.log("feedback table created");
    })
    .catch(function (err) {
        console.log("err in creating feedback table");
    });
module.exports = { feedback };