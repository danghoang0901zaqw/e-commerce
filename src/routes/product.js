const express = require("express");
const ProductController = require("../controllers/ProductController");
const catchAsync = require("../middlewares/catchAsyncMiddleware");
const ReviewController = require("../controllers/ReviewController");
const router = express.Router();

router.route("/").get(catchAsync(ProductController.list));
router.route("/:id").get(catchAsync(ProductController.detail));
router
  .route("/:id/reviews/")
  .get(catchAsync(ReviewController.getProductReviews));
router.route("/:id/related").get(catchAsync(ProductController.related));

router.route("/featured").get(catchAsync(ProductController.featured));
router.route("/recent").get(catchAsync(ProductController.recent));
module.exports = router;
