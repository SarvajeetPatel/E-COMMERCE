'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.User, { foreignKey: 'clientID' });
      Orders.belongsToMany(models.Product, { foreignKey: 'orderID', through: 'order_product' })
    }
  }
  Orders.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    clientID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};