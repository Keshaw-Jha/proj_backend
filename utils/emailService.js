const nodemailer = require("nodemailer");
const config = require("../config.js");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

module.exports = { transporter };
