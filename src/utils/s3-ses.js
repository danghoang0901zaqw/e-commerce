const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const forgotPasswordTemplate = fs.readFileSync(
  path.join(__dirname, "../template/forgot-password.html"),
  "utf-8"
);

const createSendEmailCommand = ({ toAddress, htmlBody, textBody, subject }) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [process.env.AWS_CC_ADDRESS],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
        Text: {
          Charset: "UTF-8",
          Data: textBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: process.env.AWS_CC_ADDRESS,
    ReplyToAddresses: [],
  });
};

const sendEmailForgotPassword = async ({ toAddress, passwordToken }) => {
  const contentForgotPassword = forgotPasswordTemplate
    .replace("{{year}}", new Date().getFullYear())
    .replace(
      "{{RESET_LINK}}",
      `http://localhost:5001/v1/users/verify-forgot-password?passwordToken=${passwordToken}`
    );
    console.log(contentForgotPassword);
  const sendEmailCommand = createSendEmailCommand({
    toAddress,
    subject: "Forgot Password",
    htmlBody: contentForgotPassword,
    textBody: "Please click the link to reset your password.",
  });
  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};
module.exports = {
  sendEmailForgotPassword,
};
