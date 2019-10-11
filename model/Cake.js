
var mysequelize = require("../config/databaseConfig");
var FlavourModel = require("../model/Flavour");
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
        },
        flavour_type: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        cake_price: {
            type: mysequelize.Sequelize.INTEGER,
            allowNull: false
        },
        serves: {
            type: mysequelize.Sequelize.INTEGER,
            allowNull: false
        },
        version: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
    },
    {
        // underscored: true, //for foreign key
        // name: {
        //     singular: 'tblcake',
        //     plural: 'tblcakes',
        // },
        freezeTableName: true,
        tableName: "tblcake"
    }
);
// cake.belongsTo(FlavourModel.flavour); //creating relation for foreign key
cake
    .sync({ force: false }) //first time is true second should be false. repeatedly creating tables new
    .then(function () {
        console.log("cake table created");
    })
    .catch(function (err) {
        console.log("err in creating table");
    });


module.exports = { cake };