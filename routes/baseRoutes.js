const express = require("express");
const productsCtrl = require("../controller/productsCtrlr");

const router = express.Router();

router.get("/", productsCtrl.getAllProducts);

module.exports = router;