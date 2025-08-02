const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const { signUpValidators } = require("../requests/userRequests");

router.route("/users/sign-up").post(signUpValidators, authController.signUp);
router.route("/sign-in", authController.signIn);
module.exports = router;
