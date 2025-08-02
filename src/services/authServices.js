const raw = require("body-parser/lib/types/raw");
const models = require("../models");
const { hashPassword } = require("../utils/bcrypt");
class AuthServices {
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
}
module.exports = new AuthServices();
