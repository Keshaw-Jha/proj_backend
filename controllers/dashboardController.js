const { reset } = require("nodemon");
const Form = require("../models/formModel");
const Setting = require("../models/settingModel");

const getTickets = async (req, res) => {
  try {
    const ticketsRecords = await Form.find({});
    res.status(200).json({
      status: "success",
      data: ticketsRecords,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

const userSettings = async (req, res) => {
  try {
    const settings = await Setting.find({});
    const settingObj = settings.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    res.status(200).json({
      status: "success",
      data: settingObj,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

const updateSettings = async (req, res) => {
  try {
    const settingObj = req.body.data;
    for (elem in settingObj) {
      const doc = await Setting.findOneAndUpdate(
        { key: elem },
        { value: settingObj[elem] },
        { new: true }
      );
    }
    res.status(200).json({
      status: "success",
      data: settingObj,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

module.exports = { getTickets, userSettings, updateSettings };
