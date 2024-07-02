const Product = require("../model/productModel");

async function getAllProducts(req, res, next){
    try{
        const products = await Product.findAll();
        res.render("customer/all-products", {products: products});
    }catch(e){
        next(e);
        return;
    }   
}

async function getProductDetail(req, res, next){
    const pid = req.params.pid;
    try{
        const product = await Product.findProdById(pid);
        console.log(product)
        res.render("customer/product-detail", {prod: product});
    }catch(e){
        next(e);
        return;
    }
}

module.exports = {
    getAllProducts: getAllProducts,
    getProductDetail: getProductDetail
};