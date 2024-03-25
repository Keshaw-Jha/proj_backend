const { default: mongoose } = require("mongoose");

const otpSchema = new mongoose.Schema({
  formId: {
    type: String,
  },
  otp: {
    type: String,
  },
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;
