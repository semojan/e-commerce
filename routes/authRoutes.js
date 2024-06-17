const express = require("express");
const authCtrl = require("../controller/authCtrlr");

const router = express.Router();

router.get("/signup", authCtrl.getSignup);

module.exports = router;