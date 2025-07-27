"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Tag, {
        through: "ProductTag",
        foreignKey: "productId",
        otherKey: "tagId",
        as: "tags",
      });
    }
  }
  Product.init(
    {
      productName: DataTypes.STRING,
      imagePath: DataTypes.STRING,
      price: DataTypes.FLOAT,
      oldPrice: DataTypes.FLOAT,
      summary: DataTypes.STRING,
      description: DataTypes.TEXT,
      specification: DataTypes.TEXT,
      stars: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      brandId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Brands",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
