const Form = require("../models/formModel");
const Alert = require("../models/alertEmailModel");
const Setting = require("../models/settingModel");
const { transporter } = require("../utils/emailService");
const { durationAlert } = require("../templates/email-templates");

const getDuration = async () => {
  const maxDuration = await Setting.findOne({ key: "maxDuration" });
  return maxDuration.value ?? null;
};

const alertEmail = async (userObj) => {
  try {
    await transporter.sendMail({
      from: "Pravesh_Systum@gmail.in",
      to: userObj.email,
      subject: "Important: Your Stay at Pravesh Exceeds Allowed Duration",
      html: durationAlert(userObj),
    });
  } catch (err) {
    console.log("err 💥", err);
    return err;
  }
};

// const getAlertEmails = async () => {
//   const duration = await getDuration();
//   const query = {
//     entryAt: { $lt: new Date(Date.now() - duration * 60 * 1000) },
//     $and: [{ exitAt: { $exists: false } }, { exitAt: "" }],
//   };
//   const users = await Form.find(query).lean();
//   const excludeUsers = await Alert.find({}).lean();

//   const finalUsers =
// };

const sendAlerts = async () => {
  try {
    const duration = await getDuration();
    const query = {
      entryAt: { $lt: new Date(Date.now() - duration * 60 * 1000) },
      $and: [{ exitAt: { $exists: false } }, { exitAt: "" }],
    };
    const users = await Form.find(query).lean();
    if (users && users.length > 0) {
      for (const user of users) {
        const tempObj = { ...user, maxDuration: duration };
        await alertEmail(tempObj); // Pass the tempObj directly
      }
    }
    return;
  } catch (err) {
    console.log("err 💥", err);
    return err;
  }
};

module.exports = { sendAlerts };
