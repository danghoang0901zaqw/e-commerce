const { checkSchema } = require("express-validator");
const validate = require("../helpers/errorValidator");
const AppError = require("../controllers/ErrorController");
const { userMessages } = require("../constants/messages");
const httpStatus = require("../constants/httpStatus");
const authServices = require("../services/authServices");

const signUpValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: userMessages.EMAIL_IS_REQUIRED,
        },
        isEmail: {
          errorMessage: userMessages.EMAIL_IS_INVALID,
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await authServices.findByEmail(value);
            if (user) {
              throw new AppError(
                userMessages.EMAIL_ALREADY_EXISTS,
                httpStatus.BAD_REQUEST
              );
            }
            return true;
          },
          errorMessage: userMessages.EMAIL_ALREADY_EXISTS,
        },
      },
      firstName: {
        notEmpty: true,
        isLength: {
          options: { min: 1, max: 20 },
          errorMessage: userMessages.FIRST_NAME_LENGTH,
        },
        trim: true,
        errorMessage: userMessages.FIRST_NAME_IS_REQUIRED,
      },
      lastName: {
        notEmpty: true,
        isLength: {
          options: { min: 1, max: 20 },
          errorMessage: userMessages.LAST_NAME_LENGTH,
        },
        trim: true,
        errorMessage: userMessages.LAST_NAME_IS_REQUIRED,
      },
      phoneNumber: {
        notEmpty: {
          errorMessage: userMessages.PHONE_NUMBER_IS_REQUIRED,
        },
        isMobilePhone: {
          options: ["any"],
          errorMessage: userMessages.PHONE_NUMBER_IS_INVALID,
        },
      },
      password: {
        notEmpty: {
          errorMessage: userMessages.PASSWORD_IS_REQUIRED,
        },
        isLength: {
          options: { min: 8, max: 50 },
          errorMessage: userMessages.PASSWORD_LENGTH,
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
          },
          errorMessage: userMessages.PASSWORD_IS_STRONG,
        },
        trim: true,
      },
      confirmPassword: {
        notEmpty: {
          errorMessage: userMessages.CONFIRM_PASSWORD_IS_REQUIRED,
        },
        custom: {
          options: async (val, { req }) => {
            if (val !== req.body.password) {
              throw new AppError(
                userMessages.CONFIRM_PASSWORD_MUST_MATCH,
                httpStatus.BAD_REQUEST
              );
            }
          },
        },
        trim: true,
      },
    },
    ["body"]
  )
);

const signInValidator = validate(
  checkSchema({
    email: {
      notEmpty: {
        errorMessage: userMessages.EMAIL_IS_REQUIRED,
      },
      isEmail: {
        errorMessage: userMessages.EMAIL_IS_INVALID,
      },
      trim: true,
    },
    password: {
      notEmpty: {
        errorMessage: userMessages.PASSWORD_IS_REQUIRED,
      },
      trim: true,
    },
  },['body'])
);
module.exports = { signUpValidator, signInValidator };
