// Server.js - This file is the initial starting point for the Node/Express server.

// Dependencies
// =============================================================
var express = require("express")
const passport = require("./config/passport");;

// Sets up the Express App
// =============================================================
var app = express();
// Static directory to be served
app.use(express.static("public"));
const session = require("express-session");
var PORT = process.env.PORT || 8080;
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());


let db = require("./models")

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


// We need to use sessions to keep track of our user's login status
// Double-check what all this biz means, esp. the "secret" there!


app.use(passport.initialize());
app.use(passport.session());
// Here we introduce HTML routing to serve different HTML files
// require("./routes/html-routes.js")(app);

// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
}));
