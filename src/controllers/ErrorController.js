class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
    this.statusCode = `${this.status.startsWith("4")}` ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
