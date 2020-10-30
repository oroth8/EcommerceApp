module.exports = function(sequelize, DataTypes) {
    let Product = sequelize.define("Product", {
        brand: DataTypes.STRING,
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        subCategory: DataTypes.STRING,
        price: DataTypes.DECIMAL(10,2),
        image_URLs: DataTypes.STRING
    });
    return Product;
};