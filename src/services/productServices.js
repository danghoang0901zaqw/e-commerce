const models = require("../models");
const { Op } = require("sequelize");

class ProductServices {
  async featured() {
    const products = await models.Product.findAll({
      order: [["stars", "DESC"]],
      limit: 10,
    });
    return products;
  }
  async recent() {
    const products = await models.Product.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    return products;
  }

  async list({ page, limit, sortField, sortBy, search, category, brand, tag }) {
    const filter = {
      ...(search && {
        productName: {
          [Op.like]: `%${search}%`,
        },
      }),
      ...(category && { categoryId: +category }),
      ...(brand && { brandId: +brand }),
    };
    const include = [];
    if (tag) {
      include.push({
        model: models.Tag,
        as: "tags",
        where: { id: +tag },
        through: { attributes: [] },
      });
    }
    const reqProduct = models.Product.findAll({
      where: filter,
      include,
      order: [[sortField, sortBy]],
      limit: limit,
      offset: (page - 1) * limit,
    });
    const reqTotal = models.Product.count({
      where: filter,
      include,
      distinct: true,
    });
    const [products, total] = await Promise.all([reqProduct, reqTotal]);

    return {
      products,
      total,
    };
  }
}
module.exports = new ProductServices();
