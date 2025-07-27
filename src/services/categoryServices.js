const models = require("../models");
class CategoryServices {
  async getAll() {
    const categories = await models.Category.findAll({
      include: [
        {
          model: models.Product,
          as: "products",
        },
      ],
    });
    const mappingCategories = categories.map((category) => {
      const categoryData = category.get({ plain: true });
      const { products, ...rest } = categoryData;
      return {
        ...rest,
        totalProduct: products.length,
      };
    });
    return mappingCategories;
  }
}
module.exports = new CategoryServices();
