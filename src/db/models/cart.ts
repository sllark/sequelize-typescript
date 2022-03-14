"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.User);
      this.hasMany(models.CartItem);
    }
  }

  Cart.init(
    {},
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
