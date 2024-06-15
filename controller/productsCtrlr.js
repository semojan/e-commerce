function getAllProducts(req, res, next){
    res.render("customer/all-products");
}

module.exports = {
    getAllProducts: getAllProducts
};