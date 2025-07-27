const models = require("../models");
class TagServices {
  async getAll() {
    const tags = await models.Tag.findAll({
      attributes: {
        include: [
          [
            models.Sequelize.fn("COUNT", models.Sequelize.col("products.id")),
            "totalProduct",
          ],
        ],
      },
      include: [
        {
          model: models.Product,
          as: "products",
          attributes: [],
          through: { attributes: [] },
        },
      ],
      group: ["Tag.id", "Tag.tagName", "Tag.createdAt", "Tag.updatedAt"],
    });
    return tags;
  }
}
module.exports = new TagServices();
