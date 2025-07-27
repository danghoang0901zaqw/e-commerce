const AppError = require("../controllers/ErrorController");
const authRouter = require("./auth");
const brandRouter = require("./brand");
const categoryRouter = require("./category");
const productRouter = require("./product");
const tagRouter = require("./tag");

const route = (app) => {
  app.use("/v1/auth", authRouter);
  app.use("/v1/brands", brandRouter);
  app.use("/v1/categories", categoryRouter);
  app.use("/v1/products", productRouter);
  app.use("/v1/tags", tagRouter);
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
