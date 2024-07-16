const Orders = require("../model/ordersModel");
const Users = require("../model/userModel");

async function addOrder(req, res, next) {
    const cart = req.session.cart;

    let user;
    try {
        user = await Users.getById(res.locals.uid);
    } catch (e) {
        next(e);
        return;
    }

    const order = new Orders(cart, user);

    try{
        await order.save();
    }catch(e){
        next(e);
        return;
    }
    
    res.redirect("/orders");
}

async function getOrders(req, res, next){
    let orders;

    try{
        orders = await Orders.getUserOrders(res.locals.uid);
    }catch(e){
        next(e);
        return;
    }

    res.render("customer/orders", {orders:orders});
}

module.exports = {
    addOrder: addOrder,
    getOrders: getOrders
};