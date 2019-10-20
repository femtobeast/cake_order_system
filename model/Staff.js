var mysequelize = require("../config/databaseConfig");
var staff = mysequelize.sequelize.define(
    "tblstaff",
    {
        staff_id: {
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
        phonenumber: {
            type: mysequelize.Sequelize.INTEGER,
            allowNull: false
        },
        department: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
    },
    {
        freezeTableName: true,
        tableName: "tblstaff"
    }
);
// cake.hasMany(flavour, { foreignKey: 'channel_fk', as: 'channels' });
// cake.hasMany(flavour, { foreignKey: 'flavour_id' });


staff
    .sync({ force: false }) //first time is true second should be false. repeatedly creating tables new
    // flavour.sync
    .then(function () {
        console.log("staff table created");
    })
    .catch(function (err) {
        console.log("err in creating table");
    });


module.exports = { staff };