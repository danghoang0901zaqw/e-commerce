const AppError = require("../controllers/ErrorController");
const authRouter = require("./auth");

const route = (app) => {
  app.use("/v1/auth", authRouter);
  app.all(/(.*)/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
};
module.exports = route;
