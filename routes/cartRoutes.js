const express = require("express");
const cartCtrl = require("../controller/cartCtrlr");
const router = express.Router();

router.post("/add-item", cartCtrl.addCartItem);

module.exports = router;