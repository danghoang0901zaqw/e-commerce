const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const {
  signUpValidator,
  signInValidator,
} = require("../requests/userRequests");
const catchAsync = require("../middlewares/catchAsyncMiddleware");

router
  .route("/users/sign-up")
  .post(signUpValidator, catchAsync(authController.signUp));
router
  .route("/users/sign-in")
  .post(signInValidator, catchAsync(authController.signIn));
module.exports = router;
