const httpStatus = require("../constants/httpStatus");
const tagServices = require("../services/tagServices");

class TagController {
  async getAll(req, res, next) {
    const result = await tagServices.getAll();
    return res.status(httpStatus.OK).json({
      data: result,
    });
  }
}
module.exports = new TagController();
