const Product = require("../model/productModel");
const Cart = require("../model/cartModel");

async function addCartItem(req, res, next){
    let product;
    try{
        product = await Product.findProdById(req.body.pid);
    }catch(e){
        next(e);
        return;
    }
    const cart = req.session.cart;
    cart.addItem(product);

    req.session.cart = cart;

    res.status(201).json({
        message: "cart updated successfully",
        newTotal: cart.totalQuantity
    });
}

module.exports = {
    addCartItem: addCartItem
};