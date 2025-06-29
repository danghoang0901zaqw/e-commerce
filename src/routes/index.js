const authRouter = require("./auth");

const route = (app) => {
  app.use("/v1/auth", authRouter);
};
module.exports = route;
