const models = require("../models");
const { hashPassword } = require("../utils/bcrypt");
const AppError = require("../controllers/ErrorController");
const { userMessages } = require("../constants/messages");
const httpStatus = require("../constants/httpStatus");
const { generateToken } = require("../utils/jwt");
const dotenv = require("dotenv");
dotenv.config();
class AuthServices {
  async genAccessToken({ userId, email }) {
    const accessToken = await generateToken({
      dataUser: { userId, email },
      secretKey: process.env.JWT_ACCESS_SECRET_KEY,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED,
    });
    return accessToken;
  }
  async genRefreshToken(userId, email) {
    const refreshToken = await generateToken({
      dataUser: { userId, email },
      secretKey: process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED,
    });
    return refreshToken;
  }
  async findByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email,
      },
      raw: true,
    });
    return user;
  }
  async signUp({ email, password, firstName, lastName, phoneNumber }) {
    const user = await models.User.create({
      email,
      password: hashPassword(password),
      firstName,
      lastName,
      phoneNumber,
    });
    return user.toJSON();
  }

  async signIn({ email, password }) {
    const user = await this.findByEmail(email);
    if (!user || !hashPassword(password, user?.password)) {
      throw new AppError(userMessages.LOGIN_INCORRECT, httpStatus.BAD_REQUEST);
    }
    const {
      password: pass,
      resetPasswordToken,
      resetPasswordExpired,
      ...restUser
    } = user;
    const [accessToken, refreshToken] = await Promise.all([
      this.genAccessToken({ userId: user.id, email: user.email }),
      this.genRefreshToken({ userId: user.id, email: user.email }),
    ]);
    return {
      ...restUser,
      accessToken,
      refreshToken,
    };
  }
}
module.exports = new AuthServices();
