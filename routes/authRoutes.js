const express = require("express");
const authCtrl = require("../controller/authCtrlr");

const router = express.Router();

router.get("/signup", authCtrl.getSignup);

router.get("/login", authCtrl.getLogin);

module.exports = router;