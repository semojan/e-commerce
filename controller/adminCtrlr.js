const Product = require("../model/productModel");
const sessionFlash = require("../ConfigAndAssets/sessionFlash");

async function getAllProducts(req, res, next){
    
    try{
        const products = await Product.findAll();
        res.render("./admin/all-products", {products: products});
    } catch(e){
        next(e);
        return;
    }

}

function getNewProd(req, res, next){
    res.render("./admin/new-product");
}

async function addProduct(req, res, next){
    const prod = new Product({
        ... req.body,
        image: req.file.filename
    });   

    
    try{
        await prod.save();
    } catch (e) {
        next(e);
        return;
    }

    res.redirect("/admin/product");
}

async function getEditProduct(req, res, next){
    const pid = req.params.pid;
    
    try{
        const product = await Product.findProdById(pid);
        res.render("./admin/update-product", {product: product});
    }catch(e){
        next(e);
        return;
    }
    
}

async function editProduct(req, res, next){
    const prod = new Product({
        ... req.body,
        _id: req.params.pid
    }); 

    if(req.file){
        prod.replaceImage(req.file.filename);
    }
    
    try{
        await prod.save();
    } catch (e) {
        next(e);
        return;
    }

    res.redirect("/admin/product");
}

async function deleteProduct(req, res, next){
    let product;
    try{
        product = await Product.findProdById(req.params.pid);
        await product.removeProduct();
    }catch(e){
        next(e);
        return;
    }
    res.json({message: "deleted successfully!"});
}

module.exports = {
    getAllProducts: getAllProducts,
    getNewProd: getNewProd,
    addProduct: addProduct,
    getEditProduct: getEditProduct,
    editProduct: editProduct,
    deleteProduct: deleteProduct
};