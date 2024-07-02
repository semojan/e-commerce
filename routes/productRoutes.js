const express = require("express");
const productsCtrl = require("../controller/productsCtrlr");

const router = express.Router();

router.get("/product", productsCtrl.getAllProducts);

router.get("/product/:pid", productsCtrl.getProductDetail);

module.exports = router;