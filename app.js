const express = require("express");

const path = require("path");

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

const baseRoutes = require("./routes/baseRoutes");

app.use(baseRoutes);

app.listen(1234);