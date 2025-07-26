const models = require("../models");

class BrandServices {
  async getAll() {
    const brands = await models.Brand.findAll({ raw: true });
    console.log(brands);
    return brands;
  }
}
module.exports = new BrandServices();
