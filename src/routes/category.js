const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();
router.route("/").get(CategoryController.getAll);
module.exports = router;
