var db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const path=require("path");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Routes
// =============================================================
module.exports = function(app) {

    app.get("/", (req, res) => {
      db.Product.findAll({group: "subCategory"}).then(allProducts => {
        let accessLevel=0;
        if(req.user)accessLevel=req.user.accessLevel;
        // People who have not logged in have an access level of 0
        // Default uses have an access level of 10
        // If we want to, we can make the defaul accesslevel lower, and make a new
        // class of users, admins, with an access level of ten.
        if(accessLevel>=10) accessGranted=true; else accessGranted=false;
        // If we pass accessGranted=true to the main page, it will display the admin button
        res.render("landing",{layout:"main", allProducts, accessGranted:accessGranted});
      })
        

    });
      
    app.get("/login", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            if(req.user.accessLevel>=10) accessGranted=true; else accessGranted=false;
            // If we pass accessGranted=true to the main page, it will display the admin button
            res.render("landing",{layout:"main", accessGranted:accessGranted});
        }
        else res.render("login", {});
      });      
      app.get("/signup", (req, res) => {
          // If the user already has an account send them to the members page
          if (req.user) {
            if(req.user.accessLevel>=10) accessGranted=true; else accessGranted=false;
            // If we pass accessGranted=true to the main page, it will display the admin button
            res.render("landing",{layout:"main", accessGranted:accessGranted});
           
          }
          else  res.render("signup",{});
        });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });




  // Display products on productlist
  app.get('/shop', (req,res)=> 
  db.Product.findAll()
  .then(products => {
      res.render('productlist', {layout: "main",
          products,
      });
  }).catch(err=>console.log(err)));
  
  app.get("/shop/:subCategory", (req, res) => {
    db.Product.findAll({ group: "subCategory" }).then((allProducts) => {
      let category = req.params.subCategory;
      db.Product.findAll({
        where: {
          subCategory: category,
        },
      }).then((products) => {
        res.render("productlist", { layout: "main", allProducts, products });
      });
    });
  
  });
      
  app.get('/shop/product/:id', (req,res) => 
  db.Product.findAll(
    {
    where: {
      id: req.params.id
    }
  }).then(result => {
              console.log(result);
              let {id, brand, name, category, subCategory, price, image_URLs} = result[0];
              console.log( id, brand, name);
            res.render("indvProduct", {layout: 'main',id, brand, name, category, subCategory, price, image_URLs});
  }).catch(err=>console.log(err)));

// Searchbar
// search for gigs
app.get('/search', (req,res)=>{
  let {term} = req.query;
  // lower case
  term = term.toLowerCase()
  db.Product.findAll({where: {subCategory: { [Op.like]: '%'+term+'%'}}})
  .then(products => {
    console.log(products);
    res.render('productlist', {layout: "main",
          products,
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
        if(req.user.accessLevel>=10) accessGranted=true; else accessGranted=false;
        res.render("adminhome",{accessGranted:accessGranted});
      }
      else res.render("login", {});
    });   

    app.get("/admin/Product", (req,res)=>{
     if (req.user) {        
         if(req.user.accessLevel>=10) accessGranted=true; else accessGranted=false;
        db.Product.findAll({}).then((data)=>{
          console.log(data);
          res.render("adminProduct",{accessGranted:accessGranted, data:data})
        });
      }
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

    // Sends the user to adminadd page where they can add a product to the database.
    app.get("/admin/:table/add", function(req,res){
        if(req.user){
            let table=req.params.table;
            db[`${table}`].findAll({
                where: {
                id: 1
            }
            }).then(function(results){
                let item=(results[0].dataValues);
                
                if(req.user.accessLevel>=10) accessGranted=true; else accessGranted=false;
                res.render("adminadd", { "item": item, accessGranted:accessGranted});
            });
        }else res.render("login", {});
    }); 

};