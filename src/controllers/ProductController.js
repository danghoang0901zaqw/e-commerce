const httpStatus = require("../constants/httpStatus");
const productServices = require("../services/productServices");

class ProductController {
  async featured(req, res, next) {
    const result = await productServices.featured();
    return res.status(httpStatus.OK).json({
      data: result,
    });
  }
  async recent(req, res, next) {
    const result = await productServices.recent();
    return res.status(httpStatus.OK).json({
      data: result,
    });
  }
}
module.exports = new ProductController();
