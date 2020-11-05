// Creates the product table and allows us to create entries.  For the product, we can input brand, name, category, subcategory, price and an image url.  The database will then assign an id, createdat or updatedat value.

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    brand: DataTypes.STRING,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    subCategory: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    image_URLs: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};