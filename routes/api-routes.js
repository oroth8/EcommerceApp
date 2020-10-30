var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("*", function(req, res) {
    res.render("index", {data:"Hello World!"})
  });

};
