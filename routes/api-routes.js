const controller = require("../controller/controller");
var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {

  app.get("/admin", function(req,res){
    res.render("adminhome",{});
  });

  app.get("/admin/:table/add", function(req,res){
    let table=req.params.table;
  db[`${table}`].findAll({
    where: {
      id: 1
    }
  }).then(function(results){
    let item=(results[0].dataValues);
    res.render("adminadd", { "item": item});
  });
  });

  app.post("/admin/:table/add", function(req,res){
    let table=req.params.table;
    db[`${table}`].create(
      req.body
    ).then(function() {

        res.json({value: true});
      });

  });

  // admin get route, will display all information from a chosen table if no category, otherwise will display the category column.
  app.get("/admin/:table/:category?", function(req,res){
    let table=req.params.table;
    if(req.params.category){
      let category=["id"];
      let categories=req.params.category.split(',');
      for(let i=0; i< categories.length; i++){
        category.push(categories[i]);
      }
      db[`${table}`].findAll({
        attributes: category,
        }).then(function(results){
          let item=(results[0].dataValues);
          let newTable=[];
          for(let i=0; i < results.length; i++){
            newTable.push(results[i].dataValues);
          }
          res.render("admin", { "item": item, "table": newTable });
        });
    }else{
      db[`${table}`].findAll({}).then(function(results){
        let item=(results[0].dataValues);
        let newTable=[];
        for(let i=0; i < results.length; i++){
          newTable.push(results[i].dataValues);
        }
        res.render("admin", { "item": item, "table": newTable });

      });
    }
  });



  app.get("/admin/:table/change/byId/:id", function(req,res){
    let table=req.params.table;
  db[`${table}`].findAll({
    where: {
      id: req.params.id
    }
  }).then(function(results){
    let item=(results[0].dataValues);
    res.render("adminchangeid", { "item": item});
  });
  });

  app.post("/admin/:table/change/byId/:id", function(req,res){
    let table=req.params.table;
    let id=req.params.id;
    let value=req.body.value;
    let cat=req.body.cat;
    let body={ "id": id };
    body[cat]=value;
    db[`${table}`].update(
      body, {
      where: {
        "id": id
      }
    })
      .then(function() {
        res.json({ "value": true});
      });
  });

  app.get("/admin/:table/change/:category", function(req,res){
    let table=req.params.table;
    let category=["id"];
    let newCategory=req.params.category;
    category.push(newCategory);
      db[`${table}`].findAll({
        attributes: category,
        }).then(function(results){
          let item=(results[0].dataValues);
          let newTable=[];
          for(let i=0; i < results.length; i++){
            newTable.push(results[i].dataValues);
          }
          res.render("adminchange", { "item": item, "table": newTable});
        });
  });

  app.post("/admin/:table/change/:category", function(req,res){
    let table=req.params.table;
    let category=req.params.category;
    let body={};
    body[category]=req.body.value;
    db[`${table}`].update(
      body, {
      where: {
        id: req.body.id
      }
    })
      .then(function() {
        res.json({ value: true});
      });

  });


  app.get("/api/products", function(req, res) {
    db.Product.findAll({}).then(function (dbProductData) {
      let products = [];
      for (let index = 0; index < dbProductData.length; index++) {
        products.push(dbProductData[index].dataValues);
      };
      res.json(products);
    })
  
  })
    


  app.get("/", function(req, res) {
    res.render('landing', {layout: 'main'})
  });
}