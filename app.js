const express = require("express");

const path = require("path");
const db = require("./data/db");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

const baseRoutes = require("./routes/baseRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(baseRoutes);
app.use(authRoutes);

db.connectTodb().then(function(){
    app.listen(1234);
}).catch(function(error){
    console.log("couldn't connect to database");
    console.log(error);
})
