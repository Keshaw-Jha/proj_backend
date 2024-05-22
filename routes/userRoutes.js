const express = require("express");
const form = require("../controllers/formController.js");
const otp = require("../controllers/otpController.js");
const qr = require("../controllers/qrController.js");
const dashboard = require("../controllers/dashboardController.js");
const signIn = require("../controllers/signInController.js");
const { authenticateToken } = require("../middlewares/authenticateToken.js");

const router = express.Router();

router.get("/gettickets", authenticateToken, dashboard.getTickets);
router.get("/getsettings", authenticateToken, dashboard.userSettings);
router.post("/submitform", form.submitForm);
router.post("/submitotp", otp.verifyOtp);
router.post("/getqr", qr.getQr);
router.post("/updateticketstatus", form.updateTicket);
router.post("/signin", signIn.signInUser);
router.post("/login", signIn.logInUser);

module.exports = router;
