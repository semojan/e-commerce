const express = require("express");

const router = express.Router();

router.get("/", function(req, res, next){
    res.redirect("/product");
});

router.get("/401", function(req, res, next){
    res.render("shared/401");
});

router.get("403", function(req, res, next){
    res.render("shared/403");
});

module.exports = router;