const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const catchAsync = require("../middlewares/catchAsyncMiddleware");
const router = express.Router();
router.route("/").get(catchAsync(CategoryController.getAll));
module.exports = router;
