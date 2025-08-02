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
  signIn(req, res, next) {}
}
module.exports = new AuthController();
