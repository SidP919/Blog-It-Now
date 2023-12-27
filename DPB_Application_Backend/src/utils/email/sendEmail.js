const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const ENV_CONSTANTS = require("../../constants/config.contants");
const { logger } = require("../logger");
/**
 * Please note below sendEmail will only work when we fulfill below conditions in mentioned order:
 * 1) Login to google account, ensure we have setup 2-step verification on our gmail account
 * 2) Login to google account, then go to https://myaccount.google.com/apppasswords on
 *    another tab inside same window and setup App Password for our google account.
 * 3) Generate 16-character long app password and keep it in our .env file under
 *    EMAIL_PASSWORD variable.
 */
const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: ENV_CONSTANTS.EMAIL_HOST, // it will be "smtp.gmail.com" for gmail
      service: ENV_CONSTANTS.EMAIL_SERVICE_NAME,
      secure: true,
      port: ENV_CONSTANTS.EMAIL_PORT, //it will be 587 for TLS, 465 for SSL,
      auth: {
        user: ENV_CONSTANTS.EMAIL_USERNAME,
        pass: ENV_CONSTANTS.EMAIL_PASSWORD,
      },
      // tls: { rejectUnauthorized: false },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          logger("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    // setup maildata
    const options = () => {
      return {
        from: ENV_CONSTANTS.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    await new Promise((resolve, reject) => {
      transporter.sendMail(options(), (error, info) => {
        if (error) {
          console.error("transporter.sendMail:", { error });
          reject(error);
        } else {
          logger("transporter.sendMail:",'Email sent successfully.')
          resolve(info);
        }
      });
    });

    return true;

  } catch (error) {
    logger("sendEmail:", error);
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;
