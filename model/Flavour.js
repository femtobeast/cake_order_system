var mysequelize = require("../config/databaseConfig");
var flavour = mysequelize.sequelize.define(
    "tblflavour", {
        flavour_id: {
            type: mysequelize.Sequelize.BIGINT(10),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        flavour_name: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        }
        // flavour_type: {
        //     type: mysequelize.Sequelize.STRING,
        //     allowNull: false
        // }
    }, {
        freezeTableName: true,
        tableName: "tblflavour"
    }
);
flavour
    .sync({ force: false }) //first time is true second should be false. repeatedly creating tables new
    .then(function() {
        console.log("flavour table created");
    })
    .catch(function(err) {
        console.log("err in creating table");
    });

module.exports = { flavour };