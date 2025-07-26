const AppError = require("../controllers/ErrorController");
const authRouter = require("./auth");
const brandRouter = require("./brand");

const route = (app) => {
  app.use("/v1/auth", authRouter);
  app.use("/v1/brands", brandRouter);
  app.all(/(.*)/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, httpStatus.NOT_FOUND));
  });
};
module.exports = route;
