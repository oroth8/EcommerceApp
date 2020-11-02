const db = require("../models");

module.exports = {
    allProducts: function(req, res) {
        db.Product.findAll({}).then(function(dbProductData) {
            console.log(dbProductData);
            return dbProductData;
        });
    }
}