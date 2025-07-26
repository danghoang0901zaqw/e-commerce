const httpStatus = require("../constants/httpStatus");

class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || httpStatus.INTERNAL_SERVER_ERROR;
    this.statusCode = `${this.status}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
