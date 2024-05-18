const nodemailer = require("nodemailer");
const config = require("../config.js");

const transporter = nodemailer.createTransport({
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
});

module.exports = { transporter };
