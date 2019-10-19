const ordermodel = require('../model/Order');
const moment = require('moment');
const mySeq = require('../config/databaseConfig');
const Sequelize = require('sequelize');

//USER REGISTRATION FUNCTION ----------------
exports.placeOrder = (req, res, next) => {
    var orderLength = req.body.orderLength;
    var ordercart = req.cookies.carttemp;
console.log(ordercart)
        // ordermodel.order.create({
        //     order_by: req.body.receiverName,
        //     order_pdate: moment.utc("2019/09/09", 'YYYY-MM-DD'),
        //     order_alias: req.body.alias,
        //     order_city: req.body.city,
        //     order_phone: req.body.mobileno,
        //     order_phone2: req.body.mobileno2,
        //     order_qty: req.body.oqty,
        //     order_total: req.body.ototalprice,
        //     order_cust_id: req.session.customerId,
        //     order_status: 'notapproval',
        //     delivery_option: req.body.doption,
        //     delivery_date: moment.utc(req.body.ddate, 'YYYY-MM-DD'),
        //     delivery_location: req.body.dlocation,
        //     paymentM: req.body.paymentM,
        //     cake_id: req.body.cake_id
        // }).then(function (result) {
        //     res.send({ message: "Order Placed!!!" });
        // }).catch(function (err) {
        //     next({ "status": 500, "message": err });
        //     console.log(err)
        // })
    
}
exports.getNotApproveOrder = (req, res, next) => {
    const ocid = req.session.customerId;
    if (ocid) {
        mySeq.sequelize.query(`SELECT 
                c.cake_name,c.descriptions,c.cake_image,
                c.serves,cake_price,c.pound,c.version,
                o.order_status,o.order_pdate,o.order_by,o.order_alias,o.order_qty,o.order_total,
                o.delivery_option,o.delivery_location,o.delivery_date,o.order_phone
                FROM tblcake c 
                INNER JOIN  tblorder o
                on c.cake_id = o.cake_id 
                WHERE o.order_cust_id = :order_cust_id;`,
            { replacements: { order_cust_id: ocid }, type: mySeq.sequelize.QueryTypes.SELECT })
            .then(result => {
                res.status(200);
                res.render("orderDetail", { orders: result });
            }).catch(err => {
                next({ "status": 500, "message": err });

            })
    } else {
        res.render("orderDetail", { orders: null });
    }
    // ordermodel.order.findOne({
    //     where: { order_email: req.body.oemail }
    // }).then(function (result) {
    //     res.send({ message: "Order Placed!!!" });
    // }).catch(function (err) {
    //     next({ "status": 500, "message": err });
    //     console.log(err)
    // })
}
