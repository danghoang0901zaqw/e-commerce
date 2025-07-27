const models = require("../models");

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
}
module.exports = new ProductServices();
