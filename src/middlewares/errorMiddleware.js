const httpStatus = require("../constants/httpStatus");

const errorMiddleware = (err, req, res, next) => {
  const customError = err;
  const status =
    customError.status && String(customError.status).startsWith("4")
      ? customError.status
      : httpStatus.INTERNAL_SERVER_ERROR;
  const statusCode = customError.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = customError.message || "Internal Server Error";
  return res
    .status(status)
    .json({ statusCode, message: message, stack: customError.stack });
};
module.exports = errorMiddleware;
