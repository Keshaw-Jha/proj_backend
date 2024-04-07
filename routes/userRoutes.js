const express = require("express");
const form = require("../controllers/formController.js");
const otp = require("../controllers/otpController.js");
const qr = require("../controllers/qrController.js");
const dashboard = require("../controllers/dashboardController.js");

const router = express.Router();

router.post("/submitForm", form.submitForm);
router.post("/submitOtp", otp.verifyOtp);
router.post("/getQr", qr.getQr);
router.get("/getTickets", dashboard.getTickets);
router.get("/getStats", dashboard.getDashboardStats);

module.exports = router;
