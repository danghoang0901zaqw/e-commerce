const errorMiddleware = (err, req, res, next) => {
  const customError = err;
  const status =
    customError.status && String(customError.status).startsWith("4")
      ? customError.status
      : 500;
  const statusCode = customError.statusCode || 500;
  const message = customError.message || "Internal Server Error";
  return res
    .status(status)
    .json({ statusCode, message: message, stack: customError.stack });
};
module.exports = errorMiddleware;
