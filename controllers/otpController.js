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
    const { formId, otp } = req.body.data;
    const otpRecord = await Otp.findOne({ formId, otp }, { upsert: false });
    console.log(req.body, otpRecord);
    if (!otpRecord) {
      return res.status(200).send(false);
    }

    const formObj = await Form.findOne({ formId: otpRecord.formId });
    if (!formObj) {
      return res.status(200).send(false);
    }

    const qrCodeImage = await createQr(formObj);

    await Form.findOneAndUpdate(
      { formId: formObj.formId },
      { $set: { qr: qrCodeImage } },
      { new: true }
    );
    res.status(200).send(true);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addOtp = async (formId) => {
  try {
    const otpObj = { formId: formId, otp: generateOtp() };
    const response = await Otp.create(otpObj);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = { verifyOtp, addOtp };
