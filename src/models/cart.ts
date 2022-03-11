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
      this.belongsToMany(models.User, { through: "UsersCarts" });
    }
  }

  Cart.init(
    {
      user_id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
