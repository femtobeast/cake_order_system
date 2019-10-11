
var mysequelize = require("../config/databaseConfig");
 flavour = mysequelize.sequelize.define(
    "tblflavour",
    {
        flavour_id: {
            type: mysequelize.Sequelize.INTEGER(10),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        flavour_name: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },

    },
     {
        //  underscored: true, //fore foreign key
        //  name: {
        //      singular: 'tblflavour',
        //      plural: 'tblflavours',
        //  },
        freezeTableName: true,
        tableName: "tblflavour"
    }
);
flavour
    .sync({ force: false }) //first time is true second should be false. repeatedly creating tables new
    .then(function () {
        console.log("flavour table created");
    })
    .catch(function (err) {
        console.log("err in creating table");
    });
module.exports = { flavour };