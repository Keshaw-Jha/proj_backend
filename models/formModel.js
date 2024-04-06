const { default: mongoose } = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adhaar: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  qr: {
    type: String,
  },
  ticketId: {
    type: String,
  },
  entryAt: {
    type: Date,
  },
  exitAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
