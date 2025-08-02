const jwt = require("jsonwebtoken");
const AppError = require("../controllers/ErrorController");
const { userMessages } = require("../constants/messages");
const generateToken = ({ dataUser, secretKey, expiresIn }) => {
  const token = jwt.sign(dataUser, secretKey, { expiresIn });
  return token;
};
const verifyToken = async ({ token, secretKey }) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError(userMessages.UN_AUTHORIZATION);
    }
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
