const express = require("express");
const BrandController = require("../controllers/BrandController");
const router = express.Router();
router.route("/").get(BrandController.getAll);
module.exports = router;
