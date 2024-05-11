const express = require("express");
const form = require("../controllers/formController.js");
const otp = require("../controllers/otpController.js");
const qr = require("../controllers/qrController.js");
const dashboard = require("../controllers/dashboardController.js");
const signIn = require("../controllers/signInController.js");

const router = express.Router();

router.post("/submitform", form.submitForm);
router.post("/submitotp", otp.verifyOtp);
router.post("/getqr", qr.getQr);
router.get("/gettickets", dashboard.getTickets);
router.get("/getstats", dashboard.getDashboardStats);
router.post("/updateticketstatus", form.updateTicket);
router.post("/signIn", signIn.signInUser);
router.post("/logIn", signIn.logInUser);

module.exports = router;
