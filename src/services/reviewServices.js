const models = require("../models");
class ReviewServices {
  async getProductReviews({ productId, page, limit, sortField, sortBy }) {
    const reqReview = models.Review.findAll({
      where: {
        productId,
      },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: {
            exclude: ["password", "resetPasswordToken", "resetPasswordExpired"],
          },
        },
      ],
      limit,
      offset: (page - 1) * limit,
      order: [[sortField, sortBy]],
    });
    const reqTotal = models.Review.count({
      where: {
        productId,
      },
    });
    const [result, total] = await Promise.all([reqReview, reqTotal]);
    return {
      result,
      total,
    };
  }
}
module.exports = new ReviewServices();
