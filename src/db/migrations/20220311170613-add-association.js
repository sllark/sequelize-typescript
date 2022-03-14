"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface
      .addColumn("Products", "UserId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      })
      .then(() => {
        return queryInterface.addColumn("Users", "CartId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Carts", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        return queryInterface.addColumn("Orders", "UserId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Users", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        return queryInterface.addColumn("CartItems", "ProductId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Products", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        return queryInterface.addColumn("CartItems", "CartId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Carts", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        return queryInterface.addColumn("OrderItems", "ProductId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Products", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        return queryInterface.addColumn("OrderItems", "OrderId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Orders", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface
      .then(() => queryInterface.removeColumn("Products", "UserId"))
      .then(() => queryInterface.removeColumn("Users", "CartId"))
      .then(() => queryInterface.removeColumn("Orders", "UserId"))
      .then(() => queryInterface.removeColumn("CartItems", "ProductId"))
      .then(() => queryInterface.removeColumn("CartItems", "CartId"))
      .then(() => queryInterface.removeColumn("OrderItems", "ProductId"))
      .then(() => queryInterface.removeColumn("OrderItems", "OrderId"));
  },
};
