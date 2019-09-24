var mysequelize = require("../config/databaseConfig");
var cake = mysequelize.sequelize.define(
    "tblcake",
    {
        cake_id: {
            type: mysequelize.Sequelize.BIGINT(10),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        cake_name: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        // flavourname: {
        //     type: mysequelize.Sequelize.STRING,
        //     allowNull: false
        // },
        // flavourtype: {
        //     type: mysequelize.Sequelize.STRING,
        //     allowNull: false
        // },
        pound: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        cake_image: {
            type: mysequelize.Sequelize.STRING,
            allowNull: true
        },
        flavour_id: {
            type: mysequelize.Sequelize.INTEGER,
            allowNull: true
        },
        descriptions: {
            type: mysequelize.Sequelize.STRING,
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        tableName: "tblcake"
    }
);
cake
    .sync({ force: false }) //first time is true second should be false. repeatedly creating tables new
    .then(function () {
        console.log("cake table created");
    })
    .catch(function (err) {
        console.log("err in creating table");
    });

module.exports = { cake };