const { default: mongoose } = require("mongoose");

const signInSchema = new mongoose.Schema({
  name: {
    type: String,
    rquired: true,
  },
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const signIn = mongoose.model("SignIn", signInSchema);
module.exports = signIn;
