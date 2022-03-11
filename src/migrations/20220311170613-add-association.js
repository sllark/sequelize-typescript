"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface
      .createTable("UsersOrders", {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        UserId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        OrderId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
      })
      .then(() => {
        return queryInterface.createTable("UsersCarts", {
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          UserId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          CartId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
        });
      })
      .then(() => {
        return queryInterface.addColumn("Products", "UserId", {
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
        return queryInterface.addColumn("OrderItems", "ProductId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Products", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return queryInterface
      .dropTable("UsersOrders")
      .then(() => queryInterface.dropTable("UsersCarts"))
      .then(() => queryInterface.removeColumn("Products", "UserId"))
      .then(() => queryInterface.removeColumn("OrderItems", "ProductId"));
  },
};
