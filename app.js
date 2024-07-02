const express = require("express");
const esession = require('express-session');

const path = require("path");
const db = require("./data/db");
const sessionConfig = require("./ConfigAndAssets/sessionConfig");
const middlewares = require("./ConfigAndAssets/middlewares");

const app = express();

app.use(express.static("public"));
app.use("/product/assets/images", express.static("images"));
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(esession(sessionConfig()));

const baseRoutes = require("./routes/baseRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const prodRoutes = require("./routes/productRoutes");

app.use(middlewares.checkAuth);

app.use(baseRoutes);
app.use(authRoutes);
app.use(prodRoutes);
app.use("/admin", middlewares.protectRoutes, adminRoutes);
app.use(middlewares.errorHandler);

db.connectTodb().then(function(){
    app.listen(1234);
}).catch(function(error){
    console.log("couldn't connect to database");
    console.log(error);
})
