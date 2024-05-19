const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
  email: {
    type: String,
    rquired: true,
  },
});

const Alert = mongoose.model("Alert", AlertSchema);
module.exports = Alert;
