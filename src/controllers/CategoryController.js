const httpStatus = require("../constants/httpStatus");
const categoryServices = require("../services/CategoryServices");

class CategoryController {
  async getAll(req, res, next) {
    const result = await categoryServices.getAll();
    return res.status(httpStatus.OK).json({
      data: result,
    });
  }
}
module.exports = new CategoryController();
