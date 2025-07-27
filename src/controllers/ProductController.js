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
  async list(req, res, next) {
    const {
      page = 1,
      limit = 10,
      sortField = "createdAt",
      sortBy = "DESC",
      search,
      category,
      brand,
      tag
    } = req.query;
    const { products, total } = await productServices.list({
      page,
      limit,
      sortField,
      sortBy,
      search,
      category,
      brand,
      tag
    });
    return res.status(httpStatus.OK).json({
      data: products,
      pagination: {
        page: +page,
        limit: +limit,
        total,
      },
    });
  }
}
module.exports = new ProductController();
