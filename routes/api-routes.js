const controller = require("../controller/controller");
var db = require("../models");
const passport = require("../config/passport");
// Routes
// =============================================================
module.exports = function(app) {


    // Takes the information from the user and adds it to the table in the database.
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


// Sends the user to the page that allows for changes on one id product.
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

  // Updates the table for the current product being viewed.
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

  // Sends the user to a page where all values for a given category can be changed.
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

  //Takes the users input and updates the table in the database.
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

  // Display products on productlist
app.get('/shop', (req,res)=> 
db.Product.findAll()
.then(products => {
    res.render('productlist', {layout: "main",
        products,
    });
}).catch(err=>console.log(err)));
    


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

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        console.log(err);
        res.status(401).json(err);
      });
  });

  app.post("/cart",function(req,res){
    let array=[];
    if(req.body.limitCart){
    for(let i=0; i< req.body.limitCart.length; i++){
      array.push(Number(req.body.limitCart[i]));
    }
    db.Product.findAll({
      where: {
        id: array
      }
    }).then(function(response){
      res.json(response);
    });}else{
    res.render("cart",{});
    }
  });


};