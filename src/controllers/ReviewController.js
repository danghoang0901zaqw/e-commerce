const httpStatus = require("../constants/httpStatus");
const reviewServices = require("../services/reviewServices");

class ReviewController {
  async getProductReviews(req, res, next) {
    const { id } = req.params;
    const {
      page = 1,
      limit = 10,
      sortField = "createdAt",
      sortBy = "DESC",
    } = req.query;
    const { result, total } = await reviewServices.getProductReviews({
      productId: id,
      page,
      limit,
      sortField,
      sortBy,
    });
    return res.status(httpStatus.OK).json({
      data: result,
      pagination: {
        page: +page,
        limit: +limit,
        total,
      },
    });
  }
}
module.exports = new ReviewController();
