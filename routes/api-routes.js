var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("*", function(req, res) {
    res.render("index", {data:"Hello World!"})
  });


  app.get("/admin/:table/:category?", function(req,res){
    let table=req.params.table;
    if(req.params.category){
      let category=req.params.category;
      db.table.findAll({
        attributes: category,
        })
    }else{
      db.table.findAll().then(function(results){
        res.json(results);
      })
    }
  }

};
