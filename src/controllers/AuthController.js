const httpStatus = require("../constants/httpStatus");
const authServices = require("../services/authServices");

class AuthController {
  async signUp(req, res, next) {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    const result = await authServices.signUp({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    });
    res.status(httpStatus.CREATED).json({
      data: {
        ...result,
      },
    });
  }
  async signIn(req, res, next) {
    const { email, password } = req.body;
    const result = await authServices.signIn({
      email,
      password,
    });
    res.status(httpStatus.OK).json({
      data: {
        ...result,
      },
    });
  }
  async forgotPassword(req, res, next) {
    const { email } = req.body;
    const { id } = req.user;
    const accessToken = await authServices.forgotPassword({
      userId: id,
      email,
    });
    res.status(httpStatus.OK).json({
      data: {
        accessToken,
      },
    });
  }

  async verifyForgotPassword(req, res, next) {
    return res.status(httpStatus.OK).json({
      data: true,
    });
  }

  async resetPassword(req, res, next) {
    const { password, passwordToken } = req.body;
    const { id } = req.user;
    const result = await authServices.resetPassword({
      userId: id,
      password,
      passwordToken,
    });
    return res.status(httpStatus.OK).json({
      data: result,
    });
  }

  async myProfile(req, res, next) {
    const { password, resetPasswordToken, resetPasswordExpired, ...restUser } =
      req.user;
    res.status(httpStatus.OK).json({
      data: {
        ...restUser,
      },
    });
  }
  async getUser(req, res, next) {
    const { id } = req.params;
    const { password, resetPasswordToken, resetPasswordExpired, ...restUser } =
      await authServices.getUser(id);
    res.status(httpStatus.OK).json({
      data: {
        ...restUser,
      },
    });
  }
  async updateMyProfile(req, res, next) {
    const { id } = req.user;
    const { firstName, lastName, phoneNumber } = req.body;
    const user = await authServices.updateUser({
      userId: id,
      data: {
        firstName,
        lastName,
        phoneNumber,
      },
    });
    res.status(httpStatus.CREATED).json({
      data: {
        ...user,
      },
    });
  }
  async updateUser(req, res, next) {
    const { id } = req.params;
    const { firstName, lastName, phoneNumber } = req.body;
    const user = await authServices.updateUser({
      userId: id,
      data: {
        firstName,
        lastName,
        phoneNumber,
      },
    });
    res.status(httpStatus.CREATED).json({
      data: {
        ...user,
      },
    });
  }
}
module.exports = new AuthController();
