"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.Product, {
        through: "ProductTag",
        foreignKey: "tagId",
        otherKey: "productId",
        as: "products"
      });
    }
  }
  Tag.init(
    {
      tagName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
