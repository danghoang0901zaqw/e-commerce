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
}
module.exports = new AuthController();
