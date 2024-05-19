const Otp = require("../models/otpModel");
const Form = require("../models/formModel");

const deleteOldOtps = async () => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const result = await Otp.deleteMany({ createdAt: { $lt: oneHourAgo } });
    // console.log(
    //   `Deleted ${result.deletedCount} Otp(s) that were older than one hour.`
    // );
  } catch (err) {
    console.error("Error deleting old OTPs:", err);
  }
};
const deleteOldForms = async () => {
  try {
    const oneHourAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const result = await Form.deleteMany({ createdAt: { $lt: oneHourAgo } });
    // console.log(
    //   `Deleted ${result.deletedCount} Form(s) that were older than 24 hour.`
    // );
  } catch (err) {
    console.error("Error deleting old OTPs:", err);
  }
};

const deleteOldRecords = async () => {
  await deleteOldForms();
  await deleteOldOtps();

  return;
};

module.exports = { deleteOldRecords };
