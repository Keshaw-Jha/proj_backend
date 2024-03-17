const express = require("express");
const form = require("../controllers/formController.js");

const router = express.Router();

router.post("/submitForm", form.submitForm);
router.post("/submitOtp", () => {});
router.post("/getQr", () => {});

module.exports = router;
