'use strict';
const {
  Model
} = require('sequelize');
const cart = require('./cart');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class cart_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart_product.init({
    CartId: {
      type: DataTypes.INTEGER,
      references: {
        model: cart,
        key:'id'
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: product,
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'cart_product',
  });
  return cart_product;
};