const express = require("express");

const path = require("path");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

const baseRoutes = require("./routes/baseRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(baseRoutes);
app.use(authRoutes);

app.listen(1234);