const express = require("express");
const BrandController = require("../controllers/BrandController");
const catchAsync = require("../middlewares/catchAsyncMiddleware");
const router = express.Router();
router.route("/").get(catchAsync(BrandController.getAll));
module.exports = router;
