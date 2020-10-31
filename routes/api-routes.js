var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

 

  // admin get route, will display all information from a chosen table if no category, otherwise will display the category column.
  app.get("/admin/:table/:category?", function(req,res){
    console.log(req.params);
    let table=req.params.table;
    if(req.params.category){
      let category=req.params.category;
      db[`${table}`].findAll({
        attributes: [category],
        }).then(function(results){
          res.json(results);
        });
    }else{
      db[`${table}`].findAll({}).then(function(results){
        res.json(results);
      });
    }
  });

  // Admin post route, will create new table entry.  
    app.post("/admin/:table", function(req,res){
      let table=req.params.table;
    db[`${table}`].create(
      req.body
    ).then(function() {
        // We have access to the new todo as an argument inside of the callback function
        res.json({value: true});
      });
  
    });


  app.get("*", function(req, res) {
    res.render("index", {data:"Hello World!"})
  });
}

