const models = require("../models");

class BrandServices {
  async getAll() {
    const brands = await models.Brand.findAll({
      include: [
        {
          model: models.Product,
          as: "products",
        },
      ],
    });
    const mappingBrands = brands.map((brand) => {
      const brandData = brand.get({ plain: true });
      const { products, ...rest } = brandData;
      return {
        ...rest,
        totalProduct: products.length,
      };
    });
    return mappingBrands;
  }
}
module.exports = new BrandServices();
