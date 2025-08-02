const { validationResult } = require("express-validator");
const httpStatus = require("../constants/httpStatus");
const AppError = require("../controllers/ErrorController");

const validate = (validation) => {
  return async (req, res, next) => {
    await validation.run(req);
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) return next();
    const errorObject = errors.mapped();
    for (const key in errorObject) {
      const { msg } = errorObject[key];
      next(new AppError(msg, httpStatus.BAD_REQUEST));
    }
  };
};
module.exports = validate;
