"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductTag.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
      },
      tagId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tags",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ProductTag",
    }
  );
  return ProductTag;
};
