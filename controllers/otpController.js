const Otp = require("../models/otpModel");
const Form = require("../models/formModel");
const qrCode = require(`qrcode`);

const generateOtp = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
};

const createQr = async (demoObj) => {
  try {
    const qr = await qrCode.toDataURL(JSON.stringify(demoObj));
    return qr;
  } catch (err) {
    return err;
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { ticketId, otp } = req.body.data;
    const otpRecord = await Otp.findOne({ ticketId, otp }, { upsert: false });
    console.log(req.body, otpRecord);
    if (!otpRecord) {
      return res.status(200).send(false);
    }

    const formObj = await Form.findOne({ ticketId: otpRecord.ticketId });
    if (!formObj) {
      return res.status(200).send(false);
    }

    const qrCodeImage = await createQr(formObj);

    await Form.findOneAndUpdate(
      { ticketId: formObj.ticketId },
      { $set: { qr: qrCodeImage } },
      { new: true }
    );
    res.status(200).send(true);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addOtp = async (ticketId) => {
  try {
    const otpObj = { ticketId: ticketId, otp: generateOtp() };
    const response = await Otp.create(otpObj);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = { verifyOtp, addOtp };
