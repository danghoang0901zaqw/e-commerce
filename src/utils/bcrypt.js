const bcrypt = require("bcryptjs");
const hashPassword = (plainTextPassword) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
  return hashedPassword;
};
const comparePassword = (plainTextPassword, hashedPassword) => {
  return bcrypt.compareSync(plainTextPassword, hashedPassword);
};
module.exports = { hashPassword, comparePassword };
