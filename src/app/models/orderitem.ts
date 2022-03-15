"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order);
      this.belongsTo(models.Product);
    }
  }
  OrderItem.init(
    {
      quantity: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
