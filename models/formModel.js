import mongoose from "mongoose";

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
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  Qr: {
    type: String,
    required: true,
  },
  formId: {
    type: String,
    required: true,
  },
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
