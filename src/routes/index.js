const AppError = require("../controllers/ErrorController");
const authRouter = require("./auth");
const brandRouter = require("./brand");
const categoryRouter = require("./category");

const route = (app) => {
  app.use("/v1/auth", authRouter);
  app.use("/v1/brands", brandRouter);
  app.use("/v1/categories", categoryRouter);
  app.all(/(.*)/, (req, res, next) => {
    next(
      new AppError(
        `Can't find ${req.originalUrl} on this server!`,
        httpStatus.NOT_FOUND
      )
    );
  });
};
module.exports = route;
