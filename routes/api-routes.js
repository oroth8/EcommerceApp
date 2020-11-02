var db = require("../models");
const passport = require("../config/passport");
// Routes
// =============================================================
module.exports = function(app) {

  app.get("/admin", function(req,res){
    res.render("adminhome",{});
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

    app.put("/admin/:table",function(req,res){
      let table=req.params.table;
      db[`${table}`].update(
        req.body, {
        where: {
          id: req.body.id
        }
      })
        .then(function() {
          res.json({ value: true});
        });
  
    });


    


// ------------------------------------------
// ----              ~~~~~               ----
// ------------------------------------------
// --     Authentication code              --
// --       (Mostly just copied from the   --
// --            passport exaple)          --
// ------------------------------------------

// Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      id: req.user.id
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });



};