const ms = require("ms");
const dotenv = require("dotenv");

const models = require("../models");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const AppError = require("../controllers/ErrorController");
const { userMessages } = require("../constants/messages");
const httpStatus = require("../constants/httpStatus");
const { generateToken } = require("../utils/jwt");
const { userRoles } = require("../constants/common");
const { sendEmailForgotPassword } = require("../utils/s3-ses");
dotenv.config();

class AuthServices {
  async genAccessToken({ userId, email, expiresIn }) {
    const accessToken = await generateToken({
      dataUser: { userId, email },
      secretKey: process.env.JWT_ACCESS_SECRET_KEY,
      expiresIn: expiresIn || process.env.JWT_ACCESS_TOKEN_EXPIRED,
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
      roleId: userRoles.User,
    });
    return user.toJSON();
  }

  async signIn({ email, password }) {
    const user = await this.findByEmail(email);
    if (!user || !comparePassword(password, user?.password)) {
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
  async forgotPassword({ userId, email }) {
    const timeExpired = ms(process.env.JWT_FORGOT_PASSWORD_TOKEN_EXPIRED);
    const accessToken = await this.genAccessToken({
      userId,
      email,
      expiresIn: process.env.JWT_FORGOT_PASSWORD_TOKEN_EXPIRED,
    });
    await Promise.all([
      models.User.update(
        {
          resetPasswordToken: accessToken,
          resetPasswordExpired: new Date(Date.now() + timeExpired),
        },
        {
          where: {
            id: userId,
          },
        }
      ),
      sendEmailForgotPassword({
        toAddress: email,
        passwordToken: accessToken,
      }),
    ]);
    return accessToken;
  }

  async resetPassword({ passwordToken, userId, password }) {
    const result = await models.User.update(
      {
        resetPasswordToken: null,
        resetPasswordExpired: null,
        password: hashPassword(password),
        updateAt: new Date(),
      },
      {
        where: {
          id: userId,
          resetPasswordToken: passwordToken,
        },
      }
    );
    return result[0] > 0;
  }
  async getUser(userId) {
    const user = await models.User.findByPk(userId, {
      raw: true,
    });
    return user;
  }
  async updateUser({ userId, data }) {
    const allowedFields = ["firstName", "lastName", "phoneNumber"];
    const updateData = Object.keys(data).reduce((acc, key) => {
      if (allowedFields.includes(key)) {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    const [updatedRows] = await models.User.update(updateData, {
      where: {
        id: userId,
      },
    });
    if (updatedRows === 0) {
      throw new AppError(userMessages.USER_NOT_FOUND, httpStatus.NOT_FOUND);
    }
    const updatedUser = await this.getUser(userId);
    const { password, resetPasswordToken, resetPasswordExpired, ...restUser } =
      updatedUser;
    return restUser;
  }
}
module.exports = new AuthServices();
