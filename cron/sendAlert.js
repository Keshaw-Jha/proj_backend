const Form = require("../models/formModel");
const Alert = require("../models/alertEmailModel");
const Setting = require("../models/settingModel");
const { transporter } = require("../utils/emailService");
const { durationAlert } = require("../templates/email-templates");

const getDuration = async () => {
  const maxDuration = await Setting.findOne({ key: "maxDuration" });
  return maxDuration ? maxDuration.value : null;
};

const sendAlertEmail = async (userObj) => {
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

const getAlertEmails = async () => {
  const duration = await getDuration();
  if (!duration) {
    throw new Error("Max duration not set");
  }
  const durationTime = new Date(Date.now() - duration * 60 * 1000);

  const excludeUsers = await Alert.find({}, "email").lean();
  const excludeEmails = excludeUsers.map((user) => user.email);

  const query = {
    entryAt: { $lt: durationTime },
    exitAt: { $exists: false, $eq: "" },
    email: { $nin: excludeEmails },
  };

  const filteredUsers = await Form.find(query).lean();
  return filteredUsers;
};

const sendAlerts = async () => {
  try {
    const alertUsers = await getAlertEmails();

    if (alertUsers && alertUsers.length > 0) {
      for (const user of alertUsers) {
        const tempObj = { ...user, maxDuration: await getDuration() };
        await sendAlertEmail(tempObj);
      }
      const setEmails = alertUsers.map((user) => ({
        email: user.email,
      }));
      await Alert.insertMany(setEmails);
    }

    return;
  } catch (err) {
    console.log("err 💥", err);
    return err;
  }
};

module.exports = { sendAlerts };
