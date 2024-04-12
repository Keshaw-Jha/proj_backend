const { default: mongoose } = require("mongoose");

const otpSchema = new mongoose.Schema({
  ticketId: {
    type: String,
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// const Otp = mongoose.model("Otp", otpSchema);
// module.exports = Otp;
