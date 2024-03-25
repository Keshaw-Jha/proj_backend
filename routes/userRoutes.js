const express = require("express");
const form = require("../controllers/formController.js");
const otp = require("../controllers/otpController.js");
const qr = require("../controllers/qrController.js");

const router = express.Router();

router.post("/submitForm", form.submitForm);
router.post("/submitOtp", otp.verifyOtp);
router.post("/getQr", qr.getQr);

module.exports = router;
