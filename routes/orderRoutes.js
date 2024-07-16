const express = require("express");
const orderCtrl = require("../controller/orderCtrlr");
const router = express.Router();

router.get("/", orderCtrl.getOrders)

router.post("/", orderCtrl.addOrder);

module.exports = router;