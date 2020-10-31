var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

 


  app.get("/admin/:table/:category?", function(req,res){
    console.log(req.params);
    let table=req.params.table;
    // if(req.params.category){
    //   let category=req.params.category;
    //   db.todo.findAll({
    //     attributes: category,
    //     }).then(function(results){
    //       res.json(results);
    //     });
    // }else{
      db.todo.findAll({}).then(function(results){
        res.json(results);
      });
    // }
  });



  app.get("*", function(req, res) {
    res.render("index", {data:"Hello World!"})
  });
}

