"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.FLOAT,
      },
      subTotal: {
        type: Sequelize.FLOAT,
      },
      shipping: {
        type: Sequelize.STRING,
      },
      discount: {
        type: Sequelize.FLOAT,
      },
      couponCode: {
        type: Sequelize.STRING,
      },
      shippingAddress: {
        type: Sequelize.STRING,
      },
      paymentMethod: {
        type: Sequelize.STRING,
      },
      paymentDetail: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Statuses',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
