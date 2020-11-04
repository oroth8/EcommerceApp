var db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const path=require("path");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// If a user has at least this high accessLevel, then they are an admin
// The default access level for new uesers is 10
const ADMIN_LEVEL=100;

// Routes
// =============================================================
module.exports = function(app) {

    app.get("/", (req, res) => {
      db.Product.findAll({group: "subCategory"}).then(allProducts => {
        let accessLevel=0; if(req.user) accessLevel=req.user.accessLevel;
        if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
        // If we pass admin=true to the main page, it will display the admin button
        res.render("landing",{layout:"main", allProducts, admin, loggedIn:accessLevel});
      })
        

    });
      
    app.get("/login", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
          
          let accessLevel=req.user.accessLevel;
          if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
            res.render("landing",{layout:"main", admin, loggedIn:accessLevel});
        }
        else res.render("login", {});
      });      
      app.get("/signup", (req, res) => {
          // If the user already has an account send them to the members page
          if (req.user) {
            
          let accessLevel=req.user.accessLevel;
          if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
            res.render("landing",{layout:"main", admin, loggedIn:accessLevel});
           
          }
          else  res.render("signup",{});
        });


  // Display products on productlist
  app.get('/shop', (req,res)=> 
    db.Product.findAll({group: "subCategory"}).then(allProducts => {
      db.Product.findAll()
    .then(products => {
        let accessLevel=0; if(req.user) accessLevel=req.user.accessLevel;
        if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
        res.render('productlist', {layout: "main", allProducts,
            products,admin, loggedIn:accessLevel
        });
      }).catch(err=>console.log(err))
    })
  );
  
  app.get("/shop/:subCategory", (req, res) => {
    db.Product.findAll({ group: "subCategory" }).then((allProducts) => {
      let category = req.params.subCategory;
      db.Product.findAll({
        where: {
          subCategory: category,
        },
      }).then((products) => {        
        let accessLevel=0; if(req.user) accessLevel=req.user.accessLevel;
        if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
        res.render("productlist", { layout: "main", allProducts, products,admin, loggedIn:accessLevel });
      });
    });
  
  });
      
  app.get('/shop/product/:id', (req,res) => {
    db.Product.findAll({group: "subCategory"}).then(allProducts => {
      db.Product.findAll(
        {
        where: {
          id: req.params.id
        }
      }).then(result => {
        let accessLevel=0; if(req.user) accessLevel=req.user.accessLevel;
        if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
        res.render("indvProduct", {layout: 'main',id, brand, name, category, subCategory, price, image_URLs, allProducts, admin, loggedIn:accessLevel});
      }).catch(err=>console.log(err))});
    })
  

// Searchbar
// search for products
app.get('/search', (req,res)=>{
  let {term} = req.query;
  // lower case
  term = term.toLowerCase()
  db.Product.findAll(
    {where: {
      [Op.or]:[
      {subCategory: { [Op.like]: '%'+term+'%'}},
      {brand: { [Op.like]: '%'+term+'%'}},
      {name: { [Op.like]: '%'+term+'%'}},
      {category: { [Op.like]: '%'+term+'%'}}
      ]
    }})
  .then(products => {    
    let accessLevel=0; if(req.user) accessLevel=req.user.accessLevel;
    if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
    res.render('productlist', {layout: "main",
          products,admin, loggedIn:accessLevel
      });
    });
});


// ------------------------------------------
// ----              ADMIN               ----
// ------------------------------------------
// --     Admin code                       --
// --       (Most of this was in api-routes--
// ------------------------------------------

// Send the user to the admin home page.
  app.get("/admin", function(req,res){
    if (req.user) {        
      let accessLevel=req.user.accessLevel;
      if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
        res.render("adminhome",{admin, loggedIn:accessLevel});
      }
      else res.render("login", {});
    });   

    // Sends the user to adminadd page where they can add a product to the database.
    app.get("/admin/:table/add", function(req,res){
      if(req.user){
          let table=req.params.table;
          db[`${table}`].findAll({
              attributes:["name", "brand", "category", "subCategory", "price", "image_URLs"],
              where: {
              id: 1
          }
          }).then(function(results){
              let item=(results[0].dataValues);
              
              let accessLevel=req.user.accessLevel;
              if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
              res.render("adminadd", { "item": item, admin, loggedIn:accessLevel});
          });
      }else res.render("login", {});
  }); 

    app.get("/admin/:table", (req,res)=>{
     if (req.user) {        
      let accessLevel=req.user.accessLevel;
      if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
        db.Product.findAll({}).then((data)=>{
          res.render("adminProduct",{admin, loggedIn:accessLevel, data:data})
        });
      }
      else res.render("login");
      
    });

    // admin get route, will display all information from a chosen table if no category, otherwise will display the category column.
    app.get("/admin/:table/:category", function(req,res){
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

    app.get("/account", (req,res)=>{
      if(req.user)
      {
        let id=req.user.id;
        let username=req.user.username;
        let date=cleanUpDates(req.user.createdAt);
        let accessLevel=req.user.accessLevel;
        if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
        res.render("account",{id, username, date, admin, loggedIn:accessLevel});
      }
      else res.render("login");
    });

    // For the member account page, to turn "2020-11-02T19:20:03.000Z" into "11/02/2020"
    function cleanUpDates(timestamp){
      let date=timestamp.split("T")[0];
      date=date.split("-");
      return `${date[1]}/${date[2]}/${date[0]}`;
    }





    app.get("/cart", function(req,res){      
      let accessLevel=0; if(req.user) accessLevel=req.user.accessLevel;
      if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
      res.render("cart",{admin, loggedIn:accessLevel});
    });



    app.get("/checkout/thankyou",function(req,res){
      let accessLevel=0; if(req.user) accessLevel=req.user.accessLevel;
      if(accessLevel>=ADMIN_LEVEL) admin=true; else admin=false;
      res.render("thankyou",{admin, loggedIn:accessLevel})
    });

<<<<<<< HEAD
    app.get("/adminsales",function(req,res){
      let accessGranted=false; if (req.user && req.user.accessLevel>=10) accessGranted=true; 
      res.render("adminsales",{accessGranted})
    });

=======
    app.get("/admin/sales",function(req,res){
      let accessGranted=false; if (req.user && req.user.accessLevel>=10) accessGranted=true; 
      res.render("adminsales",{accessGranted})
    });
>>>>>>> main
};