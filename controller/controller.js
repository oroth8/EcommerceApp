const db = require("../models");

// module.exports = {
//     allProducts: function(req, res) {
//         db.Product.findAll({}).then(function(dbProductData) {
//             let products = [];
//             for (let index = 0; index < dbProductData.length; index++) {
//                 products.push(dbProductData[index].dataValues);
//             }  
//             res.json(products);
//         });  
//     }
// }
