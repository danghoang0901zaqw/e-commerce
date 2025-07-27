const express = require("express");
const ProductController = require("../controllers/ProductController");
const catchAsync = require("../middlewares/catchAsyncMiddleware");
const router = express.Router();

router.route("/").get(catchAsync(ProductController.list));
router.route("/featured").get(catchAsync(ProductController.featured));
router.route("/recent").get(catchAsync(ProductController.recent));
module.exports = router;
