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

function getCart(req, res, next){
    res.render("customer/cart");
}

function updateItem(req, res, next){
    const cart = res.locals.cart;

    const updatedItemData = cart.updateItem(req.body.pid, +req.body.newQuantity);

    console.log(updatedItemData)
    res.json({
        message: "updated successfully",
        updatedData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice
        }
    });
}


module.exports = {
    addCartItem: addCartItem,
    getCart:getCart,
    updateItem: updateItem
};