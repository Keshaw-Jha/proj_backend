const nodemailer = require("nodemailer");
const config = require("../config.js");

const transporter = nodemailer.createTransport(
  config.DEVELOPMENT !== "true"
    ? {
        service: "gmail",
        secure: true,
        auth: {
          user: config.EMAIL_USER,
          pass: config.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
        attachDataUrls: true,
      }
    : {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "josiah.cruickshank@ethereal.email", // generated ethereal user
          pass: "rynvKPhYZN8D57JXG3", // generated ethereal password
        },
      }
);

module.exports = { transporter };
