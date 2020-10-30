// Server.js - This file is the initial starting point for the Node/Express server.

// Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

const db = require("./models")

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory to be served
app.use(express.static("public"));

const exphbs = require("handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================

const routes = require("./controller/controller");

app.use(routes);


// Starts the server to begin listening
// =============================================================
db.sequelize.sync({ force: true }).then(app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
}));
