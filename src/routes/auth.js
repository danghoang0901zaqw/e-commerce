const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const {
  signUpValidator,
  signInValidator,
  forgotPasswordValidator,
  verifyForgotPasswordValidator,
  resetPasswordValidator,
} = require("../requests/userRequests");
const catchAsync = require("../middlewares/catchAsyncMiddleware");

router
  .route("/users/sign-up")
  .post(signUpValidator, catchAsync(authController.signUp));
router
  .route("/users/sign-in")
  .post(signInValidator, catchAsync(authController.signIn));
router
  .route("/users/forgot-password")
  .post(forgotPasswordValidator, catchAsync(authController.forgotPassword));
router
  .route("/users/verify-forgot-password")
  .post(
    verifyForgotPasswordValidator,
    catchAsync(authController.verifyForgotPassword)
  );

router
  .route("/users/reset-password")
  .post(resetPasswordValidator, catchAsync(authController.resetPassword));
module.exports = router;
