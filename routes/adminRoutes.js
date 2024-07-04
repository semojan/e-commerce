const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;

const upload = multer({
    storage: multer.diskStorage({
        destination: "images",
        filename: function(req, file, cb){
            cb(null, uuid() + "-" + file.originalname);
        }
    })
});

const configureFile = upload.single("image");

const router = express.Router();

const adminCtrl = require("../controller/adminCtrlr");

router.get("/product", adminCtrl.getAllProducts);

router.get("/product/new", adminCtrl.getNewProd);

router.post("/product", configureFile, adminCtrl.addProduct);

router.get("/product/:pid", adminCtrl.getEditProduct);

router.post("/product/:pid", configureFile, adminCtrl.editProduct);

router.delete("/product/:pid", adminCtrl.deleteProduct);

module.exports = router;