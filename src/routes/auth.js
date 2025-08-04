const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const {
  signUpValidator,
  signInValidator,
  forgotPasswordValidator,
  verifyForgotPasswordValidator,
  resetPasswordValidator,
  updateUserValidator,
} = require("../requests/userRequests");
const catchAsync = require("../middlewares/catchAsyncMiddleware");
const { isAuthorized } = require("../middlewares/authMiddlewares");

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
router
  .route("/users/my-profile")
  .get(isAuthorized, catchAsync(authController.myProfile));
router
  .route("/users/my-profile/update")
  .put(
    isAuthorized,
    updateUserValidator,
    catchAsync(authController.updateMyProfile)
  );
router
  .route("/users/:id")
  .get(isAuthorized, catchAsync(authController.getUser));
router
  .route("/users/:id/update")
  .put(
    isAuthorized,
    updateUserValidator,
    catchAsync(authController.updateUser)
  );

module.exports = router;
