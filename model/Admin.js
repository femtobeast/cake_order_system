var mysequelize = require("../config/databaseConfig");
var admin = mysequelize.sequelize.define(
    "tbladmin",
    {
        admin_id: {
            type: mysequelize.Sequelize.BIGINT(10),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        first_name: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
    },
    {
        freezeTableName: true,
        tableName: "tbladmin"
    }
);
// cake.hasMany(flavour, { foreignKey: 'channel_fk', as: 'channels' });
// cake.hasMany(flavour, { foreignKey: 'flavour_id' });


admin
    .sync({ force: false }) //first time is true second should be false. repeatedly creating tables new
    // flavour.sync
    .then(function () {
        console.log("admin table created");
    })
    .catch(function (err) {
        console.log("err in creating table");
    });


module.exports = { admin };