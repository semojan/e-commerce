const express = require("express");
const authCtrl = require("../controller/authCtrlr");

const router = express.Router();

router.get("/signup", authCtrl.getSignup);

router.post("/signup", authCtrl.postSignup);

router.get("/login", authCtrl.getLogin);

router.post("/login", authCtrl.postLogin);

router.get("/logout", authCtrl.getLogout);

module.exports = router;