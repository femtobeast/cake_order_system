
var mysequelize = require("../config/databaseConfig");
var order = mysequelize.sequelize.define(
    "tblorder",
    {
        order_id: {
            type: mysequelize.Sequelize.BIGINT(10),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        order_by: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        order_pdate: {
            type: mysequelize.Sequelize.DATEONLY,
            allowNull: false
        },
        order_alias: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        order_city: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        order_phone: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        order_phone2: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        order_qty: {
            type: mysequelize.Sequelize.INTEGER,
            allowNull: false
        },
        order_total: {
            type: mysequelize.Sequelize.INTEGER,
            allowNull: false
           
        },
        order_cust_id: {
            type: mysequelize.Sequelize.BIGINT(10),
            allowNull: false
        },
        order_status: {
            type: mysequelize.Sequelize.ENUM,
            values: [ 'notapproval','complete','progress','delivered']
        },
        delivery_option: {
            type: mysequelize.Sequelize.ENUM,
            values: ['normal', 'urgent','any']
        },
        delivery_date: {
            type: mysequelize.Sequelize.DATEONLY,
            allowNull: false
        },
        delivery_location: {
            type: mysequelize.Sequelize.STRING,
            allowNull: false
        },
        paymentM: {
            type: mysequelize.Sequelize.ENUM,
            values: ['cashondelivery', 'epay'],
            allowNull:false
        },
        cake_id: {
            type: mysequelize.Sequelize.INTEGER,
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
        tableName: "tblorder"
    }
);

order
    .sync({ force: false }) //first time is true second should be false. repeatedly creating tables new
    .then(function () {
        console.log("order table created");
    })
    .catch(function (err) {
        console.log("err in creating order table");
    });


module.exports = { order };