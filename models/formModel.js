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
  formId: {
    type: String,
  },
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
