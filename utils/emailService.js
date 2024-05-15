const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "api",
    pass: "21c7a201979dcb4ed138cfec13c2fdfe",
  },
});

module.exports = { transporter };
