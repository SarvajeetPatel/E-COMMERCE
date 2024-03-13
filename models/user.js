'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Token, { foreignKey: 'userId' });
      User.hasMany(models.Orders, { foreignKey: 'clientID' });
      User.hasMany(models.Address, { foreignKey: 'user_Id' });
      User.hasOne(models.Cart, { foreignKey: 'customerID' });
      User.belongsToMany(models.Product, { foreignKey: 'user_ProID', through: 'user_product' })
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userType: {
      type: DataTypes.ENUM,
      values: ['admin', 'vendor', 'buyer'],
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value !== "admin" && value !== "vendor" && value !== "buyer") {
            throw new Error("please enter valid user type");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};