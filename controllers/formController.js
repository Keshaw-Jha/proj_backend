const Form = require(`../models/formModel`);
const { v4: uuidv4 } = require("uuid");
const { addOtp } = require("./otpController");

const submitForm = async (req, res) => {
  try {
    const demoObj = { ...req.body, ticketId: uuidv4() };
    const formObj = await Form.create(demoObj);
    const testOtp = await addOtp(formObj.ticketId);
    console.log("OTP: ", testOtp);
    res.status(201).json({
      status: "success",
      data: formObj,
      otp: testOtp,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

const updateTicket = async (req, res) => {
  try {
    const recordTicket = { ...req.body };
    await Form.findOneAndReplace(
      {
        ticketId: recordTicket.ticketId,
      },
      recordTicket,
      { new: true }
    )
      .then((data) => {
        res.status(200).json({
          status: "updated",
          data: data,
        });
      })
      .catch((err) => console.log(error));
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

module.exports = { submitForm, updateTicket };
