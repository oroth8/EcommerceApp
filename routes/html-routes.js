var db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const path=require("path");
// Routes
// =============================================================
module.exports = function(app) {

    app.get("/", (req, res) => {
        console.log("At the slash!");
        console.log(req.user);
        // If the user already has an account send them to the members page
        if (req.user) {
          res.render("index", {data:"Hello World!"});
        }
        res.render("login");
      });
      
    app.get("/login", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            console.log("------------ Logged in");
          res.render("index",{data:"WWOOOOOO"});
        }
        res.render("login");
      });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });




    app.get("*", function(req, res) {
        res.render("index", {data:"Hello World!"})
    });

};