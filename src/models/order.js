"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      quantity: DataTypes.INTEGER,
      total: DataTypes.FLOAT,
      subTotal: DataTypes.FLOAT,
      shipping: DataTypes.STRING,
      discount: DataTypes.FLOAT,
      couponCode: DataTypes.STRING,
      shippingAddress: DataTypes.STRING,
      paymentMethod: DataTypes.STRING,
      paymentDetail: DataTypes.STRING,
      status: {
        type: DataTypes.INTEGER,
        references: {
          model: "Statuses",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
