module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
      text: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    });
    return Product;
  };
  