const dotenv = require("dotenv");
const httpStatus = require("../constants/httpStatus");
const { userMessages } = require("../constants/messages");
const { verifyToken } = require("../utils/jwt");
const authServices = require("../services/authServices");
const AppError = require("../controllers/ErrorController");
dotenv.config();

const isAuthorized = async (req, res, next) => {
  const headers = req?.headers;
  const token = headers?.authorization?.split(" ")[1];
  if (!headers || !token) {
    return next(
      new AppError(userMessages.UN_AUTHORIZATION, httpStatus.UNAUTHORIZED)
    );
  }
  const decodeToken = await verifyToken({
    token,
    secretKey: process.env.JWT_ACCESS_SECRET_KEY,
  });
  if (!decodeToken) {
    return next(
      new AppError(userMessages.UN_AUTHORIZATION, httpStatus.UNAUTHORIZED)
    );
  }
  const freshUser = await authServices.getUser(decodeToken.userId);
  if (!freshUser) {
    return next(
      new AppError(userMessages.UN_AUTHORIZATION, httpStatus.UNAUTHORIZED)
    );
  }
  const timeResetPassword = new Date(freshUser.resetPasswordExpired).getTime();
  const timeJWT = new Date(decodeToken.iat * 1000).getTime();
  if (timeResetPassword > timeJWT) {
    return next(
      new AppError(userMessages.UN_AUTHORIZATION, httpStatus.UNAUTHORIZED)
    );
  }
  req.user = freshUser;
  next();
};
module.exports = { isAuthorized };
