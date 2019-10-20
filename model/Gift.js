var mysequelize = require("../config/databaseConfig");
var gift = mysequelize.sequelize.define(
    "tblgift",
    {
        gift_id: {
            type: mysequelize.Sequelize.INTEGER(10),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        gift_name: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        gift_price: {
            type: mysequelize.Sequelize.INTEGER,
            allowNull: false
        },
        gift_image: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        }

    },
    {
        freezeTableName: true,
        tableName: "tblgift"
    }
);
gift
    .sync({ force: false }) //first time is true second should be false. repeatedly creating tables new
    .then(function () {
        console.log("gift table created");
    })
    .catch(function (err) {
        console.log("err in creating table");
    });
module.exports = { gift };