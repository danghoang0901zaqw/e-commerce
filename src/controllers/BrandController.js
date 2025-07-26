const httpStatus = require("../constants/httpStatus");
const brandServices = require("../services/brandServices");

class BrandController {
  async getAll(req, res, next) {
    const result = await brandServices.getAll();
    return res.status(httpStatus.OK).json({
      data: result,
    });
  }
}
module.exports = new BrandController();
