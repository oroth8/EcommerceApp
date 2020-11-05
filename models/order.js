// Will create a table within the database for orders.  The categories are product id and user id.  These are both foriegn keys that reference the product and user tables respectively.  Note each item ordered is entered as a seperate order when checkout is clicked.

const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    };
    Order.init({
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Order',
    });
    return Order;
  };