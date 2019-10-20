var mysequelize = require("../config/databaseConfig");
var flavour = require("./Flavour");
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
            allowNull: false
        },
        flavour_id: {
            type: mysequelize.Sequelize.INTEGER,
            allowNull: true
        },
        descriptions: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
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
        freezeTableName: true,
        tableName: "tblcake"
    }
);
// cake.hasMany(flavour, { foreignKey: 'channel_fk', as: 'channels' });
// cake.hasMany(flavour, { foreignKey: 'flavour_id' });


cake
    .sync({ force: false }) //first time is true second should be false. repeatedly creating tables new
    // flavour.sync
    .then(function () {
        console.log("cake table created");
    })
    .catch(function (err) {
        console.log("err in creating table");
    });


module.exports = { cake };