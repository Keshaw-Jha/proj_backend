const { default: mongoose } = require("mongoose");

const settingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    requied: true,
  },
});

const Setting = mongoose.model("Setting", settingSchema);
module.exports = Setting;
