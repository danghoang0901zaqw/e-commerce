const express = require("express");
const catchAsync = require("../middlewares/catchAsyncMiddleware");
const tagController = require("../controllers/TagController");
const router = express.Router();
router.route("/").get(catchAsync(tagController.getAll));
module.exports = router;
