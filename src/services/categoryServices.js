const models = require("../models");

class CategoryServices {
  async getAll() {
    const categories = await models.Category.findAll({ raw: true });
    return categories;
  }
}
module.exports = new CategoryServices();
