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
      Product.belongsToMany(models.User, { through: 'user_product' });
      Product.belongsToMany(models.Orders, { through: 'order_product' });
      Product.belongsToMany(models.Cart, { through: 'cart_product' });
      Product.hasMany(models.ProductImages, { foreignKey: 'productImg_ID' });
    }
  }
  Product.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    inStock: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};