const express = require("express");
const cartCtrl = require("../controller/cartCtrlr");
const router = express.Router();

router.post("/add-item", cartCtrl.addCartItem);

router.get("/", cartCtrl.getCart);

router.patch("/update", cartCtrl.updateItem);

module.exports = router;